/**
 * Drop-in replacement for `new WebSocket(getTvWsUrl())` for TradingView quotes.
 *
 * Why this exists: TradingView often answers a connection with
 *   {"redirect":"widgetdata-wdc.tradingview.com"}
 * and then closes it with code 1000 (a "clean" close), sending no prices. The
 * target host changes between connections, so it looks random. Pages only
 * reconnected on unclean closes, so they stayed blank until a manual refresh.
 *
 * To a page this is one socket that never drops. Internally it:
 *  - follows redirects through the relay (/wsr/<host>/, see nginx-site.sh)
 *  - reconnects after any close and replays the page's subscriptions
 *  - replaces a connection that goes silent (heartbeats arrive every 10s)
 *  - polls REST prices while no live data flows, delivered as normal `qsd`
 *    frames, so pages need no fallback code of their own
 */
import { getTvWsUrl } from 'src/view/shared/wsUrl';

const FIRST_POLL_MS = 2_000;
const TICK_MS = 5_000;
const STALL_MS = 25_000;
const MAX_BACKOFF_MS = 30_000;

// The REST scanner does not know every ticker the socket resolves. Each of these
// was checked against /api/tvscan/global/scan. Other 6-letter pairs use OANDA.
const SCAN_TICKERS: Record<string, string> = {
  XAUUSD: 'FX_IDC:XAUUSD',
  XAGUSD: 'TVC:SILVER',
  USDJPY: 'FX:USDJPY',
  USOIL: 'NYMEX:CL1!',
  UKOIL: 'ICEEUR:BRN1!',
  BTCUSD: 'BITSTAMP:BTCUSD',
  ETHUSD: 'BITSTAMP:ETHUSD',
  LTCUSD: 'BITSTAMP:LTCUSD',
  NAS100: 'NASDAQ:NDX',
  SPX500: 'SP:SPX',
  US30: 'OANDA:US30USD',
  UK100: 'TVC:UKX',
  GER30: 'OANDA:DE30EUR',
  FRA40: 'EURONEXT:PX1',
  ESP35: 'BME:IBC',
  AUS200: 'OANDA:AU200AUD',
  JPN225: 'TVC:NI225',
};

function scanTicker(symbol: string): string {
  if (symbol.includes(':')) return symbol;
  return SCAN_TICKERS[symbol] || `OANDA:${symbol}`;
}

const encode = (m: string) => `~m~${m.length}~m~${m}`;

// Last redirect target, shared so a new page connects straight to it.
let knownShard: string | null = null;

class TvSocket {
  readyState = 1; // pages check for WebSocket.OPEN before subscribing
  onopen: ((e: any) => void) | null = null;
  onmessage: ((e: any) => void) | null = null;
  onclose: ((e: any) => void) | null = null;
  onerror: ((e: any) => void) | null = null;

  private sock: WebSocket | null = null;
  private stopped = false;
  private live = false; // a real quote arrived on the current connection
  private redirected = false;
  private usedShard = false;
  private attempts = 0;
  private lastFrameAt = 0;
  private polling = false;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private firstPollTimer: ReturnType<typeof setTimeout> | null = null;
  private tickTimer: ReturnType<typeof setInterval> | null = null;

  private session = '';
  private sessionFrame = '';
  private fieldsFrame = '';
  private symbols = new Set<string>();

  constructor() {
    // Deferred so the page can assign its handlers first, like a real WebSocket.
    setTimeout(() => {
      if (this.stopped) return;
      this.onopen?.({});
      this.connect();
      this.firstPollTimer = setTimeout(() => this.poll(), FIRST_POLL_MS);
      this.tickTimer = setInterval(() => this.tick(), TICK_MS);
    }, 0);
  }

  send(data: string) {
    this.track(data);
    if (this.sock?.readyState === WebSocket.OPEN) this.sock.send(data);
  }

  close() {
    if (this.stopped) return;
    this.stopped = true;
    this.readyState = 3;
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    if (this.firstPollTimer) clearTimeout(this.firstPollTimer);
    if (this.tickTimer) clearInterval(this.tickTimer);
    this.detach();
    setTimeout(() => this.onclose?.({ wasClean: true, code: 1000 }), 0);
  }

  // Remembers what the page subscribed to, for replay and for REST polling.
  private track(data: string) {
    try {
      const json = JSON.parse(data.replace(/^~m~\d+~m~/, ''));
      if (json.m === 'quote_create_session') {
        this.session = json.p[0];
        this.sessionFrame = data;
        this.symbols.clear();
      } else if (json.m === 'quote_set_fields') {
        this.fieldsFrame = data;
      } else if (json.m === 'quote_add_symbols') {
        json.p.slice(1).forEach((s: string) => this.symbols.add(s));
      } else if (json.m === 'quote_remove_symbols') {
        json.p.slice(1).forEach((s: string) => this.symbols.delete(s));
      }
    } catch { /* not a command frame */ }
  }

  private connect() {
    this.live = false;
    this.redirected = false;
    this.usedShard = !!knownShard;
    this.lastFrameAt = Date.now();

    const base = getTvWsUrl();
    const url = knownShard ? base.replace('/ws/socket.io', `/wsr/${knownShard}/socket.io`) : base;
    const sock = new WebSocket(url);
    this.sock = sock;

    sock.onopen = () => {
      if (this.sessionFrame) sock.send(this.sessionFrame);
      if (this.fieldsFrame) sock.send(this.fieldsFrame);
      if (this.symbols.size) {
        sock.send(encode(JSON.stringify({ m: 'quote_add_symbols', p: [this.session, ...Array.from(this.symbols)] })));
      }
    };
    sock.onmessage = (e) => this.handleFrame(sock, e.data);
    sock.onclose = () => { if (sock === this.sock) this.scheduleReconnect(); };
    sock.onerror = () => { /* a close always follows */ };
  }

  private handleFrame(sock: WebSocket, raw: string) {
    this.lastFrameAt = Date.now();

    if (/^~m~\d+~m~~h~\d+$/.test(raw)) { sock.send(raw); return; }

    const redirect = raw.match(/"redirect":"(widgetdata-[a-z0-9-]+)\.tradingview\.com"/);
    if (redirect) {
      knownShard = redirect[1];
      this.redirected = true;
      return; // TradingView closes the socket next
    }

    if (raw.includes('"m":"qsd"') && raw.includes('"s":"ok"')) {
      this.live = true;
      this.attempts = 0;
    }
    this.onmessage?.({ data: raw });
  }

  private scheduleReconnect() {
    this.sock = null;
    this.live = false;
    if (this.stopped) return;

    // A shard that failed is forgotten (the relay may not have the route yet).
    if (!this.redirected && this.usedShard) knownShard = null;

    const followRedirectNow = this.redirected && this.attempts < 2;
    const delay = followRedirectNow ? 0 : Math.min(MAX_BACKOFF_MS, 1000 * 2 ** this.attempts);
    this.attempts++;
    this.reconnectTimer = setTimeout(() => this.connect(), delay);
    this.poll();
  }

  private detach() {
    const sock = this.sock;
    this.sock = null;
    if (!sock) return;
    sock.onopen = sock.onmessage = sock.onclose = sock.onerror = null;
    try { sock.close(); } catch { /* already closed */ }
  }

  private tick() {
    if (this.sock && Date.now() - this.lastFrameAt > STALL_MS) {
      this.detach();
      this.scheduleReconnect();
      return;
    }
    this.poll();
  }

  private async poll() {
    if (this.stopped || this.live || this.polling || !this.symbols.size || document.hidden) return;
    this.polling = true;
    try {
      const bySymbol = new Map<string, string>();
      this.symbols.forEach((s) => bySymbol.set(scanTicker(s), s));

      const res = await fetch('/api/tvscan/global/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symbols: { tickers: Array.from(bySymbol.keys()) },
          columns: ['close', 'change', 'bid', 'ask'],
        }),
      });
      if (!res.ok) return;
      const json = await res.json();
      if (this.stopped || this.live) return;

      let frames = '';
      (json.data || []).forEach((row: any) => {
        const symbol = bySymbol.get(row.s);
        const [close, change, bid, ask] = row.d;
        if (!symbol || typeof close !== 'number') return;
        const v: Record<string, number> = { lp: close, bid: bid ?? close, ask: ask ?? close };
        if (typeof change === 'number') v.chp = change;
        frames += encode(JSON.stringify({ m: 'qsd', p: [this.session, { n: symbol, s: 'ok', v }] }));
      });
      if (frames) this.onmessage?.({ data: frames });
    } catch {
      /* try again on the next tick */
    } finally {
      this.polling = false;
    }
  }
}

export function createTvSocket(): WebSocket {
  return new TvSocket() as unknown as WebSocket;
}

import{k as n,j as m,L as j}from"./index-7fc9eb29.js";import{u as v,P as y,g as N,a as S,b as P}from"./useSymbolInjections-385f94e7.js";const R=`
  :root {
    --green: #36f936;
    --red:   #ff4d4d;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    background: var(--kt-bg-card-alt);
    color: var(--kt-text-secondary);
    line-height: 1.6;
    overflow-x: hidden;
  }

  .market-page {
    max-width: 400px;
    margin: 0 auto;
    position: relative;
    min-height: 100vh;
    background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
  }

  .market-header {
    background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
    min-height: 60px;
    position: relative;
    padding: 20px;
  }

  .nav-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .page-title {
    color: white;
    font-size: 17px;
    font-weight: 600;
  }

  .content-card {
    background: var(--kt-bg-card);
    border-radius: 40px 40px 0 0;
    padding: 24px 16px 100px;
    box-shadow: 0 -5px 20px rgba(0,0,0,0.05);
    min-height: calc(100vh - 60px);
  }

  .market-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  /* Skeleton */
  .skeleton-row {
    border-radius: 8px;
    padding: 10px 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    animation: shimmer 1.4s infinite linear;
    background: linear-gradient(90deg, #f0f2f5 25%, var(--kt-border) 50%, #f0f2f5 75%);
    background-size: 200% 100%;
  }

  @keyframes shimmer {
    0%   { background-position: -200% 0; }
    100% { background-position:  200% 0; }
  }

  .skeleton-left  { display: flex; align-items: center; gap: 10px; flex: 1; }
  .skeleton-flags { width: 34px; height: 26px; border-radius: 4px; background: #e0e3e8; }
  .skeleton-symbol { width: 90px; height: 12px; border-radius: 6px; background: #e0e3e8; }
  .skeleton-right { display: flex; align-items: center; gap: 10px; }
  .skeleton-price  { width: 65px; height: 12px; border-radius: 6px; background: #e0e3e8; }
  .skeleton-change { width: 55px; height: 12px; border-radius: 6px; background: #e0e3e8; }

  /* Row */
  .row-link { text-decoration: none; color: inherit; display: block; }

  .currency-row {
    background: var(--kt-bg-card-alt);
    border-radius: 8px;
    padding: 8px 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: background 0.15s, transform 0.1s;
    border: 1px solid var(--kt-border);
  }

  .currency-row:hover { background: var(--kt-bg-card-alt); transform: translateY(-1px); }

  .left-section  { display: flex; align-items: center; gap: 10px; }
  .right-section { display: flex; align-items: center; gap: 10px; }

  .symbol-name {
    font-size: 14px;
    font-weight: 600;
    color: var(--kt-text-primary);
    white-space: nowrap;
  }

  .price-value {
    font-size: 13px;
    font-weight: 600;
    color: var(--kt-text-primary);
    white-space: nowrap;
    min-width: 72px;
    text-align: right;
  }

  .change-percent {
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 2px;
    min-width: 58px;
    justify-content: flex-end;
  }

  .arrow { font-size: 10px; line-height: 1; }
  .green { color: var(--green); }
  .red   { color: var(--red); }

  @media (max-width: 380px) {
    .market-header { padding: 16px; min-height: 50px; }
    .content-card  { padding: 20px 12px 100px; }
  }

  @media (min-width: 768px) {
    .content-card { border-radius: 30px 30px 0 0; }
  }
`,h=e=>`~m~${e.length}~m~${e}`;function O(e){const i=[];let s=e;for(;s.length>0&&s.startsWith("~m~");){const r=s.indexOf("~m~",3),a=parseInt(s.substring(3,r)),t=s.substring(r+3,r+3+a);i.push(t),s=s.substring(r+3+a)}return i}function z(e){try{return JSON.parse(e.replace(/^=\{/,"{")).symbol||"UNKNOWN"}catch{return e}}function D(){const[e,i]=m.useState({}),s=m.useRef(null),r=m.useRef(null),a=m.useCallback(()=>{s.current&&(s.current.close(),s.current=null);const t=new WebSocket(S());s.current=t,t.onopen=()=>{const o="qs_"+Math.random().toString(36).substring(2,12);t.send(h(JSON.stringify({m:"quote_create_session",p:[o]}))),t.send(h(JSON.stringify({m:"quote_set_fields",p:[o,"lp","ask","bid","chp"]}))),t.send(h(JSON.stringify({m:"quote_add_symbols",p:[o,...y.map(d=>d.symbol)]})))},t.onmessage=o=>{const d=o.data;if(d.startsWith("~h~")){t.send(d);return}O(d).forEach(w=>{try{const f=JSON.parse(w);if(f.m!=="qsd")return;const b=f.p[1],k=z(b.n),c=b.v;if(!c)return;let p=null;typeof c.lp=="number"&&c.lp>0?p=c.lp:typeof c.ask=="number"&&typeof c.bid=="number"&&c.ask>0&&c.bid>0&&(p=(c.ask+c.bid)/2);const u=typeof c.chp=="number"?c.chp:null;if(p===null&&u===null)return;i(x=>{const l=x[k],g={price:p!==null?p:(l==null?void 0:l.price)??null,chp:u!==null?u:(l==null?void 0:l.chp)??null};return l&&l.price===g.price&&l.chp===g.chp?x:{...x,[k]:g}})}catch{}})},t.onclose=o=>{o.wasClean||(r.current=setTimeout(a,3e3))},t.onerror=()=>{}},[]);return m.useEffect(()=>(a(),()=>{var t;r.current&&clearTimeout(r.current),(t=s.current)==null||t.close()}),[a]),e}function F(e){return e===null?"—":e>=1e4?e.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}):e>=100?e.toFixed(2):e>=10?e.toFixed(3):e.toFixed(5)}function I(e){return e===null?"—":`${e>=0?"+":""}${e.toFixed(2)}%`}const M=()=>n.jsxs("div",{className:"skeleton-row",children:[n.jsxs("div",{className:"skeleton-left",children:[n.jsx("div",{className:"skeleton-flags"}),n.jsx("div",{className:"skeleton-symbol"})]}),n.jsxs("div",{className:"skeleton-right",children:[n.jsx("div",{className:"skeleton-price"}),n.jsx("div",{className:"skeleton-change"})]})]}),_=({pair:e,data:i,injectedPrice:s,injChange:r})=>{const a=(i==null?void 0:i.price)??null,t=s??a,o=s!=null?r??0:(i==null?void 0:i.chp)??null,d=(o??0)>=0;return n.jsx(j,{to:`/market/detail/${e.symbol}`,className:"row-link",children:n.jsxs("div",{className:"currency-row",children:[n.jsxs("div",{className:"left-section",children:[n.jsx(P,{pair:e,size:"sm"}),n.jsx("span",{className:"symbol-name",children:e.name})]}),n.jsxs("div",{className:"right-section",children:[n.jsx("span",{className:"price-value",children:F(t)}),n.jsxs("span",{className:`change-percent ${d?"green":"red"}`,children:[n.jsx("span",{className:"arrow",children:d?"▲":"▼"}),I(o)]})]})]})})},C=()=>{const e=D(),i=Object.keys(e).length>0,s=v();return n.jsxs(n.Fragment,{children:[n.jsx("style",{children:R}),n.jsxs("div",{className:"market-page",children:[n.jsx("div",{className:"market-header",children:n.jsx("div",{className:"nav-bar",children:n.jsx("div",{className:"page-title",children:"Market"})})}),n.jsx("div",{className:"content-card",children:n.jsx("div",{className:"market-container",children:y.map(r=>{if(!i)return n.jsx(M,{},r.symbol);const a=s[r.symbol],t=a?N(a):null,o=a&&t!=null?(t-a.entryPrice)/a.entryPrice*100:null;return n.jsx(_,{pair:r,data:e[r.symbol],injectedPrice:t,injChange:o},r.symbol)})})})]})]})};export{C as default};

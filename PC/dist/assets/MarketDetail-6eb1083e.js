import{w as ce,u as oe,aw as le,k as r,o as t,I as de,p}from"./index-879853f2.js";import{i as Z,C as ue}from"./CustomTradingChart-fcdb7db1.js";import{u as pe,c as me,g as xe,P as he,a as fe,b as be}from"./useSymbolInjections-86e6c4d5.js";import{C as ge}from"./CoinSelectorSidebar-4aeb962c.js";function ke(){const C=oe(),{id:O}=le(),f=r.useRef(null),z=r.useRef(null),y=r.useRef(null),P=r.useRef(null),$=r.useRef(O||"EURUSD"),[I,q]=r.useState([]),[m,F]=r.useState(null),[ee,T]=r.useState(null),N=r.useRef({}),[i,te]=r.useState(O||"EURUSD"),[b,L]=r.useState(null),[X,W]=r.useState([]),[S,G]=r.useState("orderBook"),[_,A]=r.useState(!1),[ye,H]=r.useState(!0),n=pe()[i]??null,[,ae]=r.useState(0);r.useEffect(()=>{const e=setInterval(()=>ae(a=>a+1),1e3);return()=>clearInterval(e)},[]);const R=n?me(n):null,se=r.useMemo(()=>n?{symbol:n.symbol,entryPrice:n.entryPrice,targetPrice:n.targetPrice,startedAt:n.startedAt,durationMs:n.durationMs,seed:n.seed}:null,[n==null?void 0:n.symbol,n==null?void 0:n.startedAt,n==null?void 0:n.targetPrice,n==null?void 0:n.durationMs,n==null?void 0:n.entryPrice,n==null?void 0:n.seed]);r.useEffect(()=>{$.current=i},[i]);const g=r.useCallback(e=>`~m~${e.length}~m~${e}`,[]),J=r.useCallback(e=>{const a=[];let s=e;for(;s.length>0&&s.startsWith("~m~");){const o=s.indexOf("~m~",3),d=parseInt(s.substring(3,o)),u=s.substring(o+3,o+3+d);a.push(u),s=s.substring(o+3+d)}return a},[]),K=r.useCallback(e=>{try{const a=e.replace(/^=\{/,"{");return JSON.parse(a).symbol||"UNKNOWN"}catch{return e}},[]),j=r.useCallback(e=>{const a=f.current,s=z.current;!a||a.readyState!==WebSocket.OPEN||!s||y.current!==e&&(y.current&&a.send(g(JSON.stringify({m:"quote_remove_symbols",p:[s,y.current]}))),a.send(g(JSON.stringify({m:"quote_add_symbols",p:[s,e]}))),y.current=e,q([]),F(null),T(null),H(!0),delete N.current[e])},[g]),E=r.useCallback(()=>{f.current&&(f.current.close(),f.current=null);const e=new WebSocket(xe());f.current=e,e.onopen=()=>{const a="qs_"+Math.random().toString(36).substring(2,12);z.current=a,e.send(g(JSON.stringify({m:"quote_create_session",p:[a]}))),e.send(g(JSON.stringify({m:"quote_set_fields",p:[a,"ask","bid"]}))),j($.current)},e.onmessage=a=>{const s=a.data;if(s.startsWith("~h~")){e.send(s);return}J(s).forEach(d=>{try{const u=JSON.parse(d);if(u.m==="qsd"){const c=u.p[1],l=K(c.n),x=c.v;if(!x)return;const h={symbol:l,ask:x.ask??0,bid:x.bid??0};q(B=>[...B.filter(ne=>ne.symbol!==l),h])}}catch{}})},e.onclose=a=>{y.current=null,a.wasClean||(P.current=setTimeout(()=>{E()},3e3))},e.onerror=a=>{console.error("WebSocket error:",a)}},[g,J,K,j]);r.useEffect(()=>(E(),()=>{P.current&&clearTimeout(P.current),f.current&&(f.current.close(),f.current=null)}),[E]),r.useEffect(()=>{j(i)},[i,j]),r.useEffect(()=>{const e=I.find(s=>s.symbol===i);if(!e||!e.ask||!e.bid)return;const a=(e.ask+e.bid)/2;if(F(a),H(!1),N.current[i]===void 0)N.current[i]=a,T(0);else{const s=N.current[i],o=(a-s)/s*100;T(o)}},[I,i]);const k=r.useCallback(e=>["XAUUSD","XAUEUR","XAUGBP"].includes(e)||["XAGUSD","XAGEUR","XAGGBP"].includes(e)||["XPTUSD","XPTEUR"].includes(e)||["XPDUSD"].includes(e)||["USOIL","UKOIL","BRENT","WTI","CRUDE"].includes(e)?2:["NGAS","HEAT","GAS"].includes(e)?3:["BTCUSD","ETHUSD"].includes(e)?2:["XRPUSD","ADAUSD","DOGEUSD","MATICUSD","UNIUSD","THETAUSD","CHZUSD","APEUSD"].includes(e)?4:["LTCUSD","BCHUSD","FILUSD","AXSUSD","SANDUSD","MANAUSD","ENJUSD"].includes(e)||["DOTUSD","AVAXUSD","LINKUSD","ATOMUSD","NEARUSD"].includes(e)?2:["ALGOUSD","VETUSD"].includes(e)?4:["US30","US500","NAS100","US2000","GER40","UK100","FRA40","EU50","JP225","HK50","AUS200","TWII","KR100","IN50","TECH100"].includes(e)?0:e.endsWith("JPY")?3:e.includes("USD")&&!e.startsWith("USD")?5:2,[]),w=r.useCallback((e,a)=>{if(e===null||isNaN(e))return"0.00000";const s=a?k(a):5;return e.toFixed(s)},[k]),M=r.useCallback(e=>e===null||isNaN(e)?"0.00":e>=1e6?(e/1e6).toFixed(2)+"M":e>=1e3?(e/1e3).toFixed(2)+"K":e.toFixed(2),[]),D=r.useCallback((e,a)=>{const s=k(a),o=e*2e-4,d=[],u=[];for(let c=1;c<=10;c++){const l=e-o*c*(.5+Math.random()*.5),x=e+o*c*(.5+Math.random()*.5),h=Math.random()*1e6+5e5;d.push([Number(l.toFixed(s)),Number(h.toFixed(2))]),u.push([Number(x.toFixed(s)),Number(h.toFixed(2))])}return d.sort((c,l)=>l[0]-c[0]),u.sort((c,l)=>c[0]-l[0]),{lastUpdateId:Date.now(),bids:d,asks:u}},[k]),U=r.useCallback((e,a,s=10)=>{const o=[],d=k(a),u=Date.now();for(let c=0;c<s;c++){const l=Math.random()>.5?"buy":"sell",x=(Math.random()*2-1)*1e-4*e,h=e+x,B=Math.random()*1e5+5e4;o.push({id:`${u-c*1e3}-${c}`,price:Number(h.toFixed(d)),quantity:Number(B.toFixed(2)),time:u-c*1e3,side:l})}return o.sort((c,l)=>l.time-c.time)},[k]);r.useEffect(()=>{if(m===null)return;const e=setInterval(()=>{Z(i)&&(L(D(m,i)),W(U(m,i,10)))},2e3);return()=>clearInterval(e)},[m,i,D,U]),r.useEffect(()=>{m!==null&&(L(D(m,i)),W(U(m,i,10)))},[m,i,D,U]);const re=he.map(e=>({symbol:e.symbol,name:e.name}));r.useCallback(()=>C.goBack(),[C]);const ie=e=>{if(e===i){A(!1);return}te(e),C.push(`/market/detail/${e}`)},V=()=>A(e=>!e),Q=r.useMemo(()=>fe(i)||{symbol:i,name:i.replace(/(.{3})(.{3})/,"$1 / $2")},[i]),v=({width:e="100%",height:a="1em"})=>t.jsx("div",{className:"loading-placeholder",style:{width:e,height:a}}),Y=r.useMemo(()=>{if(!b||!b.bids.length||!b.asks.length)return{buySide:[],sellSide:[]};const e=o=>{if(!o.length)return[];const d=o.map(l=>l[1]),u=Math.max(...d),c=Math.min(...d);return o.slice(0,10).map(l=>{const x=l[1];let h=u>c?(x-c)/(u-c)*100:0;return h=Math.max(h,10),{amount:M(x),price:w(l[0],i),intensity:Math.min(h,95)}})},a=e(b.bids),s=e(b.asks);for(;a.length<10;)a.push({amount:"0.00",price:"0.00000",intensity:10});for(;s.length<10;)s.push({amount:"0.00",price:"0.00000",intensity:10});return{buySide:a,sellSide:s}},[b,i,w,M]);return t.jsxs("div",{className:"market-detail-container",children:[t.jsx("div",{className:"header",children:t.jsxs("div",{className:"nav-bar",children:[t.jsx(de,{className:"back-arrow",to:"/market",children:t.jsx("i",{className:"fas fa-arrow-left"})}),t.jsxs("div",{className:"trading-pair",onClick:V,children:[t.jsx(be,{pair:Q,size:"sm"}),Q.name,t.jsx("i",{className:`fas fa-chevron-down dropdown-arrow ${_?"rotate":""}`})]}),t.jsx("div",{className:"header-icon",onClick:V,children:t.jsx("i",{className:"fas fa-bars"})})]})}),t.jsxs("div",{className:"content-card",children:[(()=>{const e=R??m,a=n&&R!=null?(R-n.entryPrice)/n.entryPrice*100:null,s=a??ee,o=s!==null&&s<0,d=Z(i);return t.jsx("div",{className:"price-section",children:t.jsx("div",{className:"price-main-row",children:t.jsxs("div",{className:"price-left-section",children:[t.jsx("div",{className:"current-price",children:e!==null?t.jsx("span",{style:{color:o?"#f56c6c":"#37b66a"},children:w(e,i)}):t.jsx(v,{width:"120px",height:"28px"})}),t.jsxs("div",{className:"price-info-row",children:[t.jsx("div",{className:"usd-price",children:e!==null?`$${e.toFixed(2)}`:"$0.00"}),t.jsx("div",{className:"price-change",style:{color:o?"#f56c6c":"#37b66a"},children:s!==null?`${s<0?"−":"+"}${Math.abs(s).toFixed(2)}%`:t.jsx(v,{width:"60px",height:"16px"})}),!d&&t.jsxs("div",{className:"market-closed-badge",children:[t.jsx("span",{className:"dot"})," Market closed"]})]})]})})})})(),t.jsx("div",{className:"chart-section",children:t.jsx(ue,{symbol:i,livePrice:m,height:400,priceInjection:se},i)}),t.jsxs("div",{className:"tabs-section",children:[t.jsxs("div",{className:"tabs-header",children:[t.jsx("div",{className:`tab ${S==="orderBook"?"active":""}`,onClick:()=>G("orderBook"),children:p("pages.marketDetail.tabs.orderBook")}),t.jsx("div",{className:`tab ${S==="transactions"?"active":""}`,onClick:()=>G("transactions"),children:p("pages.marketDetail.tabs.transactions")})]}),t.jsxs("div",{className:"tab-content",children:[S==="orderBook"&&t.jsx("div",{className:"modern-order-book",children:t.jsxs("div",{className:"order-book-table",children:[t.jsxs("div",{className:"table-header",children:[t.jsxs("div",{className:"buy-section",children:[t.jsx("div",{className:"column-header",children:p("pages.marketDetail.orderBook.buy")}),t.jsx("div",{className:"column-header",children:p("pages.marketDetail.orderBook.quantity")}),t.jsx("div",{className:"column-header",children:p("pages.marketDetail.orderBook.price")})]}),t.jsxs("div",{className:"sell-section",children:[t.jsx("div",{className:"column-header",children:p("pages.marketDetail.orderBook.price")}),t.jsx("div",{className:"column-header",children:p("pages.marketDetail.orderBook.quantity")}),t.jsx("div",{className:"column-header",style:{textAlign:"right"},children:p("pages.marketDetail.orderBook.sell")})]})]}),t.jsx("div",{className:"table-body",children:Y.buySide.map((e,a)=>{const s=Y.sellSide[a]||{amount:"0.00",price:"0.00000",intensity:10};return t.jsxs("div",{className:"table-row",children:[t.jsxs("div",{className:"buy-section",children:[t.jsx("div",{className:"cell buy-cell",children:a+1}),t.jsx("div",{className:"cell quantity",children:e.amount}),t.jsxs("div",{className:"cell price-cell",children:[t.jsx("div",{className:"heatmap-bar buy-heatmap",style:{width:`${e.intensity}%`}}),t.jsx("span",{className:"price-value buy-price",children:e.price})]})]}),t.jsxs("div",{className:"sell-section",children:[t.jsxs("div",{className:"cell price-cell",children:[t.jsx("div",{className:"heatmap-bar sell-heatmap",style:{width:`${s.intensity}%`}}),t.jsx("span",{className:"price-value sell-price",children:s.price})]}),t.jsx("div",{className:"cell quantity",children:s.amount}),t.jsx("div",{className:"cell sell-cell",children:a+1})]})]},a)})})]})}),S==="transactions"&&t.jsxs("div",{className:"transactions-container",children:[t.jsxs("div",{className:"transactions-header",children:[t.jsx("div",{className:"header-item",children:p("pages.marketDetail.recentTrades.time")}),t.jsx("div",{className:"header-item",children:p("pages.marketDetail.recentTrades.price")}),t.jsx("div",{className:"header-item",children:p("pages.marketDetail.recentTrades.amount")})]}),t.jsx("div",{className:"transactions-list",children:X.length>0?X.slice(0,10).map(e=>t.jsxs("div",{className:"transaction-item",children:[t.jsx("div",{className:"transaction-time",children:new Date(e.time).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"})}),t.jsx("div",{className:`transaction-price ${e.side==="buy"?"buy":"sell"}`,children:w(e.price,i)}),t.jsx("div",{className:"transaction-amount",children:M(e.quantity)})]},e.id)):Array.from({length:5}).map((e,a)=>t.jsxs("div",{className:"transaction-item",children:[t.jsx("div",{className:"transaction-time",children:t.jsx(v,{width:"50px",height:"14px"})}),t.jsx("div",{className:"transaction-price",children:t.jsx(v,{width:"60px",height:"14px"})}),t.jsx("div",{className:"transaction-amount",children:t.jsx(v,{width:"50px",height:"14px"})})]},a))})]})]})]})]}),t.jsx(ge,{isOpen:_,onClose:()=>A(!1),selectedCoin:i,onCoinSelect:ie,availableCoins:re,title:p("pages.marketDetail.coinSelector.title")}),t.jsx("style",{children:`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        body {
          background-color: var(--kt-bg-card-alt);
          color: var(--kt-text-secondary);
          line-height: 1.6;
          overflow-x: hidden;
        }

        .market-detail-container {
          
          margin: 0 auto;
          position: relative;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
        }

        /* Header – identical to LoginPassword */
        .header {
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          min-height: 60px;
          position: relative;
          padding: 20px;
        }

        .nav-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .back-arrow {
          color: white;
          font-size: 20px;
          font-weight: 300;
          text-decoration: none;
          transition: opacity 0.3s ease;
        }

        .back-arrow:hover {
          opacity: 0.8;
        }

        .trading-pair {
          color: white;
          font-size: 17px;
          font-weight: 600;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .trading-pair:hover {
          opacity: 0.9;
        }

        .dropdown-arrow {
          font-size: 14px;
          transition: transform 0.2s;
        }

        .dropdown-arrow.rotate {
          transform: rotate(180deg);
        }

        .header-icon {
          color: white;
          font-size: 20px;
          cursor: pointer;
        }

        .header-icon:hover {
          opacity: 0.8;
        }

        /* Content Card – white, rounded top, same as LoginPassword */
        .content-card {
          background: var(--kt-bg-card);
          border-radius: 40px 40px 0 0;
          padding: 30px 20px 100px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          min-height: calc(100vh - 60px);
        }

        /* Price Section */
        .price-section {
          margin-bottom: 20px;
        }

        .price-main-row {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .price-left-section {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .current-price {
          font-size: 28px;
          font-weight: 600;
          color: var(--kt-text-primary);
        }

        .price-info-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .usd-price {
          font-size: 14px;
          color: var(--kt-text-tertiary);
        }

        .price-change {
          font-size: 14px;
          font-weight: 500;
        }

        .market-closed-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 600;
          color: var(--kt-text-muted);
          background: var(--kt-bg-card-alt);
          border: 1px solid var(--kt-border);
          border-radius: 999px;
          padding: 2px 10px;
        }

        .market-closed-badge .dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #c0c6d0;
          display: inline-block;
        }

        /* Chart Section */
        .chart-section {
          margin-bottom: 20px;
          background-color: var(--kt-bg-card);
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #e0e3e8;
        }

        [data-theme='dark'] .chart-section {
          background-color: #0b0e14;
          border-color: #1c212b;
        }

        /* Tabs Section */
        .tabs-section {
          background-color: var(--kt-bg-card);
          border-radius: 12px;
          border: 1px solid var(--kt-border);
          overflow: hidden;
        }

        .tabs-header {
          display: flex;
          border-bottom: 1px solid var(--kt-border);
        }

        .tab {
          flex: 1;
          padding: 12px;
          text-align: center;
          font-size: 13px;
          font-weight: 500;
          color: var(--kt-text-tertiary);
          cursor: pointer;
          transition: all 0.2s;
        }

        .tab.active {
          color: #106cf5;
          border-bottom: 2px solid #106cf5;
          font-weight: 600;
        }

        .tab:hover:not(.active) {
          color: var(--kt-text-secondary);
        }

        .tab-content {
          padding: 16px;
        }

        /* Order Book */
        .modern-order-book {
          width: 100%;
        }

        .order-book-table {
          display: flex;
          flex-direction: column;
        }

        .table-header {
          display: flex;
          margin-bottom: 8px;
          font-size: 11px;
          color: var(--kt-text-tertiary);
          font-weight: 500;
        }

        .buy-section {
          flex: 1;
          display: flex;
          gap: 8px;
        }

        .sell-section {
          flex: 1;
          display: flex;
          gap: 8px;
        }

        .column-header {
          flex: 1;
          text-align: left;
        }

        .table-body {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .table-row {
          display: flex;
          align-items: center;
          font-size: 12px;
        }

        .cell {
          flex: 1;
          text-align: left;
          padding: 4px 0;
          color: var(--kt-text-secondary);
        }

        .price-cell {
          position: relative;
          display: flex;
          align-items: center;
        }

        .heatmap-bar {
          position: absolute;
          left: 0;
          height: 100%;
          opacity: 0.12;
          z-index: 0;
          border-radius: 2px;
        }

        .buy-heatmap {
          background-color: #37b66a;
        }

        .sell-heatmap {
          background-color: #f56c6c;
        }

        .price-value {
          position: relative;
          z-index: 1;
        }

        .buy-price {
          color: #37b66a;
        }

        .sell-price {
          color: #f56c6c;
        }

        .buy-cell, .sell-cell {
          color: var(--kt-text-tertiary);
          font-size: 11px;
        }

        .quantity {
          color: var(--kt-text-secondary);
        }

        /* Transactions */
        .transactions-container {
          width: 100%;
        }

        .transactions-header {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 11px;
          color: var(--kt-text-tertiary);
          border-bottom: 1px solid var(--kt-border);
          margin-bottom: 8px;
        }

        .header-item {
          flex: 1;
          text-align: left;
        }

        .transactions-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .transaction-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 12px;
          border-bottom: 1px solid #f0f2f5;
        }

        .transaction-time {
          flex: 1;
          color: var(--kt-text-tertiary);
        }

        .transaction-price {
          flex: 1;
          font-weight: 500;
        }

        .transaction-price.buy {
          color: #37b66a;
        }

        .transaction-price.sell {
          color: #f56c6c;
        }

        .transaction-amount {
          flex: 1;
          text-align: right;
          color: var(--kt-text-secondary);
        }

        /* Loading Placeholder */
        .loading-placeholder {
          animation: pulse 1.5s ease-in-out infinite;
          background-color: var(--kt-border);
          border-radius: 4px;
        }

        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }

        /* Responsive */
        @media (max-width: 380px) {
          .header {
            padding: 16px;
            min-height: 50px;
          }
          .content-card {
            padding: 25px 16px 100px;
          }
          .current-price {
            font-size: 24px;
          }
        }

        @media (min-width: 768px) {
          .content-card {
            border-radius: 30px 30px 0 0;
          }
        }
      `})]})}const Ue=ce.memo(ke);export{Ue as default};

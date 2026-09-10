import{p as k,v as P,i as o,j as e,L as z,y as I,an as M}from"./index-0bd63528.js";import{c as T}from"./assetsFormSelectors-0c2bbc2a.js";import{u as O}from"./useDispatch-8b810a85.js";function _(){const x=O(),u=k(T.selectSaveLoading);k(T.selectRecord);const d=k(P.selectRows),[r,F]=o.useState("USD"),[B,m]=o.useState(!1),[n,f]=o.useState("exchange"),[c,h]=o.useState("trade"),[g,p]=o.useState(""),[i,b]=o.useState(0),[j,l]=o.useState({from:!1,to:!1}),v=o.useRef(null),y=o.useRef(null),N=[{code:"USD",name:"Tether USD",color:"#26A17B",symbol:"USD"},{code:"ETH",name:"Ethereum",color:"#627EEA",symbol:"ETH"},{code:"BTC",name:"Bitcoin",color:"#F7931A",symbol:"BTC"},{code:"USDC",name:"USD Coin",color:"#2775CA",symbol:"USDC"},{code:"DAI",name:"Dai",color:"#F4B731",symbol:"DAI"},{code:"SHIB",name:"Shiba Inu",color:"#FFC107",symbol:"SHIB"},{code:"XRP",name:"Ripple",color:"#23292F",symbol:"XRP"},{code:"TRX",name:"TRON",color:"#FF001A",symbol:"TRX"},{code:"SOL",name:"Solana",color:"#00FFA3",symbol:"SOL"},{code:"BNB",name:"Binance Coin",color:"#F0B90B",symbol:"BNB"},{code:"DOGE",name:"Dogecoin",color:"#C2A633",symbol:"DOGE"}],w=[{code:"exchange",name:"Exchange"},{code:"trade",name:"Trade"},{code:"perpetual",name:"Perpetual"}],D=t=>{x(M.doTransfer(t))};o.useEffect(()=>{let t=!0;return(async()=>{try{await x(I.doFetch())}catch(s){t&&console.error("Error fetching assets:",s)}})(),()=>{t=!1}},[x]),o.useEffect(()=>{if(d&&d.length>0){const t=d.find(a=>a.symbol===r&&a.accountType===n);b(t&&t.amount||0)}else b(0)},[d,r,n]),o.useEffect(()=>{const t=a=>{v.current&&!v.current.contains(a.target)&&l(s=>({...s,from:!1})),y.current&&!y.current.contains(a.target)&&l(s=>({...s,to:!1}))};return document.addEventListener("mousedown",t),()=>document.removeEventListener("mousedown",t)},[]);const E=t=>{F(t),m(!1),p("")},S=(t,a)=>{a==="from"?(f(t),t===c&&h(t==="exchange"?"trade":"exchange")):(h(t),t===n&&f(t==="exchange"?"trade":"exchange")),l(s=>({...s,[a]:!1}))},R=t=>{const a=t.target.value;(a===""||/^\d*\.?\d*$/.test(a))&&p(a)},L=()=>{p(i.toString())},U=()=>{const t=n;f(c),h(t)},$=()=>{const t=parseFloat(g);if(!t||t<=0){alert("Please enter a valid amount");return}if(t>i){alert("Insufficient balance");return}if(n===c){alert("Cannot transfer to the same account");return}N.find(s=>s.code===r);const a={symbol:r,fromAccount:n,toAccount:c,amount:t,status:"completed"};console.log("Transfer data:",a),D(a),p("")},A=t=>{const a=w.find(s=>s.code===t);return a?a.name:t},C=()=>{const t=parseFloat(g);return t>0&&t<=i&&n!==c&&!u};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"container",children:[e.jsx("div",{className:"header",children:e.jsxs("div",{className:"nav-bar",children:[e.jsx(z,{to:"/wallets",className:"back-arrow remove_blue",children:e.jsx("div",{className:"back-arrow",children:e.jsx("i",{className:"fas fa-arrow-left"})})}),e.jsx("div",{className:"page-title",children:"Transfer"}),e.jsx(z,{to:"/transferAll",className:"header-icon remove_blue",children:e.jsx("div",{className:"header-icon",children:e.jsx("i",{className:"fas fa-receipt"})})})]})}),e.jsxs("div",{className:"content-card",children:[e.jsxs("div",{className:"currency-selector",children:[e.jsx("div",{className:"selector-header",children:e.jsx("div",{className:"selector-label",children:"Select currency"})}),e.jsxs("div",{className:"selected-currency",onClick:()=>m(!0),children:[e.jsxs("div",{className:"currency-icon",children:[e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${r}.png`,style:{width:"100%"}}),e.jsx("span",{children:r})]}),e.jsx("div",{className:"currency-name",style:{paddingLeft:10},children:r}),e.jsx("i",{className:"fas fa-chevron-down selector-arrow"})]}),e.jsx("div",{className:"warning-messages",children:i===0?"There are currently no assets available, please select another":""})]}),e.jsxs("div",{className:"wallet-section",children:[e.jsxs("div",{className:"wallet-card",children:[e.jsxs("div",{className:"wallet-row",ref:v,children:[e.jsx("div",{className:"wallet-label",children:"From:"}),e.jsxs("div",{className:"wallet-value",onClick:()=>l(t=>({...t,from:!t.from})),children:[A(n),e.jsx("i",{className:"fas fa-chevron-right wallet-arrow"}),j.from&&e.jsx("div",{className:"account-dropdown",children:w.map(t=>e.jsx("div",{className:`account-item ${n===t.code?"selected":""}`,onClick:a=>{a.stopPropagation(),S(t.code,"from")},children:t.name},`from-${t.code}`))})]})]}),e.jsx("div",{className:"transfer-direction",children:e.jsx("div",{className:"direction-arrow",children:e.jsx("i",{className:"fas fa-arrow-down"})})}),e.jsxs("div",{className:"wallet-row",ref:y,children:[e.jsx("div",{className:"wallet-label",children:"To:"}),e.jsxs("div",{className:"wallet-value",onClick:()=>l(t=>({...t,to:!t.to})),children:[A(c),e.jsx("i",{className:"fas fa-chevron-right wallet-arrow"}),j.to&&e.jsx("div",{className:"account-dropdown",children:w.map(t=>e.jsx("div",{className:`account-item ${c===t.code?"selected":""}`,onClick:a=>{a.stopPropagation(),S(t.code,"to")},children:t.name},`to-${t.code}`))})]})]})]}),e.jsx("div",{className:"swap-wallets",onClick:U,children:e.jsx("i",{className:"fas fa-exchange-alt"})})]}),e.jsxs("div",{className:"quantity-section",children:[e.jsxs("div",{className:"input-group",children:[e.jsx("input",{type:"text",className:"input-field",value:g,onChange:R,placeholder:"0.0"}),e.jsxs("div",{className:"input-actions",children:[e.jsx("div",{className:"token-symbol",children:r}),e.jsx("button",{className:"max-button",onClick:L,disabled:i===0,children:"Maximum"})]})]}),e.jsxs("div",{className:"balance-info",children:["Available: ",i.toFixed(8)," ",r]})]}),e.jsx("button",{className:`transfer-button ${C()?"enabled":""}`,onClick:$,disabled:!C()||u,children:u?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-spinner fa-spin"})," Processing..."]}):"Transfer"})]})]}),B&&e.jsx("div",{className:"modal-overlay",onClick:()=>m(!1),children:e.jsxs("div",{className:"modal-content",onClick:t=>t.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("div",{className:"modal-title",children:"Select Currency"}),e.jsx("button",{className:"modal-close",onClick:()=>m(!1),children:e.jsx("i",{className:"fas fa-times"})})]}),e.jsx("ul",{className:"currency-list",children:N.map(t=>e.jsxs("li",{className:`currency-item ${r===t.code?"selected":""}`,onClick:()=>E(t.code),children:[e.jsx("div",{className:"currency-icon",children:e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${t.code}.png`,style:{width:"100%"}})}),e.jsxs("div",{className:"currency-name",children:[e.jsx("div",{className:"item-code",children:t.code}),e.jsx("div",{className:"item-name",children:t.name})]}),e.jsx("i",{className:"fas fa-check check-icon"})]},t.code))})]})}),e.jsx("style",{children:`
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

                .container {
                    max-width: 400px;
                    margin: 0 auto;
                    height: 100dvh;
                    position: relative;
                    background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
                }

                /* Header Section */
                .header {
                    padding: 15px 20px;
                    color: white;
                    position: sticky;
                    top: 0;
                    z-index: 100;
                }

                .nav-bar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .back-arrow {
                    font-size: 18px;
                    font-weight: 300;
                }

                .remove_blue {
                    color: white;
                    text-decoration: none;
                }

                .page-title {
                    font-size: 18px;
                    font-weight: 600;
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                }

                .header-icon {
                    font-size: 16px;
                    cursor: pointer;
                }

                /* Content Section */
                .content-card {
                    background: var(--kt-bg-card);
                    border-radius: 40px 40px 0 0;
                    height: calc(100% - 60px);
                    padding: 30px 20px 100px;
                    overflow-y: auto;
                }

                .section-title {
                    font-size: 16px;
                    font-weight: 600;
                    margin-bottom: 15px;
                    color: var(--kt-text-secondary);
                }

                /* Currency Selector */
                .currency-selector {
                    margin-bottom: 20px;
                }

                .selector-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 12px;
                }

                .selector-label {
                    font-size: 12px;
                    color: var(--kt-text-secondary);
                    font-weight: 500;
                }

                .selected-currency {
                    display: flex;
                    align-items: center;
                    padding: 15px;
                    border: 1px solid var(--kt-border);
                    border-radius: 8px;
                    background: var(--kt-bg-card);
                    cursor: pointer;
                    position: relative;
                }

                .currency-icon {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    color: white;
                    font-weight: bold;
                    font-size: 12px;
                }

                .currency-name {
                    font-size: 14px;
                    font-weight: 600;
                    color: var(--kt-text-secondary);
                    flex: 1;
                }

                .selector-arrow {
                    color: var(--kt-text-muted);
                    font-size: 12px;
                }

                .warning-messages {
                    color: #d40000;
                    font-size: 12px;
                    padding-left: 5px;
                    margin-top: 5px;
                    min-height: 18px;
                }

                /* Wallet Section */
                .wallet-section {
                    margin-bottom: 20px;
                    position: relative;
                    display: flex;
                }

                .wallet-card {
                    background: var(--kt-bg-card);
                    width: 100%;
                    padding: 20px;
                    border: 1px solid var(--kt-border);
                    position: relative;
                }

                .wallet-row {
                    display: flex;
                    align-items: center;
                    padding: 12px 0;
                    gap: 20px;
                    position: relative;
                }

                .wallet-row:first-child {
                    border-bottom: 1px solid var(--kt-border);
                }

                .wallet-label {
                    font-size: 12px;
                    color: var(--kt-text-secondary);
                    min-width: 40px;
                }

                .wallet-value {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 8px;
                    font-size: 14px;
                    font-weight: 500;
                    color: #000;
                    cursor: pointer;
                    position: relative;
                }

                .wallet-arrow {
                    font-size: 13px;
                    color: var(--kt-text-secondary);
                }

                /* Account Dropdown */
                .account-dropdown {
                    position: absolute;
                    top: 100%;
                    right: 0;
                    background: var(--kt-bg-card);
                    border: 1px solid var(--kt-border);
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                    z-index: 10;
                    min-width: 120px;
                    margin-top: 5px;
                }

                .account-item {
                    padding: 10px 15px;
                    font-size: 14px;
                    cursor: pointer;
                    transition: background 0.2s;
                }

                .account-item:hover {
                    background: var(--kt-bg-card-alt);
                }

                .account-item.selected {
                    background: #e6f0ff;
                    color: #106cf5;
                }

                .transfer-direction {
                    display: flex;
                    justify-content: center;
                    margin: 10px 0;
                }

                .direction-arrow {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: var(--kt-border);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--kt-text-secondary);
                    font-size: 12px;
                }

      .swap-wallets {

    background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
    display: flex;
    align-items: center;
    /* justify-content: center; */
    color: white;
    padding: 8px;
}

                .swap-wallets:hover {
                    opacity: 0.9;
                }

                /* Quantity Section */
                .quantity-section {
                    margin-bottom: 30px;
                }

                .input-group {
                    position: relative;
                    margin-bottom: 10px;
                }

                .input-field {
                    width: 100%;
                    padding: 16px;
                    border: 1px solid var(--kt-border);
                    border-radius: 8px;
                    background: var(--kt-bg-card);
                    font-size: 16px;
                    transition: border-color 0.3s ease;
                }

                .input-field:focus {
                    outline: none;
                    border-color: #106cf5;
                }

                .input-actions {
                    position: absolute;
                    right: 12px;
                    top: 50%;
                    transform: translateY(-50%);
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .token-symbol {
                    font-size: 12px;
                    color: var(--kt-text-secondary);
                }

                .max-button {
                    background: #e6f0ff;
                    border: none;
                    border-radius: 6px;
                    padding: 4px 8px;
                    color: #106cf5;
                    font-size: 12px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .max-button:hover:not(:disabled) {
                    background: #d0e2ff;
                }

                .max-button:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                .balance-info {
                    font-size: 13px;
                    color: var(--kt-text-secondary);
                    text-align: right;
                }

                /* Transfer Button */
                .transfer-button {
                    background: #ccc;
                    border: none;
                    border-radius: 8px;
                    padding: 12px;
                    color: white;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: not-allowed;
                    width: 100%;
                    transition: all 0.3s ease;
                }

                .transfer-button.enabled {
                    background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
                    cursor: pointer;
                }

                .transfer-button.enabled:hover:not(:disabled) {
                    opacity: 0.9;
                }

                .transfer-button:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }

                /* Modal Styles */
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    padding: 16px;
                }

                .modal-content {
                    background: var(--kt-bg-card);
                    border-radius: 16px;
                    width: 90%;
                    max-width: 350px;
                    max-height: 80vh;
                    overflow-y: auto;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                }

                .modal-header {
                    padding: 20px;
                    border-bottom: 1px solid var(--kt-border);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .modal-title {
                    font-size: 18px;
                    font-weight: 600;
                    color: var(--kt-text-secondary);
                }

                .modal-close {
                    background: none;
                    border: none;
                    font-size: 18px;
                    color: var(--kt-text-muted);
                    cursor: pointer;
                    padding: 5px;
                }

                .currency-list {
                    list-style: none;
                    padding: 0;
                    max-height: 400px;
                    overflow-y: auto;
                }

                .currency-item {
                    padding: 12px 20px;
                    border-bottom: 1px solid var(--kt-border);
                    cursor: pointer;
                    transition: background-color 0.2s;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .currency-item:hover {
                    background: var(--kt-bg-card-alt);
                }

                .currency-item.selected {
                    background: #e6f0ff;
                }

                .currency-item .currency-name {
                    flex: 1;
                }

                .currency-item .item-code {
                    font-size: 14px;
                    font-weight: 600;
                    color: var(--kt-text-primary);
                    margin-bottom: 2px;
                }

                .currency-item .item-name {
                    font-size: 12px;
                    color: var(--kt-text-muted);
                }

                .check-icon {
                    color: #106cf5;
                    font-size: 12px;
                    display: none;
                }

                .currency-item.selected .check-icon {
                    display: block;
                }

                /* Responsive adjustments */
                @media (max-width: 380px) {
                    .container {
                        padding: 0;
                    }

                    .header {
                        padding: 16px;
                    }

                    .content-card {
                        padding: 25px 16px 100px;
                    }

                    .currency-selector,
                    .wallet-section,
                    .quantity-section {
                        padding: 0;
                    }
                    
                    .wallet-card {
                        padding: 16px;
                    }
                }
            `})]})}export{_ as default};

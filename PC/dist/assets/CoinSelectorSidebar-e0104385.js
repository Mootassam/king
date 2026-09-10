import{k as o,o as e}from"./index-09aa8b3d.js";const u=[{symbol:"XAUUSD",name:"XAUUSD"},{symbol:"EURUSD",name:"EUR / USD"},{symbol:"GBPUSD",name:"GBP / USD"},{symbol:"BTCUSD",name:"Bitcoin"},{symbol:"ETHUSD",name:"Ethereum"},{symbol:"XAGUSD",name:"XAGUSD"},{symbol:"AUDUSD",name:"AUD / USD"},{symbol:"USDJPY",name:"USD / JPY"},{symbol:"NZDUSD",name:"NZD / USD"},{symbol:"USDCHF",name:"USD / CHF"},{symbol:"USDCAD",name:"USD / CAD"},{symbol:"LTCUSD",name:"Litecoin"},{symbol:"USOIL",name:"US Oil"},{symbol:"UKOIL",name:"UK Oil"},{symbol:"EURJPY",name:"EUR / JPY"},{symbol:"EURCHF",name:"EUR / CHF"},{symbol:"AUDNZD",name:"AUD / NZD"},{symbol:"GBPAUD",name:"GBP / AUD"},{symbol:"AUDJPY",name:"AUD / JPY"},{symbol:"EURNZD",name:"EUR / NZD"},{symbol:"CADJPY",name:"CAD / JPY"},{symbol:"NZDJPY",name:"NZD / JPY"},{symbol:"EURAUD",name:"EUR / AUD"},{symbol:"GBPJPY",name:"GBP / JPY"},{symbol:"EURCAD",name:"EUR / CAD"},{symbol:"GBPNZD",name:"GBP / NZD"},{symbol:"EURGBP",name:"EUR / GBP"},{symbol:"NAS100",name:"Nasdaq 100"},{symbol:"AUS200",name:"ASX 200"},{symbol:"ESP35",name:"IBEX 35"},{symbol:"FRA40",name:"CAC 40"},{symbol:"GER30",name:"DAX 30"},{symbol:"SPX500",name:"S&P 500"},{symbol:"US30",name:"Dow Jones 30"},{symbol:"UK100",name:"FTSE 100"},{symbol:"JPN225",name:"Nikkei 225"}],h=({isOpen:r,onClose:s,selectedCoin:c,onCoinSelect:p,availableCoins:m=u,title:x="Select Trading Pair"})=>{const[t,n]=o.useState(""),i=o.useRef(null),d=o.useMemo(()=>m.filter(a=>a.name.toLowerCase().includes(t.toLowerCase())||a.symbol.toLowerCase().includes(t.toLowerCase())),[t,m]);o.useEffect(()=>{const a=l=>{const b=l.target;i.current&&b instanceof Node&&!i.current.contains(b)&&s()};return r&&(document.addEventListener("mousedown",a),n("")),()=>{document.removeEventListener("mousedown",a)}},[r,s]);const f=a=>{if(a===c){s();return}p(a)};return o.useEffect(()=>{const a=l=>{l.key==="Escape"&&r&&s()};return r&&document.addEventListener("keydown",a),()=>{document.removeEventListener("keydown",a)}},[r,s]),r?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"sidebar-overlay"}),e.jsxs("div",{className:"coin-selector-sidebar",ref:i,children:[e.jsxs("div",{className:"sidebar-header",children:[e.jsx("div",{className:"sidebar-title",children:x}),e.jsx("div",{className:"close-sidebar",onClick:s,children:e.jsx("i",{className:"fas fa-times"})})]}),e.jsxs("div",{className:"search-container",children:[e.jsx("i",{className:"fas fa-search search-icon"}),e.jsx("input",{type:"text",placeholder:"Search pairs...",value:t,onChange:a=>n(a.target.value),className:"search-input",autoFocus:!0}),t&&e.jsx("button",{className:"clear-search",onClick:()=>n(""),children:e.jsx("i",{className:"fas fa-times"})})]}),e.jsxs("div",{className:"pairs-list",children:[d.map(a=>e.jsxs("div",{className:`pair-item ${c===a.symbol?"selected":""}`,onClick:()=>f(a.symbol),children:[e.jsx("div",{className:"pair-name",children:a.name}),e.jsx("div",{className:"pair-symbol",children:a.symbol})]},a.symbol)),d.length===0&&e.jsxs("div",{className:"no-results",children:[e.jsx("i",{className:"fas fa-search"}),e.jsx("div",{children:"No pairs found"}),e.jsx("div",{className:"no-results-sub",children:"Try different search terms"})]})]}),e.jsx("style",{children:`
                    .sidebar-overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: rgba(0, 0, 0, 0.5);
                        z-index: 1000;
                        animation: fadeIn 0.2s ease;
                    }

                    .coin-selector-sidebar {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 90%;
                        max-width: 280px;
                        height: 100%;
                        background: var(--kt-bg-card);
                        z-index: 1001;
                        display: flex;
                        flex-direction: column;
                        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
                        animation: slideFromLeft 0.2s ease;
                        overflow: hidden;
                        border-right: 1px solid var(--kt-border);
                    }

                    .sidebar-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 20px;
                        border-bottom: 1px solid var(--kt-border);
                        background: var(--kt-bg-card);
                    }

                    .sidebar-title {
                        font-size: 17px;
                        font-weight: 600;
                        color: var(--kt-text-primary);
                    }

                    .close-sidebar {
                        width: 32px;
                        height: 32px;
                        border-radius: 50%;
                        background: var(--kt-bg-card-alt);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        transition: all 0.2s ease;
                        color: var(--kt-text-tertiary);
                    }

                    .close-sidebar:hover {
                        background: #e6efff;
                        color: #106cf5;
                    }

                    .search-container {
                        position: relative;
                        padding: 16px 20px;
                        border-bottom: 1px solid var(--kt-border);
                    }

                    .search-icon {
                        position: absolute;
                        left: 36px;
                        top: 50%;
                        transform: translateY(-50%);
                        color: var(--kt-text-muted);
                        font-size: 14px;
                    }

                    .search-input {
                        width: 100%;
                        padding: 10px 40px 10px 36px;
                        border: 1px solid var(--kt-border);
                        border-radius: 10px;
                        font-size: 14px;
                        background: var(--kt-bg-card-alt);
                        color: var(--kt-text-primary);
                        transition: all 0.2s ease;
                    }

                    .search-input:focus {
                        outline: none;
                        border-color: #106cf5;
                        background: var(--kt-bg-card);
                        box-shadow: 0 0 0 3px rgba(16, 108, 245, 0.1);
                    }

                    .search-input::placeholder {
                        color: var(--kt-text-muted);
                    }

                    .clear-search {
                        position: absolute;
                        right: 36px;
                        top: 50%;
                        transform: translateY(-50%);
                        background: none;
                        border: none;
                        color: var(--kt-text-muted);
                        cursor: pointer;
                        padding: 4px;
                        border-radius: 4px;
                        transition: all 0.2s ease;
                    }

                    .clear-search:hover {
                        background: var(--kt-bg-card-alt);
                        color: #106cf5;
                    }

                    .pairs-list {
                        flex: 1;
                        overflow-y: auto;
                        padding: 8px 0;
                    }

                    .pair-item {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 14px 20px;
                        cursor: pointer;
                        transition: all 0.2s ease;
                        border-bottom: 1px solid #f0f2f5;
                    }

                    .pair-item:hover {
                        background: var(--kt-bg-card-alt);
                    }

                    .pair-item.selected {
                        background: #e6efff;
                        border-left: 3px solid #106cf5;
                    }

                    .pair-item.selected .pair-name {
                        color: #106cf5;
                        font-weight: 600;
                    }

                    .pair-item.selected .pair-symbol {
                        color: #106cf5;
                    }

                    .pair-name {
                        font-size: 14px;
                        font-weight: 500;
                        color: var(--kt-text-primary);
                    }

                    .pair-symbol {
                        font-size: 12px;
                        color: var(--kt-text-tertiary);
                        font-weight: 400;
                    }

                    .no-results {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        padding: 60px 20px;
                        color: var(--kt-text-muted);
                        text-align: center;
                        font-size: 14px;
                    }

                    .no-results i {
                        font-size: 36px;
                        margin-bottom: 12px;
                        opacity: 0.4;
                        color: #106cf5;
                    }

                    .no-results-sub {
                        font-size: 12px;
                        margin-top: 6px;
                        opacity: 0.7;
                    }

                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }

                    @keyframes slideFromLeft {
                        from {
                            transform: translateX(-100%);
                        }
                        to {
                            transform: translateX(0);
                        }
                    }

                    @media (max-width: 380px) {
                        .coin-selector-sidebar {
                            width: 85%;
                        }
                    }
                `})]})]}):null};export{h as C};

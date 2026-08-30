import{u as T,i as H,j as a,k as q,n as e,o as s,p as Re,q as Te,t as $e,R as Be,v as qe,L as Oe,S as De,w as Ue,x as Y,y as We,z as _e,A as He,B as Ve,C as ge,D as Ke,E as Xe,F as Ie}from"./index-b391d884.js";import{g as Je,P as be,u as Ge,a as Qe,b as ye}from"./useSymbolInjections-f8b7dbb6.js";import{C as Ye}from"./CustomTradingChart-25da24f5.js";import{l as Ze}from"./layoutActions-da5eee80.js";import{u as ie}from"./useDispatch-fd5e8771.js";function et({initialMode:n="login",onClose:b}){const l=ie(),f=T(H.selectLoading),u=T(H.selectErrorMessage),[j,w]=a.useState(n),[N,h]=a.useState(""),[y,k]=a.useState(""),[C,O]=a.useState(!0),[F,D]=a.useState(""),[M,S]=a.useState(""),[o,i]=a.useState(null);a.useEffect(()=>{l(q.doClearErrorMessage())},[l]);const x=p=>{w(p),i(null),l(q.doClearErrorMessage())},V=p=>{if(p.preventDefault(),i(null),!N||!y){i(s("pc.emailPwRequired"));return}l(q.doSigninWithEmailAndPassword(N,y,C))},$=p=>{if(p.preventDefault(),i(null),!N||!y||!F){i(s("pc.fillRequired"));return}if(y.length<8){i(s("pc.pwMin"));return}if(y!==M){i(s("pc.pwMismatch"));return}l(q.doRegisterEmailAndPassword(N,y,F))},z=()=>l(q.doDemoLogin()),K=o||u;return e.jsxs("div",{className:"pc-modal-overlay",onClick:b,children:[e.jsxs("div",{className:"pc-auth-modal",onClick:p=>p.stopPropagation(),children:[e.jsx("button",{className:"pc-modal-x",onClick:b,children:"✕"}),e.jsxs("div",{className:"pc-auth-tabs",children:[e.jsx("button",{className:j==="login"?"active":"",onClick:()=>x("login"),children:s("pc.login")}),e.jsx("button",{className:j==="register"?"active":"",onClick:()=>x("register"),children:s("pc.register")})]}),K&&e.jsx("div",{className:"pc-auth-error",children:K}),j==="login"?e.jsxs("form",{className:"pc-auth-form",onSubmit:V,children:[e.jsx("label",{children:s("pc.email")}),e.jsx("input",{type:"email",value:N,onChange:p=>h(p.target.value),placeholder:"you@example.com",autoComplete:"email",autoFocus:!0}),e.jsx("label",{children:s("pc.password")}),e.jsx("input",{type:"password",value:y,onChange:p=>k(p.target.value),placeholder:"••••••••",autoComplete:"current-password"}),e.jsx("div",{className:"pc-auth-remember",children:e.jsxs("label",{children:[e.jsx("input",{type:"checkbox",checked:C,onChange:p=>O(p.target.checked)})," ",s("pc.rememberMe")]})}),e.jsx("button",{type:"submit",className:"pc-auth-submit",disabled:f,children:f?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-spinner fa-spin"})," ",s("pc.signingIn")]}):s("pc.login")}),e.jsx("button",{type:"button",className:"pc-auth-demo",onClick:z,disabled:f,children:f?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-spinner fa-spin"})," ",s("pc.loading")]}):s("pc.demoLogin")})]}):e.jsxs("form",{className:"pc-auth-form",onSubmit:$,children:[e.jsx("label",{children:s("pc.email")}),e.jsx("input",{type:"email",value:N,onChange:p=>h(p.target.value),placeholder:"you@example.com",autoComplete:"email",autoFocus:!0}),e.jsx("label",{children:s("pc.phone")}),e.jsx("input",{type:"tel",value:F,onChange:p=>D(p.target.value),placeholder:s("pc.phone"),autoComplete:"tel"}),e.jsx("label",{children:s("pc.password")}),e.jsx("input",{type:"password",value:y,onChange:p=>k(p.target.value),placeholder:s("pc.passwordHint"),autoComplete:"new-password"}),e.jsx("label",{children:s("pc.confirmPassword")}),e.jsx("input",{type:"password",value:M,onChange:p=>S(p.target.value),placeholder:s("pc.reenterPassword"),autoComplete:"new-password"}),e.jsx("button",{type:"submit",className:"pc-auth-submit",disabled:f,children:f?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-spinner fa-spin"})," ",s("pc.creatingAccount")]}):s("pc.createAccount")})]}),e.jsx("div",{className:"pc-auth-switch",children:j==="login"?e.jsxs("span",{children:[s("pc.noAccount")," ",e.jsx("a",{onClick:()=>x("register"),children:s("pc.register")})]}):e.jsxs("span",{children:[s("pc.haveAccount")," ",e.jsx("a",{onClick:()=>x("login"),children:s("pc.login")})]})})]}),e.jsx("style",{children:`
        .pc-modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.55);
          backdrop-filter: blur(4px); z-index: 10000;
          display: flex; align-items: center; justify-content: center;
        }
        .pc-auth-modal {
          background: #fff; border-radius: 16px; width: 400px; max-width: 92vw;
          padding: 28px; position: relative; box-shadow: 0 24px 64px rgba(0,0,0,0.25);
          max-height: 92vh; overflow-y: auto;
        }
        .pc-modal-x { position: absolute; top: 14px; right: 16px; border: none; background: none; font-size: 18px; color: #9ca3af; cursor: pointer; }
        .pc-auth-tabs { display: flex; gap: 8px; margin-bottom: 18px; }
        .pc-auth-tabs button { flex: 1; padding: 10px; border: none; border-radius: 8px; cursor: pointer; background: #f0f2f5; color: #6b7280; font-weight: 600; font-size: 14px; }
        .pc-auth-tabs button.active { background: #0064FA; color: #fff; }
        .pc-auth-form { display: flex; flex-direction: column; gap: 5px; }
        .pc-auth-form label { font-size: 12px; color: #6b7280; font-weight: 600; margin-top: 8px; }
        .pc-auth-form input[type=email], .pc-auth-form input[type=password], .pc-auth-form input[type=tel], .pc-auth-form input[type=text] {
          padding: 11px 13px; border: 1.5px solid #e5e7eb; border-radius: 8px; font-size: 14px; outline: none; transition: border-color .15s; width: 100%;
        }
        .pc-auth-form input:focus { border-color: #0064FA; }
        .pc-auth-remember { margin-top: 10px; font-size: 13px; color: #6b7280; }
        .pc-auth-remember label { display: flex; align-items: center; gap: 6px; cursor: pointer; }
        .pc-auth-error { color: #dc2626; font-size: 13px; margin-bottom: 12px; padding: 9px 12px; background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; }
        .pc-auth-submit { margin-top: 16px; padding: 13px; border: none; border-radius: 10px; background: #0064FA; color: #fff; font-weight: 700; font-size: 15px; cursor: pointer; }
        .pc-auth-submit:disabled { opacity: .6; cursor: default; }
        .pc-auth-demo { margin-top: 10px; padding: 12px; border: 1.5px solid #0064FA; border-radius: 10px; background: #fff; color: #0064FA; font-weight: 700; font-size: 14px; cursor: pointer; }
        .pc-auth-demo:hover:not(:disabled) { background: #e8f0ff; }
        .pc-auth-demo:disabled { opacity: .6; cursor: default; }
        .pc-auth-switch { text-align: center; margin-top: 16px; font-size: 13px; color: #6b7280; }
        .pc-auth-switch a { color: #0064FA; cursor: pointer; font-weight: 600; }
      `})]})}const tt=[{icon:"fas fa-id-card",name:s("pc.kyc"),path:"/proof",lockWhenVerified:!0},{icon:"fas fa-link",name:s("pc.bindAccount"),path:"/bind-account"},{icon:"fas fa-list",name:s("pc.orders"),path:"/ordersPage"},{icon:"fas fa-money-bill",name:s("pc.deposit"),path:"/deposit",requiresKyc:!0},{icon:"fas fa-arrow-up",name:s("pc.withdraw"),path:"/Withdraw",requiresKyc:!0},{icon:"fas fa-shield-alt",name:s("pc.password"),path:"/typepassword",requiresKyc:!0},{icon:"fas fa-file-alt",name:s("pc.history"),path:"/history",requiresKyc:!0},{icon:"fas fa-bell",name:s("pc.notifications"),path:"/notification"},{icon:"fas fa-headset",name:s("pc.onlineService"),path:"/online-service"},{icon:"fas fa-building",name:s("pc.aboutUs"),path:"/about"},{icon:"fas fa-question-circle",name:s("pc.help"),path:"/support"}],ve=new Set,st=[...Y.privateRoutes,...Y.screenRoutes,...Y.routeswithoutmobilemenue,...Y.navRoutes].filter(n=>!(n!=null&&n.path)||ve.has(n.path)?!1:(ve.add(n.path),!0)).map(n=>({path:n.path,Component:We({loader:n.loader})}));function ot({onClose:n}){var S;const b=ie(),l=T(H.selectCurrentUser),f=T(Re.selectKycStatus);a.useEffect(()=>{b(Te.doFetch())},[b]),a.useEffect(()=>{const o=_e(),i={push:o.push,replace:o.replace,go:o.go,goBack:o.goBack,goForward:o.goForward},x=()=>{};return o.push=x,o.replace=x,o.go=x,o.goBack=x,o.goForward=x,()=>{o.push=i.push,o.replace=i.replace,o.go=i.go,o.goBack=i.goBack,o.goForward=i.goForward}},[]);const u=f==="success",j=(l==null?void 0:l.accountType)==="demo",w=a.useMemo(()=>tt.map(o=>({...o,disabled:o.requiresKyc?!u||j:o.lockWhenVerified?u:!1})),[u,j]),N=((S=w.find(o=>!o.disabled))==null?void 0:S.path)||"/proof",[h,y]=a.useState({path:N,n:0}),k=a.useMemo(()=>$e({initialEntries:[h.path]}),[h]),[C,O]=a.useState(!1);a.useEffect(()=>{const o=()=>O(k.index>0);return o(),k.listen(o)},[k]);const F=o=>{o.disabled||y(i=>({path:o.path,n:i.n+1}))};a.useEffect(()=>{const o=w.find(i=>i.path===h.path);if(o!=null&&o.disabled){const i=w.find(x=>!x.disabled);i&&y(x=>({path:i.path,n:x.n+1}))}},[w,h.path]);const D=f==="success"?s("pc.verified"):f==="pending"?s("pc.pendingReview"):s("pc.notVerified"),M=f==="success"?"#10b981":f==="pending"?"#f59e0b":"#ef4444";return e.jsxs("div",{className:"pc-modal-overlay",onClick:n,children:[e.jsxs("div",{className:"pc-profile-modal",onClick:o=>o.stopPropagation(),children:[e.jsx("button",{className:"pc-modal-x",onClick:n,children:"✕"}),e.jsxs("aside",{className:"pc-profile-side",children:[e.jsxs("div",{className:"pc-profile-user",children:[e.jsx("div",{className:"pc-profile-avatar",children:((l==null?void 0:l.firstName)||(l==null?void 0:l.email)||"U").charAt(0).toUpperCase()}),e.jsx("div",{className:"pc-profile-email",children:(l==null?void 0:l.email)||"—"}),e.jsxs("div",{className:"pc-kyc-badge",style:{color:M,borderColor:M},children:[e.jsx("i",{className:f==="success"?"fas fa-check-circle":f==="pending"?"fas fa-clock":"fas fa-exclamation-circle"}),D]})]}),!u&&e.jsx("div",{className:"pc-kyc-hint",children:j?s("pc.demoNoFeatures"):s("pc.completeKyc")}),e.jsxs("nav",{className:"pc-profile-menu",children:[w.map(o=>e.jsxs("button",{className:`${h.path===o.path?"active":""} ${o.disabled?"disabled":""}`,onClick:()=>F(o),disabled:o.disabled,children:[e.jsx("i",{className:o.icon})," ",e.jsx("span",{children:o.name}),o.disabled&&e.jsx("i",{className:"fas fa-lock pc-lock"})]},o.name)),e.jsxs("button",{className:"pc-profile-logout",onClick:()=>{b(q.doSignout()),n()},children:[e.jsx("i",{className:"fas fa-sign-out-alt"})," ",e.jsx("span",{children:s("pc.logout")})]})]})]}),e.jsxs("section",{className:`pc-profile-content ${C?"pc-nav-sub":"pc-nav-root"}`,children:[C&&e.jsx("div",{className:"pc-nav-bar",children:e.jsxs("button",{className:"pc-nav-back",onClick:()=>k.goBack(),children:[e.jsx("span",{className:"pc-nav-back-ico",children:"←"})," ",s("pc.back")]})}),e.jsx(Be,{history:k,children:e.jsx(qe.Suspense,{fallback:e.jsx(Oe,{}),children:e.jsx(De,{children:st.map(o=>e.jsx(Ue,{exact:!0,path:o.path,component:o.Component},o.path))})})},`mem-${h.n}`)]})]}),e.jsx("style",{children:`
        .pc-profile-modal {
          background: #fff; border-radius: 16px; width: 1000px; max-width: 96vw;
          height: 660px; max-height: 92vh; position: relative; display: flex;
          overflow: hidden; box-shadow: 0 24px 64px rgba(0,0,0,0.28);
        }
        .pc-modal-x { position: absolute; top: 12px; right: 16px; border: none; background: none; font-size: 18px; color: #9ca3af; cursor: pointer; z-index: 5; }
        .pc-profile-side {
          width: 250px; flex-shrink: 0; background: #f7f8fa; border-right: 1px solid #e5e7eb;
          padding: 22px 14px; display: flex; flex-direction: column;
        }
        .pc-profile-user { text-align: center; margin-bottom: 14px; }
        .pc-profile-avatar {
          width: 56px; height: 56px; border-radius: 50%; background: #0064FA; color: #fff;
          font-size: 24px; font-weight: 700; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px;
        }
        .pc-profile-email { font-size: 12px; color: #6b7280; word-break: break-all; margin-bottom: 8px; }
        .pc-kyc-badge {
          display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700;
          border: 1.5px solid; border-radius: 20px; padding: 3px 12px;
        }
        .pc-kyc-hint {
          background: #fff7ed; border: 1px solid #fed7aa; color: #c2410c; font-size: 11px;
          border-radius: 8px; padding: 8px 10px; margin-bottom: 12px; line-height: 1.4; text-align: center;
        }
        .pc-profile-menu { display: flex; flex-direction: column; gap: 4px; flex: 1; overflow-y: auto; }
        .pc-profile-menu button {
          display: flex; align-items: center; gap: 10px; padding: 10px 12px; border: none;
          background: none; border-radius: 8px; cursor: pointer; font-size: 14px; color: #374151;
          text-align: left; transition: background .15s; width: 100%;
        }
        .pc-profile-menu button i:first-child { width: 18px; color: #6b7280; }
        .pc-profile-menu button:hover:not(.disabled):not(.pc-profile-logout) { background: #eef1f5; }
        .pc-profile-menu button.active { background: #e8f0ff; color: #0064FA; font-weight: 600; }
        .pc-profile-menu button.active i:first-child { color: #0064FA; }
        .pc-profile-menu button.disabled { opacity: 0.45; cursor: not-allowed; }
        .pc-lock { margin-left: auto; font-size: 11px; color: #9ca3af; }
        .pc-profile-logout { margin-top: auto; color: #ef4444 !important; }
        .pc-profile-logout i { color: #ef4444 !important; }

        .pc-profile-content { flex: 1; overflow-y: auto; background: #fff; position: relative; }
        .pc-profile-content .container,
        .pc-profile-content .market-detail-container,
        .pc-profile-content .op-page,
        .pc-profile-content .profile-page,
        .pc-profile-content .withdraw-container { max-width: 100% !important; min-height: auto !important; }

        /* In-modal back bar (only on sub-pages) */
        .pc-nav-bar { position: sticky; top: 0; z-index: 6; background: #fff; border-bottom: 1px solid #eef1f5; padding: 8px 14px; }
        .pc-nav-back { display: inline-flex; align-items: center; gap: 8px; border: none; background: #f0f2f5; color: #0064FA; font-weight: 700; font-size: 13px; padding: 7px 14px; border-radius: 8px; cursor: pointer; }
        .pc-nav-back:hover { background: #e8f0ff; }
        .pc-nav-back-ico { font-size: 16px; line-height: 1; }

        /* Always hide the embedded pages' own back-arrows. Top-level pages are
           switched via the left menu; sub-pages use the single in-modal back bar
           above. This avoids duplicate/confusing back controls. */
        .pc-profile-content .back-arrow,
        .pc-profile-content .header-left,
        .pc-profile-content .back-button,
        .pc-profile-content .nav-back,
        .pc-profile-content .fa-arrow-left { display: none !important; }
      `})]})}const at=`
  .pc-root {
    --primary: #0064FA; --green: #10b981; --red: #ef4444;
    --bg: #ffffff; --bg-light: #f7f8fa; --border: #e5e7eb; --text: #1a1d23; --muted: #6b7280;
    font-family: 'Inter','Segoe UI',system-ui,-apple-system,sans-serif;
    height: 100vh; display: flex; flex-direction: column; background: var(--bg-light); color: var(--text);
  }
  .pc-root * { box-sizing: border-box; }

  /* Header */
  .pc-header {
    height: 60px; flex-shrink: 0; background: #fff; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between; padding: 0 20px;
  }
  .pc-logo { font-size: 18px; font-weight: 800; color: var(--primary); display: flex; align-items: center; gap: 6px; }
  .pc-logo span { color: var(--text); }
  .pc-header-left img { height: 36px; width: auto; }
  .pc-header-center { flex: 1; display: flex; justify-content: center; }
  .pc-asset-chip { display: flex; align-items: center; gap: 8px; background: var(--bg-light); padding: 6px 14px; border-radius: 10px; font-size: 14px; }
  .pc-asset-price { font-weight: 700; color: var(--primary); }
  .pc-header-right { display: flex; align-items: center; gap: 10px; }
  .pc-lang { padding: 7px 10px; border: 1px solid var(--border); border-radius: 8px; font-size: 13px; background: #fff; cursor: pointer; outline: none; }
  .pc-btn-ghost { padding: 8px 16px; border: 1px solid var(--border); border-radius: 8px; background: #fff; color: var(--text); font-weight: 600; font-size: 14px; cursor: pointer; }
  .pc-btn-ghost:hover { border-color: var(--primary); color: var(--primary); }
  .pc-btn-primary { padding: 8px 18px; border: none; border-radius: 8px; background: var(--primary); color: #fff; font-weight: 700; font-size: 14px; cursor: pointer; }
  .pc-btn-primary:disabled { opacity: .6; cursor: default; }

  /* Main layout */
  .pc-main { flex: 1; display: flex; overflow: hidden; }

  /* Left */
  .pc-left { width: 290px; flex-shrink: 0; background: #fff; border-right: 1px solid var(--border); display: flex; flex-direction: column; }
  .pc-search { display: flex; align-items: center; gap: 8px; padding: 12px 14px; border-bottom: 1px solid var(--border); }
  .pc-search i { color: var(--muted); font-size: 13px; }
  .pc-search input { flex: 1; border: none; outline: none; font-size: 14px; }
  .pc-filter { padding: 10px 14px; border-bottom: 1px solid var(--border); }
  .pc-filter select { width: 100%; padding: 8px 10px; border: 1px solid var(--border); border-radius: 8px; font-size: 13px; outline: none; cursor: pointer; }
  .pc-market-list { flex: 1; overflow-y: auto; }
  .pc-market-item { display: flex; align-items: center; gap: 10px; padding: 10px 14px; cursor: pointer; border-bottom: 1px solid #f4f5f7; transition: background .12s; }
  .pc-market-item:hover { background: var(--bg-light); }
  .pc-market-item.active { background: #e8f0ff; }
  .pc-market-info { flex: 1; min-width: 0; }
  .pc-market-symbol { font-weight: 700; font-size: 13px; }
  .pc-market-name { font-size: 11px; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .pc-market-px { text-align: right; }
  .pc-market-price { font-weight: 600; font-size: 13px; font-family: monospace; }
  .pc-market-chg { font-size: 11px; }
  .pc-market-chg.pos { color: var(--green); }
  .pc-market-chg.neg { color: var(--red); }

  /* Center */
  .pc-center { flex: 1; display: flex; flex-direction: column; overflow: hidden; padding: 16px; gap: 14px; min-width: 0; }
  .pc-chart-head { display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; }
  .pc-chart-asset { display: flex; align-items: center; gap: 12px; }
  .pc-chart-name { font-size: 18px; font-weight: 800; }
  .pc-chart-sub { font-size: 12px; color: var(--muted); }
  .pc-chart-price { font-size: 26px; font-weight: 800; font-family: monospace; }
  .pc-chart-wrap { flex: 1; min-height: 0; border: 1px solid #1c212b; border-radius: 12px; overflow: hidden; background: #0b0e14; display: flex; flex-direction: column; }
  .pc-chart-wrap > div { flex: 1; }

  /* Trade panel */
  .pc-trade-panel { background: #fff; border: 1px solid var(--border); border-radius: 12px; padding: 16px; display: flex; flex-direction: column; }
  .pc-trade-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; font-size: 14px; }
  .pc-trade-row label { color: var(--muted); font-weight: 600; display: flex; align-items: center; gap: 6px; }
  .pc-trade-row select, .pc-trade-row > input { padding: 8px 12px; border: 1.5px solid var(--border); border-radius: 8px; font-size: 14px; outline: none; width: 160px; text-align: right; }
  .pc-trade-row select:focus, .pc-trade-row > input:focus { border-color: var(--primary); }
  .pc-stepper { display: flex; align-items: center; gap: 6px; }
  .pc-stepper button { width: 30px; height: 30px; border: 1px solid var(--border); background: var(--bg-light); border-radius: 7px; cursor: pointer; font-size: 16px; }
  .pc-stepper input { width: 84px; text-align: center; border: 1.5px solid var(--border); border-radius: 7px; padding: 6px; font-weight: 600; outline: none; }
  .pc-trade-info { display: flex; justify-content: space-between; align-items: center; padding-top: 6px; border-top: 1px solid var(--border); font-size: 14px; color: var(--muted); }
  .pc-insufficient { background: #fef2f2; border: 1px solid #fecaca; color: #dc2626; border-radius: 8px; padding: 9px 12px; font-size: 13px; font-weight: 500; text-align: center; }
  .pc-trade-actions, .pc-binary-actions { display: flex; gap: 12px; }
  .pc-buy, .pc-sell { flex: 1; padding: 13px; border: none; border-radius: 10px; font-weight: 700; font-size: 15px; cursor: pointer; color: #fff; }
  .pc-buy { background: var(--green); }
  .pc-sell { background: var(--red); }
  .pc-buy:disabled, .pc-sell:disabled { opacity: .5; cursor: default; }

  /* Right */
  .pc-right { width: 320px; flex-shrink: 0; background: #fff; border-left: 1px solid var(--border); padding: 12px; display: flex; flex-direction: column; gap: 10px; overflow-y: auto; }

  /* Available funds card (centered, blue) */
  .pc-funds { background: var(--primary); color: #fff; border-radius: 12px; padding: 12px; text-align: center; }
  .pc-funds-label { font-size: 12px; font-weight: 600; opacity: .95; }
  .pc-funds-amount { font-size: 20px; font-weight: 700; margin-top: 4px; letter-spacing: .5px; }

  /* Trade/order panel */
  .pc-trade-panel { border: 1px solid var(--border); border-radius: 12px; padding: 12px; display: flex; flex-direction: column; }
  .pc-tp-symbol { font-size: 14px; font-weight: 700; color: var(--text); }
  .pc-tp-price { font-size: 19px; font-weight: 700; color: var(--primary); margin: 1px 0 8px; }
  .pc-tp-select {
    width: 100%; padding: 7px 12px; border: 1px solid var(--border); border-radius: 8px;
    font-size: 13px; color: var(--text); background: #fff; outline: none; cursor: pointer; margin-bottom: 8px;
    appearance: none; -webkit-appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23888' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 12px center;
  }
  .pc-tp-select:focus { border-color: var(--primary); }
  .pc-tp-label { font-size: 12px; font-weight: 600; color: var(--text); margin-bottom: 5px; }

  /* Toggle row (Set Loss / Take Profit) */
  .pc-tp-toggle-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 5px; }
  .pc-tp-toggle-row span { font-size: 12px; font-weight: 600; color: var(--text); }
  .pc-switch { position: relative; display: inline-block; width: 38px; height: 20px; }
  .pc-switch input { opacity: 0; width: 0; height: 0; }
  .pc-slider { position: absolute; inset: 0; background: #d1d5db; border-radius: 20px; transition: .2s; cursor: pointer; }
  .pc-slider::before { content: ''; position: absolute; height: 15px; width: 15px; left: 3px; bottom: 2.5px; background: #fff; border-radius: 50%; transition: .2s; box-shadow: 0 1px 3px rgba(0,0,0,0.2); }
  .pc-switch input:checked + .pc-slider { background: var(--primary); }
  .pc-switch input:checked + .pc-slider::before { transform: translateX(18px); }

  /* Stepper (full-width) */
  .pc-stepper.full { display: flex; align-items: stretch; gap: 0; margin-bottom: 9px; border: 1px solid var(--border); border-radius: 8px; overflow: hidden; }
  .pc-stepper.full button {
    width: 38px; border: none; background: var(--bg-light); color: #374151; font-size: 17px; cursor: pointer; flex-shrink: 0;
  }
  .pc-stepper.full button:disabled { opacity: .5; cursor: default; }
  .pc-stepper.full input {
    flex: 1; min-width: 0; border: none; border-left: 1px solid var(--border); border-right: 1px solid var(--border);
    text-align: center; font-size: 13px; font-weight: 600; color: var(--text); outline: none; padding: 7px 6px;
  }
  .pc-stepper.full input:disabled { background: var(--bg-light); color: #9ca3af; }
  .pc-stepper.full input::-webkit-outer-spin-button, .pc-stepper.full input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }

  /* Info rows */
  .pc-tp-info { display: flex; flex-direction: column; gap: 5px; margin: 2px 0 10px; }
  .pc-tp-info-row { display: flex; align-items: center; justify-content: space-between; font-size: 11.5px; color: var(--muted); }
  .pc-tp-info-row b { color: var(--text); font-weight: 600; }

  /* Buy / Sell pills */
  .pc-tp-actions { display: flex; gap: 10px; }
  .pc-buy2, .pc-sell2 { flex: 1; padding: 10px; border: none; border-radius: 22px; font-size: 14px; font-weight: 700; color: #fff; cursor: pointer; transition: opacity .15s; }
  .pc-buy2 { background: var(--primary); }
  .pc-sell2 { background: var(--red); }
  .pc-buy2:hover:not(:disabled), .pc-sell2:hover:not(:disabled) { opacity: .9; }
  .pc-buy2:disabled, .pc-sell2:disabled { opacity: .5; cursor: default; }
  .pc-insufficient { margin-bottom: 9px; padding: 7px 10px; font-size: 11.5px; }

  /* Confirm modal rows */
  .pc-summary-row { display: flex; justify-content: space-between; font-size: 13px; padding: 6px 0; color: var(--muted); }
  .pc-summary-row strong { color: var(--text); }
  .pc-summary-row strong.pos { color: var(--green); }
  .pc-summary-row strong.neg { color: var(--red); }

  /* Modals shared */
  .pc-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.55); backdrop-filter: blur(4px); z-index: 10000; display: flex; align-items: center; justify-content: center; }
  .pc-confirm { background: #fff; border-radius: 14px; width: 360px; max-width: 92vw; padding: 22px; }
  .pc-confirm-title { font-size: 17px; font-weight: 800; margin-bottom: 16px; text-align: center; }
  .pc-confirm-actions { display: flex; gap: 10px; margin-top: 18px; }
  .pc-confirm-actions button { flex: 1; }

  /* Toast */
  .pc-toast { position: fixed; top: 76px; right: 20px; background: #fff; border-left: 4px solid var(--green); box-shadow: 0 8px 32px rgba(0,0,0,0.15); border-radius: 10px; padding: 14px 18px; font-weight: 600; font-size: 14px; z-index: 11000; }
`;function rt(n){return n==null?"—":`${n>=0?"+":""}${n.toFixed(2)}%`}function Z(n){return n==null?"—":n>=1e4?n.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}):n>=100?n.toFixed(2):n>=10?n.toFixed(3):n.toFixed(5)}function dt(){const n=ie(),b=T(H.selectCurrentUser),l=T(H.selectCurrentTenant),f=T(He.selectRows),[u,j]=a.useState("XAUUSD"),[w,N]=a.useState(""),[h,y]=a.useState("All"),[k,C]=a.useState(null),[O,F]=a.useState(!1),[D,M]=a.useState(Ve()),[S,o]=a.useState(100),[i,x]=a.useState(.01),[V,$]=a.useState("0.01"),[z,K]=a.useState(!1),[p,X]=a.useState(0),[A,we]=a.useState(!1),[ce,I]=a.useState(0),[L,J]=a.useState(null),[G,le]=a.useState(!1),[pe,de]=a.useState(null),[ee,ke]=a.useState({}),U=a.useRef(null),te=a.useRef(null),se=t=>`~m~${t.length}~m~${t}`,je=t=>{const r=[];let d=t;for(;d.length>0&&d.startsWith("~m~");){const g=d.indexOf("~m~",3),v=parseInt(d.substring(3,g));r.push(d.substring(g+3,g+3+v)),d=d.substring(g+3+v)}return r},Ne=t=>{try{return JSON.parse(t.replace(/^=\{/,"{")).symbol||t}catch{return t}},oe=a.useCallback(()=>{U.current&&(U.current.close(),U.current=null);const t=new WebSocket(Je());U.current=t,t.onopen=()=>{const r="qs_"+Math.random().toString(36).substring(2,12);t.send(se(JSON.stringify({m:"quote_create_session",p:[r]}))),t.send(se(JSON.stringify({m:"quote_set_fields",p:[r,"lp","ask","bid","chp"]}))),t.send(se(JSON.stringify({m:"quote_add_symbols",p:[r,...be.map(d=>d.symbol)]})))},t.onmessage=r=>{const d=r.data;if(d.startsWith("~h~")){t.send(d);return}je(d).forEach(g=>{try{const v=JSON.parse(g);if(v.m!=="qsd")return;const W=v.p[1],E=Ne(W.n),R=W.v;if(!R)return;ke(ne=>{const P=ne[E]||{symbol:E,ask:0,bid:0},_={symbol:E,ask:R.ask??P.ask,bid:R.bid??P.bid,lp:typeof R.lp=="number"?R.lp:P.lp,chp:typeof R.chp=="number"?R.chp:P.chp};return P.ask===_.ask&&P.bid===_.bid&&P.lp===_.lp&&P.chp===_.chp?ne:{...ne,[E]:_}})}catch{}})},t.onclose=r=>{r.wasClean||(te.current=setTimeout(oe,3e3))},t.onerror=()=>{}},[]);a.useEffect(()=>(oe(),()=>{var t;te.current&&clearTimeout(te.current),(t=U.current)==null||t.close()}),[oe]);const ue=Ge(),c=ue[u],m=a.useMemo(()=>{const t=ee[u];return t?t.lp&&t.lp>0?t.lp:t.ask&&t.bid?(t.ask+t.bid)/2:null:null},[ee,u]),[Ce,Se]=a.useState(()=>typeof window<"u"?Math.max(360,window.innerHeight-60-88):480);a.useEffect(()=>{const t=()=>Se(Math.max(360,window.innerHeight-60-88));return window.addEventListener("resize",t),()=>window.removeEventListener("resize",t)},[]);const fe=a.useRef(null);a.useEffect(()=>{fe.current=m},[m]);const ze=a.useMemo(()=>c?{symbol:c.symbol,entryPrice:c.entryPrice,targetPrice:c.targetPrice,startedAt:c.startedAt,durationMs:c.durationMs,seed:c.seed}:null,[c==null?void 0:c.symbol,c==null?void 0:c.startedAt,c==null?void 0:c.targetPrice,c==null?void 0:c.durationMs,c==null?void 0:c.entryPrice,c==null?void 0:c.seed]),[xe,me]=a.useState(0);a.useEffect(()=>{b&&n(ge.doFetch())},[n,b]),a.useEffect(()=>{const t=f==null?void 0:f.find(r=>r.symbol==="USDT");me((t==null?void 0:t.amount)||0)},[f]);const ae=Qe(u)||{symbol:u,name:u},Fe=c?fe.current??c.targetPrice:m,B=a.useMemo(()=>{const t=m??0,r=S/100;return t*100*i/r},[m,i,S]),re=B>=100?B.toFixed(3):B.toFixed(5),Q=b?xe<B&&B>0:!1,Pe=a.useMemo(()=>((m??0)*i*100*1e-5).toFixed(6),[m,i]),Me=`1 Lots = 100 ${u}`,Ae=a.useMemo(()=>be.filter(t=>w&&!`${t.symbol} ${t.name}`.toLowerCase().includes(w.toLowerCase())?!1:h==="All"?!0:h==="Forex"?!!t.baseFlag&&!t.badgeColor&&!/OIL|100|200|225|30|35|40|500|SPX|NAS|US30/.test(t.symbol):h==="Crypto"?!!t.badgeColor&&/BTC|ETH|LTC/.test(t.symbol):h==="Metals"?/XAU|XAG/.test(t.symbol):h==="Indices"?/100|200|225|30|35|40|500|SPX|NAS|US30/.test(t.symbol):!0),[w,h]),he=t=>{if(!b){C("login");return}J(t)},Le=async()=>{var t,r,d,g;if(!(!L||!(l!=null&&l.id)||m==null)){le(!0);try{await Ie.post(`/tenant/${l.id}/trade-orders`,{orderType:"market",symbol:u,symbolName:ae.name,direction:L,lots:i,multiplier:S,entryPrice:m,takeProfit:A?ce:null,stopLoss:z?p:null}),me(v=>Math.max(0,v-B)),n(ge.doFetch()),J(null),de(`${L==="buy"?s("pc.buy"):s("pc.sell")} — ${s("pc.orderPlaced")} ${u}`),setTimeout(()=>de(null),3500)}catch(v){alert(((g=(d=(r=(t=v==null?void 0:v.response)==null?void 0:t.data)==null?void 0:r.errors)==null?void 0:d[0])==null?void 0:g.message)||"Failed to place order")}finally{le(!1)}}},Ee=t=>{M(t),Ze.doChangeLanguage(t)};return e.jsxs("div",{className:"pc-root",children:[e.jsx("style",{children:at}),e.jsxs("header",{className:"pc-header",children:[e.jsx("div",{className:"pc-header-left",children:e.jsx("img",{src:"/logo.svg",alt:""})}),e.jsx("div",{className:"pc-header-center"}),e.jsxs("div",{className:"pc-header-right",children:[e.jsx("select",{className:"pc-lang",value:D,onChange:t=>Ee(t.target.value),children:Ke().map(t=>e.jsx("option",{value:t.id,children:t.label},t.id))}),b?e.jsx(e.Fragment,{children:e.jsxs("button",{className:"pc-btn-ghost",onClick:()=>F(!0),children:[e.jsx("i",{className:"fas fa-user"})," ",s("pc.profile")]})}):e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"pc-btn-ghost",onClick:()=>C("login"),children:s("pc.login")}),e.jsx("button",{className:"pc-btn-primary",onClick:()=>C("register"),children:s("pc.register")})]})]})]}),e.jsxs("div",{className:"pc-main",children:[e.jsxs("aside",{className:"pc-left",children:[e.jsxs("div",{className:"pc-search",children:[e.jsx("i",{className:"fas fa-search"}),e.jsx("input",{placeholder:s("pc.searchMarkets"),value:w,onChange:t=>N(t.target.value)})]}),e.jsx("div",{className:"pc-filter",children:e.jsx("select",{value:h,onChange:t=>y(t.target.value),children:[["All","pc.all"],["Forex","pc.forex"],["Crypto","pc.crypto"],["Metals","pc.metals"],["Indices","pc.indices"]].map(([t,r])=>e.jsx("option",{value:t,children:s(r)},t))})}),e.jsx("div",{className:"pc-market-list",children:Ae.map(t=>{const r=ee[t.symbol],d=r?r.lp&&r.lp>0?r.lp:r.ask&&r.bid?(r.ask+r.bid)/2:null:null,g=ue[t.symbol],v=g?g.targetPrice:d,W=g?(g.targetPrice-g.entryPrice)/g.entryPrice*100:(r==null?void 0:r.chp)??null,E=(W??0)>=0;return e.jsxs("div",{className:`pc-market-item ${u===t.symbol?"active":""}`,onClick:()=>j(t.symbol),children:[e.jsx(ye,{pair:t,size:"sm"}),e.jsxs("div",{className:"pc-market-info",children:[e.jsx("div",{className:"pc-market-symbol",children:t.symbol}),e.jsx("div",{className:"pc-market-name",children:t.name})]}),e.jsxs("div",{className:"pc-market-px",children:[e.jsx("div",{className:"pc-market-price",children:Z(v)}),e.jsxs("div",{className:`pc-market-chg ${E?"pos":"neg"}`,children:[E?"▲":"▼"," ",rt(W)]})]})]},t.symbol)})})]}),e.jsxs("section",{className:"pc-center",children:[e.jsxs("div",{className:"pc-chart-head",children:[e.jsxs("div",{className:"pc-chart-asset",children:[e.jsx(ye,{pair:ae,size:"md"}),e.jsxs("div",{children:[e.jsx("div",{className:"pc-chart-name",children:u}),e.jsx("div",{className:"pc-chart-sub",children:ae.name})]})]}),e.jsx("div",{className:"pc-chart-price",style:{color:c?c.targetPrice>=c.entryPrice?"#10b981":"#ef4444":"#1a1d23"},children:Z(Fe)})]}),e.jsx("div",{className:"pc-chart-wrap",children:e.jsx(Ye,{symbol:u,livePrice:m,height:Ce,priceInjection:ze},u)})]}),e.jsxs("aside",{className:"pc-right",children:[e.jsxs("div",{className:"pc-funds",children:[e.jsx("div",{className:"pc-funds-label",children:s("pc.availableFunds")}),e.jsx("div",{className:"pc-funds-amount",children:b?`$${xe.toFixed(2)}`:"----"})]}),e.jsxs("div",{className:"pc-trade-panel",children:[e.jsx("div",{className:"pc-tp-symbol",children:u}),e.jsx("div",{className:"pc-tp-price",children:Z(m)}),e.jsx("select",{className:"pc-tp-select",children:e.jsx("option",{children:s("pc.marketPrice")})}),e.jsx("div",{className:"pc-tp-label",children:s("pc.multiplier")}),e.jsx("select",{className:"pc-tp-select",value:S,onChange:t=>o(+t.target.value),children:[100,200,300,400,500].map(t=>e.jsx("option",{value:t,children:t},t))}),e.jsxs("div",{className:"pc-tp-toggle-row",children:[e.jsx("span",{children:s("pc.setLoss")}),e.jsxs("label",{className:"pc-switch",children:[e.jsx("input",{type:"checkbox",checked:z,onChange:t=>{K(t.target.checked),X(t.target.checked&&m?m:0)}}),e.jsx("span",{className:"pc-slider"})]})]}),e.jsxs("div",{className:"pc-stepper full",children:[e.jsx("button",{onClick:()=>z&&X(t=>Math.max(0,+(t-.01).toFixed(5))),disabled:!z,children:"−"}),e.jsx("input",{type:"number",step:"any",min:"0",disabled:!z,value:p,onChange:t=>X(parseFloat(t.target.value)||0)}),e.jsx("button",{onClick:()=>z&&X(t=>+(t+.01).toFixed(5)),disabled:!z,children:"+"})]}),e.jsxs("div",{className:"pc-tp-toggle-row",children:[e.jsx("span",{children:s("pc.takeProfit")}),e.jsxs("label",{className:"pc-switch",children:[e.jsx("input",{type:"checkbox",checked:A,onChange:t=>{we(t.target.checked),I(t.target.checked&&m?m:0)}}),e.jsx("span",{className:"pc-slider"})]})]}),e.jsxs("div",{className:"pc-stepper full",children:[e.jsx("button",{onClick:()=>A&&I(t=>Math.max(0,+(t-.01).toFixed(5))),disabled:!A,children:"−"}),e.jsx("input",{type:"number",step:"any",min:"0",disabled:!A,value:ce,onChange:t=>I(parseFloat(t.target.value)||0)}),e.jsx("button",{onClick:()=>A&&I(t=>+(t+.01).toFixed(5)),disabled:!A,children:"+"})]}),e.jsx("div",{className:"pc-tp-label",children:s("pc.lots")}),e.jsxs("div",{className:"pc-stepper full",children:[e.jsx("button",{onClick:()=>{const t=Math.max(.01,+(i-.01).toFixed(2));x(t),$(String(t))},children:"−"}),e.jsx("input",{type:"text",inputMode:"decimal",value:V,onChange:t=>{const r=t.target.value.replace(/[^0-9.]/g,"");$(r);const d=parseFloat(r);!isNaN(d)&&d>0&&x(d)},onBlur:()=>{let t=parseFloat(V);(isNaN(t)||t<.01)&&(t=.01),t=Math.round(t*100)/100,x(t),$(String(t))}}),e.jsx("button",{onClick:()=>{const t=+(i+.01).toFixed(2);x(t),$(String(t))},children:"+"})]}),e.jsxs("div",{className:"pc-tp-info",children:[e.jsxs("div",{className:"pc-tp-info-row",children:[e.jsx("span",{children:s("pc.eachLots")}),e.jsx("b",{children:Me})]}),e.jsxs("div",{className:"pc-tp-info-row",children:[e.jsx("span",{children:s("pc.handlingFee")}),e.jsx("b",{children:Pe})]}),e.jsxs("div",{className:"pc-tp-info-row",children:[e.jsx("span",{children:s("pc.estimatedMargin")}),e.jsx("b",{style:{color:Q?"#ef4444":"#1a1d23"},children:re})]})]}),Q&&e.jsxs("div",{className:"pc-insufficient",children:["⚠ ",s("pc.insufficient")," ($",re,")"]}),e.jsxs("div",{className:"pc-tp-actions",children:[e.jsx("button",{className:"pc-buy2",disabled:m==null||Q,onClick:()=>he("buy"),children:s("pc.buy")}),e.jsx("button",{className:"pc-sell2",disabled:m==null||Q,onClick:()=>he("sell"),children:s("pc.sell")})]})]})]})]}),L&&e.jsx("div",{className:"pc-modal-overlay",onClick:()=>!G&&J(null),children:e.jsxs("div",{className:"pc-confirm",onClick:t=>t.stopPropagation(),children:[e.jsx("div",{className:"pc-confirm-title",children:L==="buy"?s("pc.confirmBuy"):s("pc.confirmSell")}),e.jsxs("div",{className:"pc-summary-row",children:[e.jsx("span",{children:s("pc.symbol")}),e.jsx("strong",{children:u})]}),e.jsxs("div",{className:"pc-summary-row",children:[e.jsx("span",{children:s("pc.direction")}),e.jsx("strong",{className:L==="buy"?"pos":"neg",children:L==="buy"?s("pc.buy"):s("pc.sell")})]}),e.jsxs("div",{className:"pc-summary-row",children:[e.jsx("span",{children:s("pc.price")}),e.jsx("strong",{children:Z(m)})]}),e.jsxs("div",{className:"pc-summary-row",children:[e.jsx("span",{children:s("pc.lotsMult")}),e.jsxs("strong",{children:[i.toFixed(2)," · ",S,"×"]})]}),e.jsxs("div",{className:"pc-summary-row",children:[e.jsx("span",{children:s("pc.estimatedMargin")}),e.jsxs("strong",{children:["$",re]})]}),e.jsxs("div",{className:"pc-confirm-actions",children:[e.jsx("button",{className:"pc-btn-ghost",onClick:()=>J(null),disabled:G,children:s("pc.cancel")}),e.jsx("button",{className:"pc-btn-primary",onClick:Le,disabled:G,children:G?s("pc.placing"):s("pc.confirm")})]})]})}),pe&&e.jsxs("div",{className:"pc-toast",children:["✓ ",pe]}),k&&e.jsx(et,{initialMode:k,onClose:()=>C(null)}),O&&e.jsx(ot,{onClose:()=>F(!1)}),e.jsx(Xe,{})]})}export{dt as default};

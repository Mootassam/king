import{u as Te,i as T,j as I,k as o,n as q,o as e,p as r,q as Re,t as $e,v as Be,R as De,w as Oe,L as qe,S as Ue,x as He,y as Z,z as We,A as _e,B as Ie,C as Ve,D as Ke,E as be,F as Xe,G as Je,H as Ge}from"./index-09aa8b3d.js";import{g as Qe,P as ve,u as Ye,a as Ze,b as ke}from"./useSymbolInjections-a0ea6f0b.js";import{C as et}from"./CustomTradingChart-4918d0a8.js";import{l as tt}from"./layoutActions-6639d049.js";import{u as le}from"./useDispatch-0fa0cc57.js";function rt({initialMode:i="login",onClose:g}){const n=le(),f=Te(),l=T(I.selectLoading),F=T(I.selectErrorMessage),[k,U]=o.useState(i),[x,P]=o.useState(""),[h,C]=o.useState(""),[R,$]=o.useState(!0),[M,B]=o.useState(""),[N,a]=o.useState(""),[p,b]=o.useState(""),[V,y]=o.useState(null);o.useEffect(()=>{n(q.doClearErrorMessage())},[n]);const j=d=>{U(d),y(null),n(q.doClearErrorMessage())},te=d=>{if(d.preventDefault(),y(null),!x||!h){y(r("pc.emailPwRequired"));return}n(q.doSigninWithEmailAndPassword(x,h,R))},K=d=>{if(d.preventDefault(),y(null),!x||!h||!M||!p){y(r("pc.fillRequired"));return}if(h.length<8){y(r("pc.pwMin"));return}if(h!==N){y(r("pc.pwMismatch"));return}if(p.trim().toUpperCase()!=="IRONFX24"){y(r("pc.invalidInvitationCode"));return}n(q.doRegisterEmailAndPassword(x,h,M,p))},D=()=>n(q.doDemoLogin()),S=()=>{g(),f.push("/auth/forgot-password")},X=V||F;return e.jsxs("div",{className:"pc-modal-overlay",onClick:g,children:[e.jsxs("div",{className:"pc-auth-modal",onClick:d=>d.stopPropagation(),children:[e.jsx("button",{className:"pc-modal-x",onClick:g,children:"✕"}),e.jsxs("div",{className:"pc-auth-tabs",children:[e.jsx("button",{className:k==="login"?"active":"",onClick:()=>j("login"),children:r("pc.login")}),e.jsx("button",{className:k==="register"?"active":"",onClick:()=>j("register"),children:r("pc.register")})]}),X&&e.jsx("div",{className:"pc-auth-error",children:X}),k==="login"?e.jsxs("form",{className:"pc-auth-form",onSubmit:te,children:[e.jsx("label",{children:r("pc.email")}),e.jsx("input",{type:"email",value:x,onChange:d=>P(d.target.value),placeholder:"you@example.com",autoComplete:"email",autoFocus:!0}),e.jsx("label",{children:r("pc.password")}),e.jsx("input",{type:"password",value:h,onChange:d=>C(d.target.value),placeholder:"••••••••",autoComplete:"current-password"}),e.jsxs("div",{className:"pc-auth-remember-row",children:[e.jsxs("label",{className:"pc-auth-remember",children:[e.jsx("input",{type:"checkbox",checked:R,onChange:d=>$(d.target.checked)})," ",r("pc.rememberMe")]}),e.jsx("a",{className:"pc-auth-forgot",onClick:S,children:r("auth.signin.forgetPassword")})]}),e.jsx("button",{type:"submit",className:"pc-auth-submit",disabled:l,children:l?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-spinner fa-spin"})," ",r("pc.signingIn")]}):r("pc.login")}),e.jsx("button",{type:"button",className:"pc-auth-demo",onClick:D,disabled:l,children:l?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-spinner fa-spin"})," ",r("pc.loading")]}):r("pc.demoLogin")})]}):e.jsxs("form",{className:"pc-auth-form",onSubmit:K,children:[e.jsx("label",{children:r("pc.email")}),e.jsx("input",{type:"email",value:x,onChange:d=>P(d.target.value),placeholder:"you@example.com",autoComplete:"email",autoFocus:!0}),e.jsx("label",{children:r("pc.phone")}),e.jsx("input",{type:"tel",value:M,onChange:d=>B(d.target.value),placeholder:r("pc.phone"),autoComplete:"tel"}),e.jsx("label",{children:r("pc.password")}),e.jsx("input",{type:"password",value:h,onChange:d=>C(d.target.value),placeholder:r("pc.passwordHint"),autoComplete:"new-password"}),e.jsx("label",{children:r("pc.confirmPassword")}),e.jsx("input",{type:"password",value:N,onChange:d=>a(d.target.value),placeholder:r("pc.reenterPassword"),autoComplete:"new-password"}),e.jsx("label",{children:r("pc.invitationCode")}),e.jsx("input",{type:"text",value:p,onChange:d=>b(d.target.value),placeholder:r("pc.invitationCode"),autoComplete:"off"}),e.jsx("button",{type:"submit",className:"pc-auth-submit",disabled:l,children:l?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-spinner fa-spin"})," ",r("pc.creatingAccount")]}):r("pc.createAccount")})]}),e.jsx("div",{className:"pc-auth-switch",children:k==="login"?e.jsxs("span",{children:[r("pc.noAccount")," ",e.jsx("a",{onClick:()=>j("register"),children:r("pc.register")})]}):e.jsxs("span",{children:[r("pc.haveAccount")," ",e.jsx("a",{onClick:()=>j("login"),children:r("pc.login")})]})})]}),e.jsx("style",{children:`
        .pc-modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.55);
          backdrop-filter: blur(4px); z-index: 10000;
          display: flex; align-items: center; justify-content: center;
        }
        .pc-auth-modal {
          background: var(--kt-bg-card); border-radius: 16px; width: 400px; max-width: 92vw;
          padding: 28px; position: relative; box-shadow: 0 24px 64px rgba(0,0,0,0.25);
          max-height: 92vh; overflow-y: auto;
        }
        .pc-modal-x { position: absolute; top: 14px; right: 16px; border: none; background: none; font-size: 18px; color: var(--kt-text-muted); cursor: pointer; }
        .pc-auth-tabs { display: flex; gap: 8px; margin-bottom: 18px; }
        .pc-auth-tabs button { flex: 1; padding: 10px; border: none; border-radius: 8px; cursor: pointer; background: var(--kt-bg-card-alt); color: var(--kt-text-muted); font-weight: 600; font-size: 14px; }
        .pc-auth-tabs button.active { background: #0064FA; color: #fff; }
        .pc-auth-form { display: flex; flex-direction: column; gap: 5px; }
        .pc-auth-form label { font-size: 12px; color: var(--kt-text-muted); font-weight: 600; margin-top: 8px; }
        .pc-auth-form input[type=email], .pc-auth-form input[type=password], .pc-auth-form input[type=tel], .pc-auth-form input[type=text] {
          padding: 11px 13px; border: 1.5px solid var(--kt-border); border-radius: 8px; font-size: 14px; outline: none; transition: border-color .15s; width: 100%;
          background: var(--kt-bg-card); color: var(--kt-text-primary);
        }
        .pc-auth-form input:focus { border-color: #0064FA; }
        .pc-auth-remember-row { margin-top: 10px; font-size: 13px; color: var(--kt-text-muted); display: flex; align-items: center; justify-content: space-between; }
        .pc-auth-remember { display: flex; align-items: center; gap: 6px; cursor: pointer; }
        .pc-auth-forgot { color: #0064FA; font-weight: 600; cursor: pointer; }
        .pc-auth-forgot:hover { text-decoration: underline; }
        .pc-auth-error { color: #dc2626; font-size: 13px; margin-bottom: 12px; padding: 9px 12px; background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; }
        .pc-auth-submit { margin-top: 16px; padding: 13px; border: none; border-radius: 10px; background: #0064FA; color: #fff; font-weight: 700; font-size: 15px; cursor: pointer; }
        .pc-auth-submit:disabled { opacity: .6; cursor: default; }
        .pc-auth-demo { margin-top: 10px; padding: 12px; border: 1.5px solid #0064FA; border-radius: 10px; background: var(--kt-bg-card); color: #0064FA; font-weight: 700; font-size: 14px; cursor: pointer; }
        .pc-auth-demo:hover:not(:disabled) { background: #e8f0ff; }
        .pc-auth-demo:disabled { opacity: .6; cursor: default; }
        .pc-auth-switch { text-align: center; margin-top: 16px; font-size: 13px; color: var(--kt-text-muted); }
        .pc-auth-switch a { color: #0064FA; cursor: pointer; font-weight: 600; }
      `})]})}const at=[{icon:"fas fa-id-card",name:r("pc.kyc"),path:"/proof",lockWhenVerified:!0},{icon:"fas fa-link",name:r("pc.bindAccount"),path:"/bind-account"},{icon:"fas fa-list",name:r("pc.orders"),path:"/ordersPage"},{icon:"fas fa-money-bill",name:r("pc.deposit"),path:"/deposit",requiresKyc:!0},{icon:"fas fa-arrow-up",name:r("pc.withdraw"),path:"/Withdraw",requiresKyc:!0},{icon:"fas fa-shield-alt",name:r("pc.password"),path:"/typepassword",requiresKyc:!0},{icon:"fas fa-file-alt",name:r("pc.history"),path:"/history",requiresKyc:!0},{icon:"fas fa-bell",name:r("pc.notifications"),path:"/notification"},{icon:"fas fa-headset",name:r("pc.onlineService"),path:"/online-service"},{icon:"fas fa-building",name:r("pc.aboutUs"),path:"/about"},{icon:"fas fa-question-circle",name:r("pc.help"),path:"/support"}],ye=new Set,ot=[...Z.privateRoutes,...Z.screenRoutes,...Z.routeswithoutmobilemenue,...Z.navRoutes].filter(i=>!(i!=null&&i.path)||ye.has(i.path)?!1:(ye.add(i.path),!0)).map(i=>({path:i.path,Component:We({loader:i.loader})}));function st({onClose:i}){var N;const g=le(),n=T(I.selectCurrentUser),f=T(Re.selectKycStatus);o.useEffect(()=>{g($e.doFetch())},[g]),o.useEffect(()=>{const a=_e(),p={push:a.push,replace:a.replace,go:a.go,goBack:a.goBack,goForward:a.goForward},b=()=>{};return a.push=b,a.replace=b,a.go=b,a.goBack=b,a.goForward=b,()=>{a.push=p.push,a.replace=p.replace,a.go=p.go,a.goBack=p.goBack,a.goForward=p.goForward}},[]);const l=f==="success",F=(n==null?void 0:n.accountType)==="demo",k=o.useMemo(()=>at.map(a=>({...a,disabled:a.requiresKyc?!l||F:a.lockWhenVerified?l:!1})),[l,F]),U=((N=k.find(a=>!a.disabled))==null?void 0:N.path)||"/proof",[x,P]=o.useState({path:U,n:0}),h=o.useMemo(()=>Be({initialEntries:[x.path]}),[x]),[C,R]=o.useState(!1);o.useEffect(()=>{const a=()=>R(h.index>0);return a(),h.listen(a)},[h]);const $=a=>{a.disabled||P(p=>({path:a.path,n:p.n+1}))};o.useEffect(()=>{const a=k.find(p=>p.path===x.path);if(a!=null&&a.disabled){const p=k.find(b=>!b.disabled);p&&P(b=>({path:p.path,n:b.n+1}))}},[k,x.path]);const M=f==="success"?r("pc.verified"):f==="pending"?r("pc.pendingReview"):r("pc.notVerified"),B=f==="success"?"#10b981":f==="pending"?"#f59e0b":"#ef4444";return e.jsxs("div",{className:"pc-modal-overlay",onClick:i,children:[e.jsxs("div",{className:"pc-profile-modal",onClick:a=>a.stopPropagation(),children:[e.jsx("button",{className:"pc-modal-x",onClick:i,children:"✕"}),e.jsxs("aside",{className:"pc-profile-side",children:[e.jsxs("div",{className:"pc-profile-user",children:[e.jsx("div",{className:"pc-profile-avatar",children:((n==null?void 0:n.firstName)||(n==null?void 0:n.email)||"U").charAt(0).toUpperCase()}),e.jsx("div",{className:"pc-profile-email",children:(n==null?void 0:n.email)||"—"}),(n==null?void 0:n.uid)&&e.jsxs("div",{className:"pc-profile-uid",children:["UID: ",n.uid]}),e.jsxs("div",{className:"pc-kyc-badge",style:{color:B,borderColor:B},children:[e.jsx("i",{className:f==="success"?"fas fa-check-circle":f==="pending"?"fas fa-clock":"fas fa-exclamation-circle"}),M]})]}),!l&&e.jsx("div",{className:"pc-kyc-hint",children:F?r("pc.demoNoFeatures"):r("pc.completeKyc")}),e.jsxs("nav",{className:"pc-profile-menu",children:[k.map(a=>e.jsxs("button",{className:`${x.path===a.path?"active":""} ${a.disabled?"disabled":""}`,onClick:()=>$(a),disabled:a.disabled,children:[e.jsx("i",{className:a.icon})," ",e.jsx("span",{children:a.name}),a.disabled&&e.jsx("i",{className:"fas fa-lock pc-lock"})]},a.name)),e.jsxs("button",{className:"pc-profile-logout",onClick:()=>{g(q.doSignout()),i()},children:[e.jsx("i",{className:"fas fa-sign-out-alt"})," ",e.jsx("span",{children:r("pc.logout")})]})]})]}),e.jsxs("section",{className:`pc-profile-content ${C?"pc-nav-sub":"pc-nav-root"}`,children:[C&&e.jsx("div",{className:"pc-nav-bar",children:e.jsxs("button",{className:"pc-nav-back",onClick:()=>h.goBack(),children:[e.jsx("span",{className:"pc-nav-back-ico",children:"←"})," ",r("pc.back")]})}),e.jsx(De,{history:h,children:e.jsx(Oe.Suspense,{fallback:e.jsx(qe,{}),children:e.jsx(Ue,{children:ot.map(a=>e.jsx(He,{exact:!0,path:a.path,component:a.Component},a.path))})})},`mem-${x.n}`)]})]}),e.jsx("style",{children:`
        .pc-profile-modal {
          background: var(--kt-bg-card); border-radius: 16px; width: 1000px; max-width: 96vw;
          height: 660px; max-height: 92vh; position: relative; display: flex;
          overflow: hidden; box-shadow: 0 24px 64px rgba(0,0,0,0.28);
        }
        .pc-modal-x { position: absolute; top: 12px; right: 16px; border: none; background: none; font-size: 18px; color: var(--kt-text-muted); cursor: pointer; z-index: 5; }
        .pc-profile-side {
          width: 250px; flex-shrink: 0; background: var(--kt-bg-card-alt); border-right: 1px solid var(--kt-border);
          padding: 22px 14px; display: flex; flex-direction: column;
        }
        .pc-profile-user { text-align: center; margin-bottom: 14px; }
        .pc-profile-avatar {
          width: 56px; height: 56px; border-radius: 50%; background: #0064FA; color: #fff;
          font-size: 24px; font-weight: 700; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px;
        }
        .pc-profile-email { font-size: 12px; color: var(--kt-text-muted); word-break: break-all; margin-bottom: 4px; }
        .pc-profile-uid { font-size: 11.5px; color: var(--kt-text-muted); margin-bottom: 8px; }
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
          background: none; border-radius: 8px; cursor: pointer; font-size: 14px; color: var(--kt-text-secondary);
          text-align: left; transition: background .15s; width: 100%;
        }
        .pc-profile-menu button i:first-child { width: 18px; color: var(--kt-text-muted); }
        .pc-profile-menu button:hover:not(.disabled):not(.pc-profile-logout) { background: var(--kt-border); }
        .pc-profile-menu button.active { background: #e8f0ff; color: #0064FA; font-weight: 600; }
        .pc-profile-menu button.active i:first-child { color: #0064FA; }
        .pc-profile-menu button.disabled { opacity: 0.45; cursor: not-allowed; }
        .pc-lock { margin-left: auto; font-size: 11px; color: var(--kt-text-muted); }
        .pc-profile-logout { margin-top: auto; color: #ef4444 !important; }
        .pc-profile-logout i { color: #ef4444 !important; }

        .pc-profile-content { flex: 1; overflow-y: auto; background: var(--kt-bg-card); position: relative; }
        .pc-profile-content .container,
        .pc-profile-content .market-detail-container,
        .pc-profile-content .op-page,
        .pc-profile-content .profile-page,
        .pc-profile-content .withdraw-container { max-width: 100% !important; min-height: auto !important; }

        /* In-modal back bar (only on sub-pages) */
        .pc-nav-bar { position: sticky; top: 0; z-index: 6; background: var(--kt-bg-card); border-bottom: 1px solid var(--kt-border); padding: 8px 14px; }
        .pc-nav-back { display: inline-flex; align-items: center; gap: 8px; border: none; background: var(--kt-bg-card-alt); color: #0064FA; font-weight: 700; font-size: 13px; padding: 7px 14px; border-radius: 8px; cursor: pointer; }
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
      `})]})}const it=`
  .pc-root {
    --primary: #0064FA; --green: #10b981; --red: #ef4444;
    --bg: #ffffff; --bg-light: #f7f8fa; --border: var(--kt-border); --text: #1a1d23; --muted: #6b7280;
    font-family: 'Inter','Segoe UI',system-ui,-apple-system,sans-serif;
    height: 100vh; display: flex; flex-direction: column; background: var(--bg-light); color: var(--text);
  }
  .pc-root * { box-sizing: border-box; }

  [data-theme='dark'] .pc-root {
    --bg: var(--kt-bg-card); --bg-light: var(--kt-bg-page); --text: var(--kt-text-primary); --muted: var(--kt-text-muted);
    color-scheme: dark;
  }

  /* Header */
  .pc-header {
    height: 60px; flex-shrink: 0; background: var(--kt-bg-card); border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between; padding: 0 20px;
  }
  .pc-logo { font-size: 18px; font-weight: 800; color: var(--primary); display: flex; align-items: center; gap: 6px; }
  .pc-logo span { color: var(--text); }
  .pc-header-left img { height: 44px; width: auto; }
  .pc-header-center { flex: 1; display: flex; justify-content: center; }
  .pc-asset-chip { display: flex; align-items: center; gap: 8px; background: var(--bg-light); padding: 6px 14px; border-radius: 10px; font-size: 14px; }
  .pc-asset-price { font-weight: 700; color: var(--primary); }
  .pc-header-right { display: flex; align-items: center; gap: 10px; }
  .pc-lang { padding: 7px 10px; border: 1px solid var(--border); border-radius: 8px; font-size: 13px; background: var(--kt-bg-card); cursor: pointer; outline: none; }
  .pc-btn-ghost { padding: 8px 16px; border: 1px solid var(--border); border-radius: 8px; background: var(--kt-bg-card); color: var(--text); font-weight: 600; font-size: 14px; cursor: pointer; }
  .pc-btn-ghost:hover { border-color: var(--primary); color: var(--primary); }
  .pc-btn-primary { padding: 8px 18px; border: none; border-radius: 8px; background: var(--primary); color: #fff; font-weight: 700; font-size: 14px; cursor: pointer; }
  .pc-btn-primary:disabled { opacity: .6; cursor: default; }

  /* Main layout */
  .pc-main { flex: 1; display: flex; overflow: hidden; }

  /* Left */
  .pc-left { width: 290px; flex-shrink: 0; background: var(--kt-bg-card); border-right: 1px solid var(--border); display: flex; flex-direction: column; }
  .pc-search { display: flex; align-items: center; gap: 8px; padding: 12px 14px; border-bottom: 1px solid var(--border); }
  .pc-search i { color: var(--muted); font-size: 13px; }
  .pc-search input { flex: 1; border: none; outline: none; font-size: 14px; background: transparent; color: var(--text); }
  .pc-filter { padding: 10px 14px; border-bottom: 1px solid var(--border); }
  .pc-filter select { width: 100%; padding: 8px 10px; border: 1px solid var(--border); border-radius: 8px; font-size: 13px; outline: none; cursor: pointer; background: var(--bg); color: var(--text); }
  .pc-market-list { flex: 1; overflow-y: auto; }
  .pc-market-item { display: flex; align-items: center; gap: 10px; padding: 10px 14px; cursor: pointer; border-bottom: 1px solid var(--border); transition: background .12s; }
  .pc-market-item:hover { background: var(--bg-light); }
  .pc-market-item.active { background: #e8f0ff; }
  [data-theme='dark'] .pc-market-item.active { background: rgba(0, 100, 250, 0.16); }
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
  .pc-chart-wrap { flex: 1; min-height: 0; border: 1px solid #e0e3e8; border-radius: 12px; overflow: hidden; background: var(--kt-bg-card); display: flex; flex-direction: column; }
  .pc-chart-wrap > div { flex: 1; }
  [data-theme='dark'] .pc-chart-wrap { border-color: #1c212b; background: #0b0e14; }

  /* Trade panel */
  .pc-trade-panel { background: var(--kt-bg-card); border: 1px solid var(--border); border-radius: 12px; padding: 16px; display: flex; flex-direction: column; }
  .pc-trade-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; font-size: 14px; }
  .pc-trade-row label { color: var(--muted); font-weight: 600; display: flex; align-items: center; gap: 6px; }
  .pc-trade-row select, .pc-trade-row > input { padding: 8px 12px; border: 1.5px solid var(--border); border-radius: 8px; font-size: 14px; outline: none; width: 160px; text-align: right; background: var(--bg); color: var(--text); }
  .pc-trade-row select:focus, .pc-trade-row > input:focus { border-color: var(--primary); }
  .pc-stepper { display: flex; align-items: center; gap: 6px; }
  .pc-stepper button { width: 30px; height: 30px; border: 1px solid var(--border); background: var(--bg-light); color: var(--text); border-radius: 7px; cursor: pointer; font-size: 16px; }
  .pc-stepper input { width: 84px; text-align: center; border: 1.5px solid var(--border); border-radius: 7px; padding: 6px; font-weight: 600; outline: none; background: var(--bg); color: var(--text); }
  .pc-trade-info { display: flex; justify-content: space-between; align-items: center; padding-top: 6px; border-top: 1px solid var(--border); font-size: 14px; color: var(--muted); }
  .pc-insufficient { background: #fef2f2; border: 1px solid #fecaca; color: #dc2626; border-radius: 8px; padding: 9px 12px; font-size: 13px; font-weight: 500; text-align: center; }
  .pc-trade-actions, .pc-binary-actions { display: flex; gap: 12px; }
  .pc-buy, .pc-sell { flex: 1; padding: 13px; border: none; border-radius: 10px; font-weight: 700; font-size: 15px; cursor: pointer; color: #fff; }
  .pc-buy { background: var(--green); }
  .pc-sell { background: var(--red); }
  .pc-buy:disabled, .pc-sell:disabled { opacity: .5; cursor: default; }

  /* Right */
  .pc-right { width: 320px; flex-shrink: 0; background: var(--kt-bg-card); border-left: 1px solid var(--border); padding: 12px; display: flex; flex-direction: column; gap: 10px; overflow-y: auto; }

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
    font-size: 13px; color: var(--text); background: var(--kt-bg-card); outline: none; cursor: pointer; margin-bottom: 8px;
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
  .pc-slider { position: absolute; inset: 0; background: var(--kt-border); border-radius: 20px; transition: .2s; cursor: pointer; }
  .pc-slider::before { content: ''; position: absolute; height: 15px; width: 15px; left: 3px; bottom: 2.5px; background: var(--kt-bg-card); border-radius: 50%; transition: .2s; box-shadow: 0 1px 3px rgba(0,0,0,0.2); }
  .pc-switch input:checked + .pc-slider { background: var(--primary); }
  .pc-switch input:checked + .pc-slider::before { transform: translateX(18px); }

  /* Stepper (full-width) */
  .pc-stepper.full { display: flex; align-items: stretch; gap: 0; margin-bottom: 9px; border: 1px solid var(--border); border-radius: 8px; overflow: hidden; }
  .pc-stepper.full button {
    width: 38px; border: none; background: var(--bg-light); color: var(--text); font-size: 17px; cursor: pointer; flex-shrink: 0;
  }
  .pc-stepper.full button:disabled { opacity: .5; cursor: default; }
  .pc-stepper.full input {
    flex: 1; min-width: 0; border: none; border-left: 1px solid var(--border); border-right: 1px solid var(--border);
    text-align: center; font-size: 13px; font-weight: 600; color: var(--text); outline: none; padding: 7px 6px; background: var(--bg);
  }
  .pc-stepper.full input:disabled { background: var(--bg-light); color: var(--kt-text-muted); }
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
  .pc-confirm { background: var(--kt-bg-card); border-radius: 14px; width: 360px; max-width: 92vw; padding: 22px; }
  .pc-confirm-title { font-size: 17px; font-weight: 800; margin-bottom: 16px; text-align: center; }
  .pc-confirm-actions { display: flex; gap: 10px; margin-top: 18px; }
  .pc-confirm-actions button { flex: 1; }

  /* Toast */
  .pc-toast { position: fixed; top: 76px; right: 20px; background: var(--kt-bg-card); border-left: 4px solid var(--green); box-shadow: 0 8px 32px rgba(0,0,0,0.15); border-radius: 10px; padding: 14px 18px; font-weight: 600; font-size: 14px; z-index: 11000; }
`;function nt({className:i}){const{theme:g,toggleTheme:n}=Ie(),f=g==="dark";return e.jsxs("button",{type:"button",className:`kt-theme-toggle ${i||""}`,onClick:n,"aria-label":f?"Switch to light mode":"Switch to dark mode",title:f?"Switch to light mode":"Switch to dark mode",children:[e.jsx("i",{className:f?"fas fa-moon":"fas fa-sun"}),e.jsx("style",{children:`
        .kt-theme-toggle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid var(--kt-border);
          background: var(--kt-bg-card-alt);
          color: var(--kt-text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          cursor: pointer;
          transition: 0.2s;
          flex-shrink: 0;
        }
        .kt-theme-toggle:hover {
          border-color: #106cf5;
          color: #106cf5;
        }
      `})]})}function ct(i){return i==null?"—":`${i>=0?"+":""}${i.toFixed(2)}%`}function ee(i){return i==null?"—":i>=1e4?i.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}):i>=100?i.toFixed(2):i>=10?i.toFixed(3):i.toFixed(5)}function ft(){const i=le(),g=T(I.selectCurrentUser),n=T(I.selectCurrentTenant),f=T(Ve.selectRows),[l,F]=o.useState("XAUUSD"),[k,U]=o.useState(""),[x,P]=o.useState("All"),[h,C]=o.useState(null),[R,$]=o.useState(!1),[M,B]=o.useState(Ke()),[N,a]=o.useState(100),[p,b]=o.useState(.01),[V,y]=o.useState("0.01"),[j,te]=o.useState(!1),[K,D]=o.useState(0),[S,X]=o.useState(!1),[d,J]=o.useState(0),[A,G]=o.useState(null),[Q,pe]=o.useState(!1),[de,ue]=o.useState(null),[re,we]=o.useState({}),H=o.useRef(null),ae=o.useRef(null),oe=t=>`~m~${t.length}~m~${t}`,je=t=>{const s=[];let u=t;for(;u.length>0&&u.startsWith("~m~");){const v=u.indexOf("~m~",3),w=parseInt(u.substring(3,v));s.push(u.substring(v+3,v+3+w)),u=u.substring(v+3+w)}return s},Ne=t=>{try{return JSON.parse(t.replace(/^=\{/,"{")).symbol||t}catch{return t}},se=o.useCallback(()=>{H.current&&(H.current.close(),H.current=null);const t=new WebSocket(Qe());H.current=t,t.onopen=()=>{const s="qs_"+Math.random().toString(36).substring(2,12);t.send(oe(JSON.stringify({m:"quote_create_session",p:[s]}))),t.send(oe(JSON.stringify({m:"quote_set_fields",p:[s,"lp","ask","bid","chp"]}))),t.send(oe(JSON.stringify({m:"quote_add_symbols",p:[s,...ve.map(u=>u.symbol)]})))},t.onmessage=s=>{const u=s.data;if(u.startsWith("~h~")){t.send(u);return}je(u).forEach(v=>{try{const w=JSON.parse(v);if(w.m!=="qsd")return;const W=w.p[1],L=Ne(W.n),E=W.v;if(!E)return;we(ce=>{const z=ce[L]||{symbol:L,ask:0,bid:0},_={symbol:L,ask:E.ask??z.ask,bid:E.bid??z.bid,lp:typeof E.lp=="number"?E.lp:z.lp,chp:typeof E.chp=="number"?E.chp:z.chp};return z.ask===_.ask&&z.bid===_.bid&&z.lp===_.lp&&z.chp===_.chp?ce:{...ce,[L]:_}})}catch{}})},t.onclose=s=>{s.wasClean||(ae.current=setTimeout(se,3e3))},t.onerror=()=>{}},[]);o.useEffect(()=>(se(),()=>{var t;ae.current&&clearTimeout(ae.current),(t=H.current)==null||t.close()}),[se]);const xe=Ye(),c=xe[l],m=o.useMemo(()=>{const t=re[l];return t?t.lp&&t.lp>0?t.lp:t.ask&&t.bid?(t.ask+t.bid)/2:null:null},[re,l]),[Ce,Se]=o.useState(()=>typeof window<"u"?Math.max(360,window.innerHeight-60-88):480);o.useEffect(()=>{const t=()=>Se(Math.max(360,window.innerHeight-60-88));return window.addEventListener("resize",t),()=>window.removeEventListener("resize",t)},[]);const fe=o.useRef(null);o.useEffect(()=>{fe.current=m},[m]);const ze=o.useMemo(()=>c?{symbol:c.symbol,entryPrice:c.entryPrice,targetPrice:c.targetPrice,startedAt:c.startedAt,durationMs:c.durationMs,seed:c.seed}:null,[c==null?void 0:c.symbol,c==null?void 0:c.startedAt,c==null?void 0:c.targetPrice,c==null?void 0:c.durationMs,c==null?void 0:c.entryPrice,c==null?void 0:c.seed]),[me,he]=o.useState(0);o.useEffect(()=>{g&&i(be.doFetch())},[i,g]),o.useEffect(()=>{const t=f==null?void 0:f.find(s=>s.symbol==="USDT");he((t==null?void 0:t.amount)||0)},[f]);const ie=Ze(l)||{symbol:l,name:l},Fe=c?fe.current??c.targetPrice:m,O=o.useMemo(()=>{const t=m??0,s=N/100;return t*100*p/s},[m,p,N]),ne=O>=100?O.toFixed(3):O.toFixed(5),Y=g?me<O&&O>0:!1,Pe=o.useMemo(()=>((m??0)*p*100*1e-5).toFixed(6),[m,p]),Me=`1 Lots = 100 ${l}`,Ae=o.useMemo(()=>ve.filter(t=>k&&!`${t.symbol} ${t.name}`.toLowerCase().includes(k.toLowerCase())?!1:x==="All"?!0:x==="Forex"?!!t.baseFlag&&!t.badgeColor&&!/OIL|100|200|225|30|35|40|500|SPX|NAS|US30/.test(t.symbol):x==="Crypto"?!!t.badgeColor&&/BTC|ETH|LTC/.test(t.symbol):x==="Metals"?/XAU|XAG/.test(t.symbol):x==="Indices"?/100|200|225|30|35|40|500|SPX|NAS|US30/.test(t.symbol):!0),[k,x]),ge=t=>{if(!g){C("login");return}G(t)},Le=async()=>{var t,s,u,v;if(!(!A||!(n!=null&&n.id)||m==null)){pe(!0);try{await Ge.post(`/tenant/${n.id}/trade-orders`,{orderType:"market",symbol:l,symbolName:ie.name,direction:A,lots:p,multiplier:N,entryPrice:m,takeProfit:S?d:null,stopLoss:j?K:null}),he(w=>Math.max(0,w-O)),i(be.doFetch()),G(null),ue(`${A==="buy"?r("pc.buy"):r("pc.sell")} — ${r("pc.orderPlaced")} ${l}`),setTimeout(()=>ue(null),3500)}catch(w){alert(((v=(u=(s=(t=w==null?void 0:w.response)==null?void 0:t.data)==null?void 0:s.errors)==null?void 0:u[0])==null?void 0:v.message)||"Failed to place order")}finally{pe(!1)}}},Ee=t=>{B(t),tt.doChangeLanguage(t)};return e.jsxs("div",{className:"pc-root",children:[e.jsx("style",{children:it}),e.jsxs("header",{className:"pc-header",children:[e.jsx("div",{className:"pc-header-left",children:e.jsx("img",{src:"/logo.svg",alt:""})}),e.jsx("div",{className:"pc-header-center"}),e.jsxs("div",{className:"pc-header-right",children:[e.jsx(nt,{}),e.jsx("select",{className:"pc-lang",value:M,onChange:t=>Ee(t.target.value),children:Xe().map(t=>e.jsx("option",{value:t.id,children:t.label},t.id))}),g?e.jsx(e.Fragment,{children:e.jsxs("button",{className:"pc-btn-ghost",onClick:()=>$(!0),children:[e.jsx("i",{className:"fas fa-user"})," ",r("pc.profile")]})}):e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"pc-btn-ghost",onClick:()=>C("login"),children:r("pc.login")}),e.jsx("button",{className:"pc-btn-primary",onClick:()=>C("register"),children:r("pc.register")})]})]})]}),e.jsxs("div",{className:"pc-main",children:[e.jsxs("aside",{className:"pc-left",children:[e.jsxs("div",{className:"pc-search",children:[e.jsx("i",{className:"fas fa-search"}),e.jsx("input",{placeholder:r("pc.searchMarkets"),value:k,onChange:t=>U(t.target.value)})]}),e.jsx("div",{className:"pc-filter",children:e.jsx("select",{value:x,onChange:t=>P(t.target.value),children:[["All","pc.all"],["Forex","pc.forex"],["Crypto","pc.crypto"],["Metals","pc.metals"],["Indices","pc.indices"]].map(([t,s])=>e.jsx("option",{value:t,children:r(s)},t))})}),e.jsx("div",{className:"pc-market-list",children:Ae.map(t=>{const s=re[t.symbol],u=s?s.lp&&s.lp>0?s.lp:s.ask&&s.bid?(s.ask+s.bid)/2:null:null,v=xe[t.symbol],w=v?v.targetPrice:u,W=v?(v.targetPrice-v.entryPrice)/v.entryPrice*100:(s==null?void 0:s.chp)??null,L=(W??0)>=0;return e.jsxs("div",{className:`pc-market-item ${l===t.symbol?"active":""}`,onClick:()=>F(t.symbol),children:[e.jsx(ke,{pair:t,size:"sm"}),e.jsxs("div",{className:"pc-market-info",children:[e.jsx("div",{className:"pc-market-symbol",children:t.symbol}),e.jsx("div",{className:"pc-market-name",children:t.name})]}),e.jsxs("div",{className:"pc-market-px",children:[e.jsx("div",{className:"pc-market-price",children:ee(w)}),e.jsxs("div",{className:`pc-market-chg ${L?"pos":"neg"}`,children:[L?"▲":"▼"," ",ct(W)]})]})]},t.symbol)})})]}),e.jsxs("section",{className:"pc-center",children:[e.jsxs("div",{className:"pc-chart-head",children:[e.jsxs("div",{className:"pc-chart-asset",children:[e.jsx(ke,{pair:ie,size:"md"}),e.jsxs("div",{children:[e.jsx("div",{className:"pc-chart-name",children:l}),e.jsx("div",{className:"pc-chart-sub",children:ie.name})]})]}),e.jsx("div",{className:"pc-chart-price",style:{color:c?c.targetPrice>=c.entryPrice?"#10b981":"#ef4444":"var(--kt-text-primary)"},children:ee(Fe)})]}),e.jsx("div",{className:"pc-chart-wrap",children:e.jsx(et,{symbol:l,livePrice:m,height:Ce,priceInjection:ze},l)})]}),e.jsxs("aside",{className:"pc-right",children:[e.jsxs("div",{className:"pc-funds",children:[e.jsx("div",{className:"pc-funds-label",children:r("pc.availableFunds")}),e.jsx("div",{className:"pc-funds-amount",children:g?`$${me.toFixed(2)}`:"----"})]}),e.jsxs("div",{className:"pc-trade-panel",children:[e.jsx("div",{className:"pc-tp-symbol",children:l}),e.jsx("div",{className:"pc-tp-price",children:ee(m)}),e.jsx("select",{className:"pc-tp-select",children:e.jsx("option",{children:r("pc.marketPrice")})}),e.jsx("div",{className:"pc-tp-label",children:r("pc.multiplier")}),e.jsx("select",{className:"pc-tp-select",value:N,onChange:t=>a(+t.target.value),children:[100,200,300,400,500].map(t=>e.jsx("option",{value:t,children:t},t))}),e.jsxs("div",{className:"pc-tp-toggle-row",children:[e.jsx("span",{children:r("pc.setLoss")}),e.jsxs("label",{className:"pc-switch",children:[e.jsx("input",{type:"checkbox",checked:j,onChange:t=>{te(t.target.checked),D(t.target.checked&&m?m:0)}}),e.jsx("span",{className:"pc-slider"})]})]}),e.jsxs("div",{className:"pc-stepper full",children:[e.jsx("button",{onClick:()=>j&&D(t=>Math.max(0,+(t-.01).toFixed(5))),disabled:!j,children:"−"}),e.jsx("input",{type:"number",step:"any",min:"0",disabled:!j,value:K,onChange:t=>D(parseFloat(t.target.value)||0)}),e.jsx("button",{onClick:()=>j&&D(t=>+(t+.01).toFixed(5)),disabled:!j,children:"+"})]}),e.jsxs("div",{className:"pc-tp-toggle-row",children:[e.jsx("span",{children:r("pc.takeProfit")}),e.jsxs("label",{className:"pc-switch",children:[e.jsx("input",{type:"checkbox",checked:S,onChange:t=>{X(t.target.checked),J(t.target.checked&&m?m:0)}}),e.jsx("span",{className:"pc-slider"})]})]}),e.jsxs("div",{className:"pc-stepper full",children:[e.jsx("button",{onClick:()=>S&&J(t=>Math.max(0,+(t-.01).toFixed(5))),disabled:!S,children:"−"}),e.jsx("input",{type:"number",step:"any",min:"0",disabled:!S,value:d,onChange:t=>J(parseFloat(t.target.value)||0)}),e.jsx("button",{onClick:()=>S&&J(t=>+(t+.01).toFixed(5)),disabled:!S,children:"+"})]}),e.jsx("div",{className:"pc-tp-label",children:r("pc.lots")}),e.jsxs("div",{className:"pc-stepper full",children:[e.jsx("button",{onClick:()=>{const t=Math.max(.01,+(p-.01).toFixed(2));b(t),y(String(t))},children:"−"}),e.jsx("input",{type:"text",inputMode:"decimal",value:V,onChange:t=>{const s=t.target.value.replace(/[^0-9.]/g,"");y(s);const u=parseFloat(s);!isNaN(u)&&u>0&&b(u)},onBlur:()=>{let t=parseFloat(V);(isNaN(t)||t<.01)&&(t=.01),t=Math.round(t*100)/100,b(t),y(String(t))}}),e.jsx("button",{onClick:()=>{const t=+(p+.01).toFixed(2);b(t),y(String(t))},children:"+"})]}),e.jsxs("div",{className:"pc-tp-info",children:[e.jsxs("div",{className:"pc-tp-info-row",children:[e.jsx("span",{children:r("pc.eachLots")}),e.jsx("b",{children:Me})]}),e.jsxs("div",{className:"pc-tp-info-row",children:[e.jsx("span",{children:r("pc.handlingFee")}),e.jsx("b",{children:Pe})]}),e.jsxs("div",{className:"pc-tp-info-row",children:[e.jsx("span",{children:r("pc.estimatedMargin")}),e.jsx("b",{style:{color:Y?"#ef4444":"var(--kt-text-primary)"},children:ne})]})]}),Y&&e.jsxs("div",{className:"pc-insufficient",children:["⚠ ",r("pc.insufficient")," ($",ne,")"]}),e.jsxs("div",{className:"pc-tp-actions",children:[e.jsx("button",{className:"pc-buy2",disabled:m==null||Y,onClick:()=>ge("buy"),children:r("pc.buy")}),e.jsx("button",{className:"pc-sell2",disabled:m==null||Y,onClick:()=>ge("sell"),children:r("pc.sell")})]})]})]})]}),A&&e.jsx("div",{className:"pc-modal-overlay",onClick:()=>!Q&&G(null),children:e.jsxs("div",{className:"pc-confirm",onClick:t=>t.stopPropagation(),children:[e.jsx("div",{className:"pc-confirm-title",children:A==="buy"?r("pc.confirmBuy"):r("pc.confirmSell")}),e.jsxs("div",{className:"pc-summary-row",children:[e.jsx("span",{children:r("pc.symbol")}),e.jsx("strong",{children:l})]}),e.jsxs("div",{className:"pc-summary-row",children:[e.jsx("span",{children:r("pc.direction")}),e.jsx("strong",{className:A==="buy"?"pos":"neg",children:A==="buy"?r("pc.buy"):r("pc.sell")})]}),e.jsxs("div",{className:"pc-summary-row",children:[e.jsx("span",{children:r("pc.price")}),e.jsx("strong",{children:ee(m)})]}),e.jsxs("div",{className:"pc-summary-row",children:[e.jsx("span",{children:r("pc.lotsMult")}),e.jsxs("strong",{children:[p.toFixed(2)," · ",N,"×"]})]}),e.jsxs("div",{className:"pc-summary-row",children:[e.jsx("span",{children:r("pc.estimatedMargin")}),e.jsxs("strong",{children:["$",ne]})]}),e.jsxs("div",{className:"pc-confirm-actions",children:[e.jsx("button",{className:"pc-btn-ghost",onClick:()=>G(null),disabled:Q,children:r("pc.cancel")}),e.jsx("button",{className:"pc-btn-primary",onClick:Le,disabled:Q,children:Q?r("pc.placing"):r("pc.confirm")})]})]})}),de&&e.jsxs("div",{className:"pc-toast",children:["✓ ",de]}),h&&e.jsx(rt,{initialMode:h,onClose:()=>C(null)}),R&&e.jsx(st,{onClose:()=>$(!1)}),e.jsx(Je,{})]})}export{ft as default};

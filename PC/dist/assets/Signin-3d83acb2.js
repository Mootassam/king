import{a6 as N,p as e,u as z,i as m,j as p,k as g,n as i,o,I as x}from"./index-09aa8b3d.js";import{u as S,y as L,F as M}from"./FormErrors-d39f08b1.js";import{y as n}from"./yupFormSchemas-a6afb6f3.js";import{I as f}from"./InputFormItem-e76c37b1.js";import{I as C}from"./I18nSelect-19943e02.js";import{u as I}from"./useDispatch-0fa0cc57.js";import"./layoutActions-6639d049.js";const F=N().shape({email:n.string(e("user.fields.username"),{required:!0}).email(e("validation.email")),password:n.string(e("user.fields.password"),{required:!0,min:6}),rememberMe:n.boolean(e("user.fields.rememberMe"))});function q(){const t=I(),h=z(),a=m(p.selectLoading),s=m(p.selectErrorMessage),[u,l]=g.useState(!1),d=S({resolver:L.yupResolver(F),mode:"onSubmit",defaultValues:{email:"",password:"",rememberMe:!0}});g.useEffect(()=>{t(i.doClearErrorMessage())},[t]);const b=({email:r,password:k,rememberMe:w})=>{t(i.doSigninWithEmailAndPassword(r,k,w))},y=()=>{t(i.doDemoLogin())},v=()=>{h.goBack()},j=()=>{l(!0)},c=()=>{l(!1)};return o.jsxs("div",{className:"signin-container",children:[o.jsxs("div",{className:"signin-header",children:[o.jsxs("div",{className:"header-left",onClick:v,children:[o.jsx("i",{className:"fas fa-arrow-left"}),o.jsx("span",{children:"Back"})]}),o.jsx("div",{className:"header-title",children:"Sign In"}),o.jsx("div",{className:"header-right",onClick:j,children:o.jsx("i",{className:"fas fa-globe"})})]}),o.jsxs("div",{className:"signin-card",children:[o.jsx("div",{className:"logo-container",children:o.jsx("img",{className:"logo-img",src:"/logo.svg",alt:"FXCC Logo"})}),o.jsx("div",{className:"form-heading",children:"Sign in to Secure Client Area"}),o.jsxs(M,{...d,children:[s&&o.jsx("div",{className:"error-message",children:s}),o.jsxs("form",{onSubmit:d.handleSubmit(b),children:[o.jsx(f,{type:"email",name:"email",placeholder:e("auth.fields.emailPlaceholder"),className:"input-field"}),o.jsx(f,{type:"password",name:"password",placeholder:e("auth.fields.passwordPlaceholder"),className:"input-field",autoComplete:"current-password"}),o.jsx("div",{className:"forgot-link",children:o.jsx(x,{to:"/auth/forgot-password",children:e("auth.signin.forgetPassword")})}),o.jsx("button",{className:"login-button",disabled:a,type:"submit",children:a?o.jsxs(o.Fragment,{children:[o.jsx("i",{className:"fas fa-spinner fa-spin",style:{marginRight:"8px"}}),e("auth.signin.signingIn")]}):e("auth.signin.button")}),o.jsx("button",{className:"demo-login-button",onClick:y,disabled:a,type:"button",children:a?o.jsxs(o.Fragment,{children:[o.jsx("i",{className:"fas fa-spinner fa-spin",style:{marginRight:"8px"}}),"Loading..."]}):"Login to Demo Account"})]})]}),o.jsx(x,{to:"/auth/signup",className:"bottom-text",children:o.jsx("p",{children:"Don't have an account?"})})]}),u&&o.jsx("div",{className:"modal-overlay",onClick:c,children:o.jsxs("div",{className:"modal-container-bottom",onClick:r=>r.stopPropagation(),children:[o.jsxs("div",{className:"modal-header-bottom",children:[o.jsx("div",{className:"modal-drag-handle"}),o.jsxs("div",{className:"modal-title-wrapper",children:[o.jsx("div",{className:"modal-title",children:e("auth.common.selectLanguage")}),o.jsx("button",{className:"modal-close-btn-bottom",onClick:c,children:o.jsx("i",{className:"fas fa-times"})})]})]}),o.jsx("div",{className:"modal-content-bottom",children:o.jsx(C,{isInModal:!0})})]})}),o.jsx("style",{children:`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        .signin-container {
          
          margin: 0 auto;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          display: flex;
          flex-direction: column;
        }

        /* ── Header ── */
        .signin-header {
          min-height: 60px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: white;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          opacity: 0.9;
          transition: opacity 0.2s;
        }
        .header-left:hover {
          opacity: 1;
        }
        .header-left i {
          font-size: 16px;
        }

        .header-title {
          font-size: 17px;
          font-weight: 600;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        .header-right {
          font-size: 18px;
          cursor: pointer;
          opacity: 0.9;
          transition: opacity 0.2s;
        }
        .header-right:hover {
          opacity: 1;
        }

        /* ── White content card ── */
        .signin-card {
          background: var(--kt-bg-card);
          border-radius: 40px 40px 0 0;
          padding: 30px 24px 100px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          flex: 1;
        }

        .logo-container {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }
        .logo-img {
          height: 36px;
          width: auto;
        }

        .form-heading {
          text-align: center;
          font-size: 15px;
          color: var(--kt-text-secondary);
          margin-bottom: 28px;
          font-weight: 500;
        }

        .input-field {
          background-color: var(--kt-bg-card);
          border: 1px solid var(--kt-border);
          border-radius: 8px;
          height: 48px;
          width: 100%;
          padding: 0 14px;
          color: var(--kt-text-primary);
          font-size: 14px;
          outline: none;
          margin-bottom: 14px;
          box-sizing: border-box;
          transition: 0.2s;
          font-family: inherit;
        }
        .input-field:focus {
          border-color: #106cf5;
          box-shadow: 0 0 0 3px rgba(16, 108, 245, 0.06);
        }
        .input-field::placeholder {
          color: var(--kt-text-muted);
        }

        .forgot-link {
          text-align: right;
          margin-bottom: 20px;
        }
        .forgot-link a {
          color: #106cf5;
          text-decoration: none;
          font-size: 13px;
          font-weight: 500;
        }

        .login-button {
          background-color: #106cf5;
          color: white;
          font-weight: 600;
          height: 50px;
          width: 100%;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          cursor: pointer;
          margin-bottom: 18px;
          transition: 0.2s;
          box-shadow: 0 2px 8px rgba(16, 108, 245, 0.25);
          font-family: inherit;
        }
        .login-button:hover {
          background: #0a4fc4;
          box-shadow: 0 4px 14px rgba(16, 108, 245, 0.35);
          transform: translateY(-1px);
        }
        .login-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .demo-login-button {
          background: var(--kt-bg-card);
          color: #106cf5;
          font-weight: 600;
          height: 50px;
          width: 100%;
          border: 1px solid #106cf5;
          border-radius: 8px;
          font-size: 15px;
          cursor: pointer;
          margin-bottom: 20px;
          transition: 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-family: inherit;
        }
        .demo-login-button:hover {
          background: #e6efff;
          border-color: #0a4fc4;
          color: #0a4fc4;
          transform: translateY(-1px);
        }
        .demo-login-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .bottom-text {
          text-align: center;
          font-size: 14px;
          color: var(--kt-text-tertiary);
          text-decoration: none;
          display: block;
          margin-top: 10px;
        }
        .bottom-text p {
          margin: 5px 0;
        }
        .bottom-text:hover p {
          color: #106cf5;
        }

        .error-message {
          color: #ff4d4d;
          text-align: center;
          margin-bottom: 16px;
          padding: 10px 12px;
          background-color: #fff5f5;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          border: 1px solid #ffcccc;
        }

        /* ── Language Modal (bottom sheet, light) ── */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          z-index: 1000;
        }
        .modal-container-bottom {
          background-color: var(--kt-bg-card);
          width: 100%;
          
          border-top-left-radius: 16px;
          border-top-right-radius: 16px;
          padding: 20px 16px 24px;
          box-sizing: border-box;
          color: var(--kt-text-primary);
          box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
        }
        .modal-header-bottom {
          margin-bottom: 16px;
        }
        .modal-drag-handle {
          width: 36px;
          height: 4px;
          background-color: var(--kt-border);
          border-radius: 2px;
          margin: 0 auto 14px;
        }
        .modal-title-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .modal-title {
          font-size: 17px;
          font-weight: 700;
        }
        .modal-close-btn-bottom {
          background: none;
          border: none;
          color: var(--kt-text-tertiary);
          font-size: 18px;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 6px;
          transition: 0.2s;
        }
        .modal-close-btn-bottom:hover {
          background: var(--kt-bg-card-alt);
          color: var(--kt-text-primary);
        }
        .modal-content-bottom {
          overflow-y: auto;
        }
      `})]})}export{q as default};

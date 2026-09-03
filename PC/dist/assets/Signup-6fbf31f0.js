import{G as k,u,i as m,j as l,k as f,a5 as z,o as a,aD as S,a8 as x,n as e,H as M}from"./index-2cb578c6.js";import{u as E,y as P,F as A}from"./FormErrors-fea87987.js";import{y as p}from"./yupFormSchemas-d38d954b.js";import{I as r}from"./InputFormItem-9406ba2e.js";import{u as F}from"./useDispatch-8dd27ece.js";function O(){const o=F(),b=k(),c=u(m.selectLoading),d=u(m.selectErrorMessage),[h,w]=l.useState("");l.useEffect(()=>{g(),o(f.doClearErrorMessage())},[o]);const j=z().shape({email:p.string(a("pages.signup.labels.email"),{required:!0}),password:p.string(a("pages.signup.labels.password"),{required:!0,min:8}),newPasswordConfirmation:p.string(a("pages.signup.labels.confirmPassword"),{required:!0}).oneOf([S("password"),null],a("auth.passwordChange.mustMatch")),phoneNumber:p.string(a("pages.signup.labels.phoneNumber"),{required:!0}),invitationCode:x().required(a("pages.signup.labels.invitationCode")).test("invitation-code-valid",a("pages.signup.invalidInvitationCode"),s=>String(s||"").trim().toUpperCase()==="IRONFX24"),captcha:x().required(a("pages.signup.labels.captcha")).test("captcha-match",a("pages.signup.captchaMismatch"),function(s){return s===h})}),i=E({resolver:P.yupResolver(j),mode:"onSubmit",defaultValues:{email:"",password:"",newPasswordConfirmation:"",phoneNumber:"",invitationCode:"",captcha:""}}),g=l.useCallback(()=>{const s="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";let t="";for(let n=0;n<6;n++)t+=s.charAt(Math.floor(Math.random()*s.length));w(t),i.setValue("captcha",""),i.clearErrors("captcha")},[i]),N=l.useCallback(s=>{const{email:t,password:n,phoneNumber:v,invitationCode:C}=s;o(f.doRegisterEmailAndPassword(t,n,v,C))},[o]),y=()=>{b.goBack()};return e.jsxs("div",{className:"signup-container",children:[e.jsxs("div",{className:"signup-header",children:[e.jsxs("div",{className:"header-left",onClick:y,children:[e.jsx("i",{className:"fas fa-arrow-left"}),e.jsx("span",{children:"Back"})]}),e.jsx("div",{className:"header-title",children:"Create Account"}),e.jsx("div",{className:"header-right"})," "]}),e.jsxs("div",{className:"signup-card",children:[e.jsx("div",{className:"form-heading",children:"Create your account"}),e.jsxs(A,{...i,children:[d&&e.jsx("div",{className:"error-message",children:d}),e.jsxs("form",{onSubmit:i.handleSubmit(N),children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:a("pages.signup.labels.email")}),e.jsx(r,{type:"email",name:"email",placeholder:a("pages.signup.placeholders.email"),className:"input-field",externalErrorMessage:null,autoComplete:"email"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:a("pages.signup.labels.phoneNumber")}),e.jsx(r,{type:"tel",name:"phoneNumber",placeholder:a("pages.signup.placeholders.phoneNumber"),className:"input-field",autoComplete:"tel"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:a("pages.signup.labels.invitationCode")}),e.jsx(r,{type:"text",name:"invitationCode",placeholder:a("pages.signup.placeholders.invitationCode"),className:"input-field",autoComplete:"off"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:a("pages.signup.labels.captcha")}),e.jsxs("div",{className:"captcha-wrapper",children:[e.jsxs("div",{className:"captcha-display",onClick:g,children:[e.jsx("div",{className:"captcha-text",children:h}),e.jsxs("div",{className:"captcha-refresh",children:[e.jsx("i",{className:"fas fa-sync-alt"}),e.jsx("span",{children:a("pages.signup.refresh")})]})]}),e.jsx(r,{type:"text",name:"captcha",placeholder:a("pages.signup.placeholders.captcha"),className:"input-field captcha-input"})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:a("pages.signup.labels.password")}),e.jsx(r,{type:"password",name:"password",placeholder:a("pages.signup.placeholders.password"),className:"input-field",autoComplete:"new-password"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:a("pages.signup.labels.confirmPassword")}),e.jsx(r,{type:"password",name:"newPasswordConfirmation",placeholder:a("pages.signup.placeholders.confirmPassword"),className:"input-field",autoComplete:"new-password"})]}),e.jsx("button",{className:"signup-button",disabled:c,type:"submit",children:c?e.jsxs("span",{children:[e.jsx("i",{className:"fas fa-spinner fa-spin",style:{marginRight:"8px"}}),a("pages.signup.creatingAccount")]}):e.jsx("span",{children:a("pages.signup.createAccount")})}),e.jsx("div",{className:"login-link",children:e.jsx(M,{to:"/auth/signin",children:a("pages.signup.alreadyHaveAccount")})})]})]})]}),e.jsx("style",{children:`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        .signup-container {
          
          margin: 0 auto;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          display: flex;
          flex-direction: column;
        }

        /* ── Header ── */
        .signup-header {
          background: transparent;
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
          white-space: nowrap;
        }

        .header-right {
          width: 60px; /* to balance the layout */
        }

        /* ── White content card ── */
        .signup-card {
          background: white;
          border-radius: 40px 40px 0 0;
          padding: 30px 24px 100px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          flex: 1;
        }

        .form-heading {
          text-align: center;
          font-size: 18px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 24px;
        }

        .form-group {
          margin-bottom: 14px;
        }

        .form-label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: #555;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          margin-bottom: 6px;
        }

        .input-field {
          background-color: #ffffff;
          border: 1px solid #edeef1;
          border-radius: 8px;
          height: 46px;
          width: 100%;
          padding: 0 14px;
          color: #1a1a1a;
          font-size: 14px;
          outline: none;
          box-sizing: border-box;
          transition: 0.2s;
          font-family: inherit;
        }
        .input-field:focus {
          border-color: #106cf5;
          box-shadow: 0 0 0 3px rgba(16, 108, 245, 0.06);
        }
        .input-field::placeholder {
          color: #aaa;
        }

        .captcha-wrapper {
          display: flex;
          gap: 10px;
        }

        .captcha-display {
          background-color: #f8f9fb;
          border: 1px solid #edeef1;
          border-radius: 8px;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 14px;
          cursor: pointer;
          flex: 1;
          transition: 0.2s;
        }
        .captcha-display:hover {
          border-color: #106cf5;
          background-color: #e6efff;
        }

        .captcha-text {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 4px;
          color: #1a1a1a;
          user-select: none;
        }

        .captcha-refresh {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #106cf5;
          font-size: 12px;
          font-weight: 500;
        }

        .captcha-input {
          flex: 0 0 120px;
        }

        .signup-button {
          background-color: #106cf5;
          color: white;
          font-weight: 600;
          height: 50px;
          width: 100%;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          cursor: pointer;
          margin: 20px 0 16px;
          transition: 0.2s;
          box-shadow: 0 2px 8px rgba(16, 108, 245, 0.25);
          font-family: inherit;
        }
        .signup-button:hover {
          background: #0a4fc4;
          box-shadow: 0 4px 14px rgba(16, 108, 245, 0.35);
          transform: translateY(-1px);
        }
        .signup-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .login-link {
          text-align: right;
        }
        .login-link a {
          color: #106cf5;
          text-decoration: none;
          font-size: 13px;
          font-weight: 500;
        }
        .login-link a:hover {
          text-decoration: underline;
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
      `})]})}export{O as default};

import{X as w,au as B,u as q,j as n,k as e,L as C,aF as u,E as x}from"./index-7fc9eb29.js";import{u as h,y as g,F as b}from"./FormErrors-61fbc341.js";import{y as f}from"./yupFormSchemas-3841929a.js";import{I as p}from"./InputFormItem-4428b2dc.js";const L=60,W=w().shape({email:f.string("Email",{required:!0}).email("Please enter a valid email address")}),D=w().shape({code:f.string("Code",{required:!0,min:6,max:6,matches:/^[0-9]{6}$/})}),Y=w().shape({newPassword:f.string("New password",{required:!0,min:8}),confirmPassword:f.string("Confirm password",{required:!0}).oneOf([B("newPassword"),null],"Passwords must match")});function _(){const F=q(),[t,d]=n.useState("email"),[l,P]=n.useState(""),[r,i]=n.useState(!1),[y,a]=n.useState(""),[m,j]=n.useState(0),o=n.useRef(null),v=h({resolver:g.yupResolver(W),mode:"onSubmit",defaultValues:{email:""}}),N=h({resolver:g.yupResolver(D),mode:"onSubmit",defaultValues:{code:""}}),k=h({resolver:g.yupResolver(Y),mode:"onSubmit",defaultValues:{newPassword:"",confirmPassword:""}});n.useEffect(()=>()=>{o.current&&clearInterval(o.current)},[]);const R=()=>{j(L),o.current&&clearInterval(o.current),o.current=setInterval(()=>{j(s=>s<=1?(o.current&&clearInterval(o.current),0):s-1)},1e3)},S=async s=>{i(!0),a("");try{await u.sendForgotPasswordOtp(s),P(s),d("otp"),R()}catch(c){a(x.selectMessage(c))}finally{i(!1)}},z=({email:s})=>{S(s)},E=()=>{m>0||r||S(l)},I=async({code:s})=>{i(!0),a("");try{await u.verifyForgotPasswordOtp(l,s),d("password")}catch(c){a(x.selectMessage(c))}finally{i(!1)}},O=async({newPassword:s})=>{i(!0),a("");try{await u.resetPasswordWithOtp(l,s),d("done")}catch(c){a(x.selectMessage(c))}finally{i(!1)}},M=()=>{if(a(""),t==="otp"){d("email");return}if(t==="password"){d("otp");return}F.goBack()},V={email:"Forgot Password",otp:"Verify Code",password:"New Password",done:"All Set"}[t];return e.jsxs("div",{className:"fp-container",children:[e.jsxs("div",{className:"fp-header",children:[e.jsxs("div",{className:"fp-header-left",onClick:M,children:[e.jsx("i",{className:"fas fa-arrow-left"}),e.jsx("span",{children:"Back"})]}),e.jsx("div",{className:"fp-header-title",children:V}),e.jsx("div",{className:"fp-header-right"})]}),e.jsxs("div",{className:"fp-card",children:[y&&e.jsx("div",{className:"fp-error-message",children:y}),t==="email"&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"fp-heading",children:"Reset your password"}),e.jsx("div",{className:"fp-subtext",children:"Enter the email address linked to your account. We'll send you a verification code."}),e.jsx(b,{...v,children:e.jsxs("form",{onSubmit:v.handleSubmit(z),children:[e.jsx(p,{type:"email",name:"email",placeholder:"Email address",className:"fp-input",autoComplete:"email",autoFocus:!0}),e.jsx("button",{className:"fp-button",disabled:r,type:"submit",children:r?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-spinner fa-spin",style:{marginRight:"8px"}}),"Sending..."]}):"Send Code"})]})})]}),t==="otp"&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"fp-heading",children:"Check your email"}),e.jsxs("div",{className:"fp-subtext",children:["We sent a 6-digit code to ",e.jsx("strong",{children:l}),". Enter it below to continue."]}),e.jsx(b,{...N,children:e.jsxs("form",{onSubmit:N.handleSubmit(I),children:[e.jsx(p,{type:"text",name:"code",placeholder:"6-digit code",className:"fp-input fp-code-input",autoComplete:"one-time-code",autoFocus:!0}),e.jsx("button",{className:"fp-button",disabled:r,type:"submit",children:r?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-spinner fa-spin",style:{marginRight:"8px"}}),"Verifying..."]}):"Verify Code"})]})}),e.jsx("div",{className:"fp-resend-row",children:m>0?e.jsxs("span",{className:"fp-resend-disabled",children:["Resend code in ",m,"s"]}):e.jsx("span",{className:"fp-resend-link",onClick:E,children:"Resend code"})})]}),t==="password"&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"fp-heading",children:"Create a new password"}),e.jsx("div",{className:"fp-subtext",children:"Choose a new password for your account. It must be at least 8 characters."}),e.jsx(b,{...k,children:e.jsxs("form",{onSubmit:k.handleSubmit(O),children:[e.jsx(p,{type:"password",name:"newPassword",placeholder:"New password",className:"fp-input",autoComplete:"new-password",autoFocus:!0}),e.jsx(p,{type:"password",name:"confirmPassword",placeholder:"Confirm new password",className:"fp-input",autoComplete:"new-password"}),e.jsx("button",{className:"fp-button",disabled:r,type:"submit",children:r?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-spinner fa-spin",style:{marginRight:"8px"}}),"Saving..."]}):"Reset Password"})]})})]}),t==="done"&&e.jsxs("div",{className:"fp-success",children:[e.jsx("div",{className:"fp-success-icon",children:e.jsx("i",{className:"fas fa-check"})}),e.jsx("div",{className:"fp-heading",children:"Password reset"}),e.jsx("div",{className:"fp-subtext",children:"Your password has been changed successfully. You can now sign in with your new password."}),e.jsx(C,{to:"/auth/signin",className:"fp-button fp-button-link",children:"Back to Sign In"})]}),t!=="done"&&e.jsx(C,{to:"/auth/signin",className:"fp-bottom-text",children:"Remembered your password? Sign in"})]}),e.jsx("style",{children:`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        .fp-container {
          max-width: 400px;
          margin: 0 auto;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          display: flex;
          flex-direction: column;
        }

        .fp-header {
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

        .fp-header-left {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          opacity: 0.9;
          transition: opacity 0.2s;
        }
        .fp-header-left:hover {
          opacity: 1;
        }
        .fp-header-left i {
          font-size: 16px;
        }

        .fp-header-title {
          font-size: 17px;
          font-weight: 600;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
        }

        .fp-header-right {
          width: 60px;
        }

        .fp-card {
          background: var(--kt-bg-card);
          border-radius: 40px 40px 0 0;
          padding: 34px 24px 100px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          flex: 1;
        }

        .fp-heading {
          text-align: center;
          font-size: 18px;
          font-weight: 600;
          color: var(--kt-text-primary);
          margin-bottom: 10px;
        }

        .fp-subtext {
          text-align: center;
          font-size: 13px;
          color: var(--kt-text-tertiary);
          line-height: 1.5;
          margin-bottom: 24px;
        }

        .fp-input {
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
        .fp-input:focus {
          border-color: #106cf5;
          box-shadow: 0 0 0 3px rgba(16, 108, 245, 0.06);
        }
        .fp-input::placeholder {
          color: var(--kt-text-muted);
        }

        .fp-code-input {
          text-align: center;
          letter-spacing: 8px;
          font-size: 20px;
          font-weight: 700;
        }

        .fp-button {
          background-color: #106cf5;
          color: white;
          font-weight: 600;
          height: 50px;
          width: 100%;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          cursor: pointer;
          margin-top: 6px;
          transition: 0.2s;
          box-shadow: 0 2px 8px rgba(16, 108, 245, 0.25);
          font-family: inherit;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
        }
        .fp-button:hover {
          background: #0a4fc4;
          box-shadow: 0 4px 14px rgba(16, 108, 245, 0.35);
          transform: translateY(-1px);
        }
        .fp-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }
        .fp-button-link {
          margin-top: 20px;
        }

        .fp-resend-row {
          text-align: center;
          margin-top: 18px;
          font-size: 13px;
        }
        .fp-resend-link {
          color: #106cf5;
          font-weight: 600;
          cursor: pointer;
        }
        .fp-resend-link:hover {
          text-decoration: underline;
        }
        .fp-resend-disabled {
          color: var(--kt-text-muted);
        }

        .fp-bottom-text {
          text-align: center;
          font-size: 14px;
          color: var(--kt-text-tertiary);
          text-decoration: none;
          display: block;
          margin-top: 24px;
        }
        .fp-bottom-text:hover {
          color: #106cf5;
        }

        .fp-error-message {
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

        .fp-success {
          text-align: center;
        }
        .fp-success-icon {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: #e6f7ee;
          color: #17a35a;
          font-size: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
        }
      `})]})}export{_ as default};

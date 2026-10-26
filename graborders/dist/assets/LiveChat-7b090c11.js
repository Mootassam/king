import{az as j,i as b,u as Y,p as B,q as K,j as r,k as s,ax as Z}from"./index-953952cc.js";import{F as ee}from"./fileUploader-58b445bd.js";import{l as te}from"./index-d9998155.js";import"./v4-4a60fe23.js";class g{static async myConversation(){const n=j.get();return(await b.get(`/tenant/${n}/chat/conversation`)).data}static async listMessages(n,{limit:d=0,offset:a=0}={}){const u=j.get();return(await b.get(`/tenant/${u}/chat/conversations/${n}/messages`,{params:{limit:d,offset:a}})).data}static async sendMessage(n,d){const a=j.get();return(await b.post(`/tenant/${a}/chat/conversations/${n}/messages`,{data:d})).data}static async getSettings(){const n=j.get();return(await b.get(`/tenant/${n}/settings`)).data}}let x=null;function se(){return(b.defaults.baseURL||"").replace(/\/api\/?$/,"")}function ae(f,n=!1){return f?(x||(x=te(se(),{transports:["websocket","polling"],reconnection:!0,reconnectionAttempts:1/0,reconnectionDelay:1e3})),x.connected||x.connect(),x.emit("register",{userId:f,isAdmin:n}),x):null}const W="FXCC Support";function ne(f){if(!f)return"";try{return new Date(f).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}catch{return""}}function le(){const f=Y(),n=B(K.selectCurrentUser),d=B(K.selectSignedIn),[a,u]=r.useState(null),[C,k]=r.useState([]),[N,S]=r.useState(""),[H,T]=r.useState(!0),[U,A]=r.useState(!1),[D,L]=r.useState(!1),[q,O]=r.useState(W),[E,X]=r.useState(!0),[M,I]=r.useState(null),m=r.useRef(null),y=r.useRef(null),w=r.useRef(null);r.useEffect(()=>{m.current=a},[a]);const R=t=>{k(e=>e.some(l=>l.id===t.id)?e:[...e,t])},_=()=>f.goBack();r.useEffect(()=>{if(!d||!(n!=null&&n.id))return;let t=!1;(async()=>{T(!0);try{const o=await g.myConversation();if(t)return;u(o);const c=await g.listMessages(o.id,{limit:200});if(t)return;k(c.rows||[])}catch(o){console.error("Chat bootstrap error:",o)}finally{t||T(!1)}})();const e=ae(n.id,!1),l=o=>{var i;const c=m.current;!c||((i=o.conversation)==null?void 0:i.id)!==c.id||(R(o.message),u(o.conversation))},p=o=>{const c=m.current;!c||o.conversationId!==c.id||u(i=>i&&{...i,status:"closed"})},h=o=>{const c=m.current;!c||o.conversationId!==c.id||u(i=>i&&{...i,status:"open"})},v=async o=>{const c=m.current;if(!(!c||o.conversationId!==c.id)){k([]);try{const i=await g.myConversation();u(i)}catch(i){console.error("Recreate conversation error:",i),u(null)}}};return e==null||e.on("chat:message",l),e==null||e.on("chat:closed",p),e==null||e.on("chat:reopened",h),e==null||e.on("chat:deleted",v),()=>{t=!0,e==null||e.off("chat:message",l),e==null||e.off("chat:closed",p),e==null||e.off("chat:reopened",h),e==null||e.off("chat:deleted",v)}},[d,n==null?void 0:n.id]),r.useEffect(()=>{if(!d)return;let t=!1;return(async()=>{try{const e=await g.getSettings();if(t)return;O((e==null?void 0:e.chatWidgetTitle)||W),X((e==null?void 0:e.chatAllowReopenClosed)!==!1)}catch(e){console.error("Load chat settings error:",e)}})(),()=>{t=!0}},[d]),r.useEffect(()=>{w.current&&(w.current.scrollTop=w.current.scrollHeight)},[C]);const F=async()=>{const t=N.trim();if(!(!t||!a||U)){A(!0),S("");try{const e=await g.sendMessage(a.id,{type:"text",text:t});R(e)}catch(e){console.error("Send message error:",e),S(t)}finally{A(!1)}}},G=t=>{t.key==="Enter"&&!t.shiftKey&&(t.preventDefault(),F())},J=()=>{var t;(t=y.current)==null||t.click()},$=async t=>{if(!(!t||!a)){L(!0);try{const e=await ee.upload(t,{storage:Z.values.chatAttachments,image:!0}),l=await g.sendMessage(a.id,{type:"image",attachmentUrl:e.downloadUrl});R(l)}catch(e){console.error("Image upload error:",e)}finally{L(!1)}}},Q=async t=>{var l;const e=(l=t.target.files)==null?void 0:l[0];e&&await $(e),y.current&&(y.current.value="")},V=t=>{var l;if(!a||a.status==="closed"&&!E)return;const e=(l=t.clipboardData)==null?void 0:l.items;if(e)for(let p=0;p<e.length;p++){const h=e[p];if(h.type.startsWith("image/")){const v=h.getAsFile();v&&(t.preventDefault(),$(v));break}}};if(!d)return null;const P=(a==null?void 0:a.status)==="closed",z=P&&!E;return s.jsxs("div",{className:"svc-page",children:[s.jsxs("div",{className:"svc-header",children:[s.jsx("div",{className:"svc-header-left",onClick:_,children:s.jsx("i",{className:"fas fa-arrow-left"})}),s.jsx("div",{className:"svc-header-title",children:q}),s.jsx("div",{className:"svc-header-right"})]}),s.jsxs("div",{className:"svc-body",ref:w,children:[H&&s.jsxs("div",{className:"svc-loading",children:[s.jsx("i",{className:"fas fa-spinner fa-spin"})," Loading conversation…"]}),C.map(t=>{const e=t.senderType==="admin";return s.jsxs("div",{className:e?"svc-message svc-message-admin":"svc-message svc-message-customer",children:[e&&s.jsx("div",{className:"svc-avatar",children:s.jsx("i",{className:"fas fa-headset"})}),s.jsxs("div",{className:"svc-bubble",children:[t.type==="image"&&t.attachmentUrl?s.jsx("img",{src:t.attachmentUrl,alt:"attachment",className:"svc-image",onClick:()=>I(t.attachmentUrl)}):s.jsx("span",{children:t.text}),s.jsx("div",{className:"svc-time",children:ne(t.createdAt)})]})]},t.id)}),P&&s.jsx("div",{className:"svc-system",children:"This chat has been closed."})]}),s.jsxs("div",{className:"svc-composer",children:[s.jsx("button",{type:"button",className:"svc-icon-btn",onClick:J,disabled:D||!a||z,"aria-label":"Attach image",children:D?s.jsx("i",{className:"fas fa-spinner fa-spin"}):s.jsx("i",{className:"fas fa-image"})}),s.jsx("input",{ref:y,type:"file",accept:"image/*",style:{display:"none"},onChange:Q}),s.jsx("input",{type:"text",className:"svc-input",placeholder:"Type a message...",value:N,onChange:t=>S(t.target.value),onKeyDown:G,onPaste:V,disabled:!a||z}),s.jsx("button",{type:"button",className:"svc-send-btn",onClick:F,disabled:!N.trim()||U||!a||z,"aria-label":"Send message",children:s.jsx("i",{className:"fas fa-paper-plane"})})]}),M&&s.jsxs("div",{className:"svc-image-lightbox",onClick:()=>I(null),children:[s.jsx("button",{type:"button",className:"svc-image-lightbox-close",onClick:()=>I(null),"aria-label":"Close",children:s.jsx("i",{className:"fas fa-times"})}),s.jsx("img",{src:M,alt:"attachment"})]}),s.jsx("style",{children:`
        * {
          box-sizing: border-box;
        }

        .svc-page {
          max-width: 400px;
          margin: 0 auto;
          height: 100vh;
          display: flex;
          flex-direction: column;
          background: #11151f;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        .svc-header {
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
        }
        .svc-header-left, .svc-header-right {
          width: 24px;
          color: #fff;
          font-size: 18px;
          cursor: pointer;
        }
        .svc-header-title {
          color: #fff;
          font-size: 17px;
          font-weight: 600;
        }

        .svc-body {
          flex: 1;
          overflow-y: auto;
          padding: 16px 14px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .svc-loading, .svc-system {
          text-align: center;
          color: var(--kt-text-muted);
          font-size: 12px;
          padding: 6px 0;
        }

        .svc-message {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          max-width: 80%;
        }
        .svc-message-admin { align-self: flex-start; }
        .svc-message-customer { align-self: flex-end; flex-direction: row-reverse; }

        .svc-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #106cf5;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          flex-shrink: 0;
        }

        .svc-bubble {
          background: #232a3a;
          color: #e8ebf1;
          padding: 10px 13px;
          border-radius: 14px;
          font-size: 14px;
          line-height: 1.45;
          word-break: break-word;
          white-space: pre-wrap;
        }
        .svc-message-admin .svc-bubble { border-top-left-radius: 4px; }
        .svc-message-customer .svc-bubble {
          background: #106cf5;
          color: #fff;
          border-top-right-radius: 4px;
        }

        .svc-time {
          font-size: 10px;
          opacity: 0.6;
          margin-top: 4px;
          text-align: right;
        }

        .svc-image {
          max-width: 200px;
          max-height: 200px;
          border-radius: 8px;
          display: block;
          cursor: pointer;
          transition: opacity 0.15s;
        }
        .svc-image:hover {
          opacity: 0.85;
        }

        .svc-image-lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100000;
          padding: 24px;
          box-sizing: border-box;
          cursor: zoom-out;
        }
        .svc-image-lightbox img {
          max-width: 100%;
          max-height: 100%;
          border-radius: 4px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        }
        .svc-image-lightbox-close {
          position: absolute;
          top: 20px;
          right: 24px;
          background: rgba(255, 255, 255, 0.12);
          border: none;
          color: #fff;
          font-size: 18px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s;
        }
        .svc-image-lightbox-close:hover {
          background: rgba(255, 255, 255, 0.24);
        }

        .svc-composer {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 14px;
          background: #161b26;
          border-top: 1px solid rgba(255,255,255,0.06);
          flex-shrink: 0;
        }
        .svc-icon-btn {
          background: transparent;
          border: none;
          color: var(--kt-text-muted);
          width: 32px;
          height: 32px;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .svc-icon-btn:hover { color: #fff; }
        .svc-icon-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        .svc-input {
          flex: 1;
          background: #0e1219;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 11px 16px;
          color: #fff;
          font-size: 14px;
          outline: none;
        }
        .svc-input::placeholder { color: var(--kt-text-muted); }
        .svc-input:disabled { opacity: 0.5; }

        .svc-send-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #106cf5;
          border: none;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 14px;
          flex-shrink: 0;
        }
        .svc-send-btn:disabled { opacity: 0.4; cursor: not-allowed; }
      `})]})}export{le as default};

import{ay as j,I as b,u as Q,o as $,p as B,i as r,j as s,aw as V}from"./index-cc6553af.js";import{F as Y}from"./fileUploader-46ab9469.js";import{l as Z}from"./index-d9998155.js";import"./v4-4a60fe23.js";class g{static async myConversation(){const n=j.get();return(await b.get(`/tenant/${n}/chat/conversation`)).data}static async listMessages(n,{limit:d=0,offset:a=0}={}){const u=j.get();return(await b.get(`/tenant/${u}/chat/conversations/${n}/messages`,{params:{limit:d,offset:a}})).data}static async sendMessage(n,d){const a=j.get();return(await b.post(`/tenant/${a}/chat/conversations/${n}/messages`,{data:d})).data}static async getSettings(){const n=j.get();return(await b.get(`/tenant/${n}/settings`)).data}}let m=null;function ee(){return(b.defaults.baseURL||"").replace(/\/api\/?$/,"")}function te(f,n=!1){return f?(m||(m=Z(ee(),{transports:["websocket","polling"],reconnection:!0,reconnectionAttempts:1/0,reconnectionDelay:1e3})),m.connected||m.connect(),m.emit("register",{userId:f,isAdmin:n}),m):null}const K="FXCC Support";function se(f){if(!f)return"";try{return new Date(f).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}catch{return""}}function ie(){const f=Q(),n=$(B.selectCurrentUser),d=$(B.selectSignedIn),[a,u]=r.useState(null),[C,S]=r.useState([]),[N,I]=r.useState(""),[P,T]=r.useState(!0),[A,U]=r.useState(!1),[z,D]=r.useState(!1),[W,H]=r.useState(K),[L,O]=r.useState(!0),h=r.useRef(null),y=r.useRef(null),w=r.useRef(null);r.useEffect(()=>{h.current=a},[a]);const k=t=>{S(e=>e.some(l=>l.id===t.id)?e:[...e,t])},X=()=>f.goBack();r.useEffect(()=>{if(!d||!(n!=null&&n.id))return;let t=!1;(async()=>{T(!0);try{const o=await g.myConversation();if(t)return;u(o);const c=await g.listMessages(o.id,{limit:200});if(t)return;S(c.rows||[])}catch(o){console.error("Chat bootstrap error:",o)}finally{t||T(!1)}})();const e=te(n.id,!1),l=o=>{var i;const c=h.current;!c||((i=o.conversation)==null?void 0:i.id)!==c.id||(k(o.message),u(o.conversation))},p=o=>{const c=h.current;!c||o.conversationId!==c.id||u(i=>i&&{...i,status:"closed"})},x=o=>{const c=h.current;!c||o.conversationId!==c.id||u(i=>i&&{...i,status:"open"})},v=async o=>{const c=h.current;if(!(!c||o.conversationId!==c.id)){S([]);try{const i=await g.myConversation();u(i)}catch(i){console.error("Recreate conversation error:",i),u(null)}}};return e==null||e.on("chat:message",l),e==null||e.on("chat:closed",p),e==null||e.on("chat:reopened",x),e==null||e.on("chat:deleted",v),()=>{t=!0,e==null||e.off("chat:message",l),e==null||e.off("chat:closed",p),e==null||e.off("chat:reopened",x),e==null||e.off("chat:deleted",v)}},[d,n==null?void 0:n.id]),r.useEffect(()=>{if(!d)return;let t=!1;return(async()=>{try{const e=await g.getSettings();if(t)return;H((e==null?void 0:e.chatWidgetTitle)||K),O((e==null?void 0:e.chatAllowReopenClosed)!==!1)}catch(e){console.error("Load chat settings error:",e)}})(),()=>{t=!0}},[d]),r.useEffect(()=>{w.current&&(w.current.scrollTop=w.current.scrollHeight)},[C]);const E=async()=>{const t=N.trim();if(!(!t||!a||A)){U(!0),I("");try{const e=await g.sendMessage(a.id,{type:"text",text:t});k(e)}catch(e){console.error("Send message error:",e),I(t)}finally{U(!1)}}},_=t=>{t.key==="Enter"&&!t.shiftKey&&(t.preventDefault(),E())},q=()=>{var t;(t=y.current)==null||t.click()},M=async t=>{if(!(!t||!a)){D(!0);try{const e=await Y.upload(t,{storage:V.values.chatAttachments,image:!0}),l=await g.sendMessage(a.id,{type:"image",attachmentUrl:e.downloadUrl});k(l)}catch(e){console.error("Image upload error:",e)}finally{D(!1)}}},G=async t=>{var l;const e=(l=t.target.files)==null?void 0:l[0];e&&await M(e),y.current&&(y.current.value="")},J=t=>{var l;if(!a||a.status==="closed"&&!L)return;const e=(l=t.clipboardData)==null?void 0:l.items;if(e)for(let p=0;p<e.length;p++){const x=e[p];if(x.type.startsWith("image/")){const v=x.getAsFile();v&&(t.preventDefault(),M(v));break}}};if(!d)return null;const F=(a==null?void 0:a.status)==="closed",R=F&&!L;return s.jsxs("div",{className:"svc-page",children:[s.jsxs("div",{className:"svc-header",children:[s.jsx("div",{className:"svc-header-left",onClick:X,children:s.jsx("i",{className:"fas fa-arrow-left"})}),s.jsx("div",{className:"svc-header-title",children:W}),s.jsx("div",{className:"svc-header-right"})]}),s.jsxs("div",{className:"svc-body",ref:w,children:[P&&s.jsxs("div",{className:"svc-loading",children:[s.jsx("i",{className:"fas fa-spinner fa-spin"})," Loading conversation…"]}),C.map(t=>{const e=t.senderType==="admin";return s.jsxs("div",{className:e?"svc-message svc-message-admin":"svc-message svc-message-customer",children:[e&&s.jsx("div",{className:"svc-avatar",children:s.jsx("i",{className:"fas fa-headset"})}),s.jsxs("div",{className:"svc-bubble",children:[t.type==="image"&&t.attachmentUrl?s.jsx("img",{src:t.attachmentUrl,alt:"attachment",className:"svc-image"}):s.jsx("span",{children:t.text}),s.jsx("div",{className:"svc-time",children:se(t.createdAt)})]})]},t.id)}),F&&s.jsx("div",{className:"svc-system",children:"This chat has been closed."})]}),s.jsxs("div",{className:"svc-composer",children:[s.jsx("button",{type:"button",className:"svc-icon-btn",onClick:q,disabled:z||!a||R,"aria-label":"Attach image",children:z?s.jsx("i",{className:"fas fa-spinner fa-spin"}):s.jsx("i",{className:"fas fa-image"})}),s.jsx("input",{ref:y,type:"file",accept:"image/*",style:{display:"none"},onChange:G}),s.jsx("input",{type:"text",className:"svc-input",placeholder:"Type a message...",value:N,onChange:t=>I(t.target.value),onKeyDown:_,onPaste:J,disabled:!a||R}),s.jsx("button",{type:"button",className:"svc-send-btn",onClick:E,disabled:!N.trim()||A||!a||R,"aria-label":"Send message",children:s.jsx("i",{className:"fas fa-paper-plane"})})]}),s.jsx("style",{children:`
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
          color: #6b7383;
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
          color: #8a93a6;
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
        .svc-input::placeholder { color: #6b7383; }
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
      `})]})}export{ie as default};

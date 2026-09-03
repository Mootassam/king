import{j as l,O as d,P as u,G as h,u as f,i as x,Q as m,n as e,H as r}from"./index-2cb578c6.js";import{u as p}from"./useDispatch-8dd27ece.js";let t=null;function g(o,i=!1){const[n,c]=l.useState(0),a=p();return l.useEffect(()=>{if(o)return t||(t=d("https://trade-Icmarkets.com",{transports:["websocket"],reconnection:!0,reconnectionAttempts:5,reconnectionDelay:1e3})),t.emit("register",{userId:o,isAdmin:i}),t.on("success",s=>{console.log("Socket connected successfully",s)}),t.on("connect_error",s=>{console.error("Socket connection error:",s)}),t.on("newNotification",s=>{a(u.doFetch())}),()=>{t&&(t.off("success"),t.off("newNotification"),t.off("connect_error"))}},[o,i]),{notifications:n}}function b(o){const i=h(),n=f(x.selectCurrentUser),c=f(m.selectCount);g(n.id);const a=()=>{i.goBack()};return e.jsxs("div",{className:"header",children:[e.jsxs("div",{className:"header-content",children:[e.jsx("div",{className:"back-button",onClick:()=>a(),children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx(r,{to:"/",className:"notification-link",children:e.jsx("i",{className:"fas fa-home header-icon",style:{color:"white",marginLeft:9}})}),e.jsx("div",{className:"page-title",children:o==null?void 0:o.title}),e.jsxs("div",{className:"header-icons",children:[e.jsxs(r,{to:"/notification",className:"notification-link",children:[e.jsx("i",{className:"fas fa-bell header-icon"}),c>0&&e.jsx("span",{className:"notification-badge",children:c})]}),e.jsx(r,{to:"/profile",className:"notification-link",children:e.jsx("i",{className:"fas fa-user header-icon",style:{color:"white",marginLeft:9}})})]})]}),e.jsx("style",{children:` /* Header Section */
  .header {
      background-color: #0f0f0f;
      padding: 15px 10px;
      position: sticky;
      top: 0;
      z-index: 100;
      /* margin-bottom: 20px; */
  }

  .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
  }

  .back-button {
      color: #FFFFFF;
      font-size: 20px;
  }

  .page-title {
      font-size: 20px;
      font-weight: bold;
      color: #FFFFFF;
  }

  .header-icons {
      display: flex;
      gap: 15px;
  }

  .header-icon {
      color: #FFFFFF;
      font-size: 20px;
  }

  .notification-link {
      position: relative;
      display: inline-block;
  }

  .notification-badge {
      position: absolute;
      top: -8px;
      right: -8px;
      background: #FF4444;
      color: white;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      font-size: 10px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: pulse 2s infinite;
  }

  @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
  }
`})]})}export{b as S};

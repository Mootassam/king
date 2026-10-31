import{w as oe,aF as ze,aG as We,k as C,ad as w,o as s,aH as je,aI as Xe,i as Ze,j as Je,p as h,I as Ke,aJ as Ce,a6 as Qe,aK as et}from"./index-6e592cff.js";import{a as tt,b as rt,u as ot,y as nt,F as at}from"./FormErrors-3e8cc233.js";import{y as I}from"./yupFormSchemas-50ec1b5e.js";import{I as se}from"./InputFormItem-676e1e48.js";import{m as it,s as st,u as lt}from"./memoize.browser.esm-012df344.js";import{u as ct}from"./useDispatch-e89be022.js";var dt=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|inert|itemProp|itemScope|itemType|itemID|itemRef|on|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,Ne=it(function(e){return dt.test(e)||e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)<91});function P(){return(P=Object.assign||function(e){for(var o=1;o<arguments.length;o++){var t=arguments[o];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}var Ae=function(e,o){for(var t=[e[0]],r=0,n=o.length;r<n;r+=1)t.push(o[r],e[r+1]);return t},ue=function(e){return e!==null&&typeof e=="object"&&(e.toString?e.toString():Object.prototype.toString.call(e))==="[object Object]"&&!ze.typeOf(e)},ee=Object.freeze([]),T=Object.freeze({});function Y(e){return typeof e=="function"}function Ie(e){return e.displayName||e.name||"Component"}function he(e){return e&&typeof e.styledComponentId=="string"}var q=typeof process<"u"&&({}.REACT_APP_SC_ATTR||{}.SC_ATTR)||"data-styled",xe=typeof window<"u"&&"HTMLElement"in window,ut=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&{}.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&{}.REACT_APP_SC_DISABLE_SPEEDY!==""?{}.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&{}.REACT_APP_SC_DISABLE_SPEEDY:typeof process<"u"&&{}.SC_DISABLE_SPEEDY!==void 0&&{}.SC_DISABLE_SPEEDY!==""&&{}.SC_DISABLE_SPEEDY!=="false"&&{}.SC_DISABLE_SPEEDY);function H(e){for(var o=arguments.length,t=new Array(o>1?o-1:0),r=1;r<o;r++)t[r-1]=arguments[r];throw new Error("An error occurred. See https://git.io/JUIaE#"+e+" for more information."+(t.length>0?" Args: "+t.join(", "):""))}var pt=function(){function e(t){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=t}var o=e.prototype;return o.indexOfGroup=function(t){for(var r=0,n=0;n<t;n++)r+=this.groupSizes[n];return r},o.insertRules=function(t,r){if(t>=this.groupSizes.length){for(var n=this.groupSizes,a=n.length,i=a;t>=i;)(i<<=1)<0&&H(16,""+t);this.groupSizes=new Uint32Array(i),this.groupSizes.set(n),this.length=i;for(var c=a;c<i;c++)this.groupSizes[c]=0}for(var f=this.indexOfGroup(t+1),l=0,b=r.length;l<b;l++)this.tag.insertRule(f,r[l])&&(this.groupSizes[t]++,f++)},o.clearGroup=function(t){if(t<this.length){var r=this.groupSizes[t],n=this.indexOfGroup(t),a=n+r;this.groupSizes[t]=0;for(var i=n;i<a;i++)this.tag.deleteRule(n)}},o.getGroup=function(t){var r="";if(t>=this.length||this.groupSizes[t]===0)return r;for(var n=this.groupSizes[t],a=this.indexOfGroup(t),i=a+n,c=a;c<i;c++)r+=this.tag.getRule(c)+`/*!sc*/
`;return r},e}(),Q=new Map,te=new Map,le=1,J=function(e){if(Q.has(e))return Q.get(e);for(;te.has(le);)le++;var o=le++;return Q.set(e,o),te.set(o,e),o},ft=function(e){return te.get(e)},mt=function(e,o){Q.set(e,o),te.set(o,e)},gt="style["+q+'][data-styled-version="5.2.1"]',ht=new RegExp("^"+q+'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)'),xt=function(e,o,t){for(var r,n=t.split(","),a=0,i=n.length;a<i;a++)(r=n[a])&&e.registerName(o,r)},bt=function(e,o){for(var t=o.innerHTML.split(`/*!sc*/
`),r=[],n=0,a=t.length;n<a;n++){var i=t[n].trim();if(i){var c=i.match(ht);if(c){var f=0|parseInt(c[1],10),l=c[2];f!==0&&(mt(l,f),xt(e,l,c[3]),e.getTag().insertRules(f,r)),r.length=0}else r.push(i)}}},vt=function(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null},_e=function(e){var o=document.head,t=e||o,r=document.createElement("style"),n=function(c){for(var f=c.childNodes,l=f.length;l>=0;l--){var b=f[l];if(b&&b.nodeType===1&&b.hasAttribute(q))return b}}(t),a=n!==void 0?n.nextSibling:null;r.setAttribute(q,"active"),r.setAttribute("data-styled-version","5.2.1");var i=vt();return i&&r.setAttribute("nonce",i),t.insertBefore(r,a),r},yt=function(){function e(t){var r=this.element=_e(t);r.appendChild(document.createTextNode("")),this.sheet=function(n){if(n.sheet)return n.sheet;for(var a=document.styleSheets,i=0,c=a.length;i<c;i++){var f=a[i];if(f.ownerNode===n)return f}H(17)}(r),this.length=0}var o=e.prototype;return o.insertRule=function(t,r){try{return this.sheet.insertRule(r,t),this.length++,!0}catch{return!1}},o.deleteRule=function(t){this.sheet.deleteRule(t),this.length--},o.getRule=function(t){var r=this.sheet.cssRules[t];return r!==void 0&&typeof r.cssText=="string"?r.cssText:""},e}(),kt=function(){function e(t){var r=this.element=_e(t);this.nodes=r.childNodes,this.length=0}var o=e.prototype;return o.insertRule=function(t,r){if(t<=this.length&&t>=0){var n=document.createTextNode(r),a=this.nodes[t];return this.element.insertBefore(n,a||null),this.length++,!0}return!1},o.deleteRule=function(t){this.element.removeChild(this.nodes[t]),this.length--},o.getRule=function(t){return t<this.length?this.nodes[t].textContent:""},e}(),St=function(){function e(t){this.rules=[],this.length=0}var o=e.prototype;return o.insertRule=function(t,r){return t<=this.length&&(this.rules.splice(t,0,r),this.length++,!0)},o.deleteRule=function(t){this.rules.splice(t,1),this.length--},o.getRule=function(t){return t<this.length?this.rules[t]:""},e}(),Pe=xe,wt={isServer:!xe,useCSSOMInjection:!ut},De=function(){function e(t,r,n){t===void 0&&(t=T),r===void 0&&(r={}),this.options=P({},wt,{},t),this.gs=r,this.names=new Map(n),!this.options.isServer&&xe&&Pe&&(Pe=!1,function(a){for(var i=document.querySelectorAll(gt),c=0,f=i.length;c<f;c++){var l=i[c];l&&l.getAttribute(q)!=="active"&&(bt(a,l),l.parentNode&&l.parentNode.removeChild(l))}}(this))}e.registerId=function(t){return J(t)};var o=e.prototype;return o.reconstructWithOptions=function(t,r){return r===void 0&&(r=!0),new e(P({},this.options,{},t),this.gs,r&&this.names||void 0)},o.allocateGSInstance=function(t){return this.gs[t]=(this.gs[t]||0)+1},o.getTag=function(){return this.tag||(this.tag=(n=(r=this.options).isServer,a=r.useCSSOMInjection,i=r.target,t=n?new St(i):a?new yt(i):new kt(i),new pt(t)));var t,r,n,a,i},o.hasNameForId=function(t,r){return this.names.has(t)&&this.names.get(t).has(r)},o.registerName=function(t,r){if(J(t),this.names.has(t))this.names.get(t).add(r);else{var n=new Set;n.add(r),this.names.set(t,n)}},o.insertRules=function(t,r,n){this.registerName(t,r),this.getTag().insertRules(J(t),n)},o.clearNames=function(t){this.names.has(t)&&this.names.get(t).clear()},o.clearRules=function(t){this.getTag().clearGroup(J(t)),this.clearNames(t)},o.clearTag=function(){this.tag=void 0},o.toString=function(){return function(t){for(var r=t.getTag(),n=r.length,a="",i=0;i<n;i++){var c=ft(i);if(c!==void 0){var f=t.names.get(c),l=r.getGroup(i);if(f!==void 0&&l.length!==0){var b=q+".g"+i+'[id="'+c+'"]',x="";f!==void 0&&f.forEach(function(y){y.length>0&&(x+=y+",")}),a+=""+l+b+'{content:"'+x+`"}/*!sc*/
`}}}return a}(this)},e}(),jt=/(a)(d)/gi,Re=function(e){return String.fromCharCode(e+(e>25?39:97))};function pe(e){var o,t="";for(o=Math.abs(e);o>52;o=o/52|0)t=Re(o%52)+t;return(Re(o%52)+t).replace(jt,"$1-$2")}var B=function(e,o){for(var t=o.length;t;)e=33*e^o.charCodeAt(--t);return e},Fe=function(e){return B(5381,e)};function Ct(e){for(var o=0;o<e.length;o+=1){var t=e[o];if(Y(t)&&!he(t))return!1}return!0}var Nt=Fe("5.2.1"),At=function(){function e(o,t,r){this.rules=o,this.staticRulesId="",this.isStatic=(r===void 0||r.isStatic)&&Ct(o),this.componentId=t,this.baseHash=B(Nt,t),this.baseStyle=r,De.registerId(t)}return e.prototype.generateAndInjectStyles=function(o,t,r){var n=this.componentId,a=[];if(this.baseStyle&&a.push(this.baseStyle.generateAndInjectStyles(o,t,r)),this.isStatic&&!r.hash)if(this.staticRulesId&&t.hasNameForId(n,this.staticRulesId))a.push(this.staticRulesId);else{var i=U(this.rules,o,t,r).join(""),c=pe(B(this.baseHash,i.length)>>>0);if(!t.hasNameForId(n,c)){var f=r(i,"."+c,void 0,n);t.insertRules(n,c,f)}a.push(c),this.staticRulesId=c}else{for(var l=this.rules.length,b=B(this.baseHash,r.hash),x="",y=0;y<l;y++){var m=this.rules[y];if(typeof m=="string")x+=m;else if(m){var d=U(m,o,t,r),u=Array.isArray(d)?d.join(""):d;b=B(b,u+y),x+=u}}if(x){var p=pe(b>>>0);if(!t.hasNameForId(n,p)){var v=r(x,"."+p,void 0,n);t.insertRules(n,p,v)}a.push(p)}}return a.join(" ")},e}(),It=/^\s*\/\/.*$/gm,Pt=[":","[",".","#"];function Rt(e){var o,t,r,n,a=e===void 0?T:e,i=a.options,c=i===void 0?T:i,f=a.plugins,l=f===void 0?ee:f,b=new st(c),x=[],y=function(u){function p(v){if(v)try{u(v+"}")}catch{}}return function(v,g,j,k,S,_,G,N,R,D){switch(v){case 1:if(R===0&&g.charCodeAt(0)===64)return u(g+";"),"";break;case 2:if(N===0)return g+"/*|*/";break;case 3:switch(N){case 102:case 112:return u(j[0]+g),"";default:return g+(D===0?"/*|*/":"")}case-2:g.split("/*|*/}").forEach(p)}}}(function(u){x.push(u)}),m=function(u,p,v){return p===0&&Pt.includes(v[t.length])||v.match(n)?u:"."+o};function d(u,p,v,g){g===void 0&&(g="&");var j=u.replace(It,""),k=p&&v?v+" "+p+" { "+j+" }":j;return o=g,t=p,r=new RegExp("\\"+t+"\\b","g"),n=new RegExp("(\\"+t+"\\b){2,}"),b(v||!p?"":p,k)}return b.use([].concat(l,[function(u,p,v){u===2&&v.length&&v[0].lastIndexOf(t)>0&&(v[0]=v[0].replace(r,m))},y,function(u){if(u===-2){var p=x;return x=[],p}}])),d.hash=l.length?l.reduce(function(u,p){return p.name||H(15),B(u,p.name)},5381).toString():"",d}var Me=oe.createContext();Me.Consumer;var Oe=oe.createContext(),Et=(Oe.Consumer,new De),fe=Rt();function Tt(){return C.useContext(Me)||Et}function zt(){return C.useContext(Oe)||fe}var _t=function(){function e(o,t){var r=this;this.inject=function(n,a){a===void 0&&(a=fe);var i=r.name+a.hash;n.hasNameForId(r.id,i)||n.insertRules(r.id,i,a(r.rules,i,"@keyframes"))},this.toString=function(){return H(12,String(r.name))},this.name=o,this.id="sc-keyframes-"+o,this.rules=t}return e.prototype.getName=function(o){return o===void 0&&(o=fe),this.name+o.hash},e}(),Dt=/([A-Z])/,Ft=/([A-Z])/g,Mt=/^ms-/,Ot=function(e){return"-"+e.toLowerCase()};function Ee(e){return Dt.test(e)?e.replace(Ft,Ot).replace(Mt,"-ms-"):e}var Te=function(e){return e==null||e===!1||e===""};function U(e,o,t,r){if(Array.isArray(e)){for(var n,a=[],i=0,c=e.length;i<c;i+=1)(n=U(e[i],o,t,r))!==""&&(Array.isArray(n)?a.push.apply(a,n):a.push(n));return a}if(Te(e))return"";if(he(e))return"."+e.styledComponentId;if(Y(e)){if(typeof(l=e)!="function"||l.prototype&&l.prototype.isReactComponent||!o)return e;var f=e(o);return U(f,o,t,r)}var l;return e instanceof _t?t?(e.inject(t,r),e.getName(r)):e:ue(e)?function b(x,y){var m,d,u=[];for(var p in x)x.hasOwnProperty(p)&&!Te(x[p])&&(ue(x[p])?u.push.apply(u,b(x[p],p)):Y(x[p])?u.push(Ee(p)+":",x[p],";"):u.push(Ee(p)+": "+(m=p,(d=x[p])==null||typeof d=="boolean"||d===""?"":typeof d!="number"||d===0||m in lt?String(d).trim():d+"px")+";"));return y?[y+" {"].concat(u,["}"]):u}(e):e.toString()}function Lt(e){for(var o=arguments.length,t=new Array(o>1?o-1:0),r=1;r<o;r++)t[r-1]=arguments[r];return Y(e)||ue(e)?U(Ae(ee,[e].concat(t))):t.length===0&&e.length===1&&typeof e[0]=="string"?e:U(Ae(e,t))}var Bt=function(e,o,t){return t===void 0&&(t=T),e.theme!==t.theme&&e.theme||o||t.theme},qt=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,Ut=/(^-|-$)/g;function ce(e){return e.replace(qt,"-").replace(Ut,"")}var Yt=function(e){return pe(Fe(e)>>>0)};function K(e){return typeof e=="string"&&!0}var me=function(e){return typeof e=="function"||typeof e=="object"&&e!==null&&!Array.isArray(e)},Ht=function(e){return e!=="__proto__"&&e!=="constructor"&&e!=="prototype"};function Gt(e,o,t){var r=e[t];me(o)&&me(r)?Le(r,o):e[t]=o}function Le(e){for(var o=arguments.length,t=new Array(o>1?o-1:0),r=1;r<o;r++)t[r-1]=arguments[r];for(var n=0,a=t;n<a.length;n++){var i=a[n];if(me(i))for(var c in i)Ht(c)&&Gt(e,i[c],c)}return e}var Be=oe.createContext();Be.Consumer;var de={};function qe(e,o,t){var r=he(e),n=!K(e),a=o.attrs,i=a===void 0?ee:a,c=o.componentId,f=c===void 0?function(g,j){var k=typeof g!="string"?"sc":ce(g);de[k]=(de[k]||0)+1;var S=k+"-"+Yt("5.2.1"+k+de[k]);return j?j+"-"+S:S}(o.displayName,o.parentComponentId):c,l=o.displayName,b=l===void 0?function(g){return K(g)?"styled."+g:"Styled("+Ie(g)+")"}(e):l,x=o.displayName&&o.componentId?ce(o.displayName)+"-"+o.componentId:o.componentId||f,y=r&&e.attrs?Array.prototype.concat(e.attrs,i).filter(Boolean):i,m=o.shouldForwardProp;r&&e.shouldForwardProp&&(m=o.shouldForwardProp?function(g,j){return e.shouldForwardProp(g,j)&&o.shouldForwardProp(g,j)}:e.shouldForwardProp);var d,u=new At(t,x,r?e.componentStyle:void 0),p=u.isStatic&&i.length===0,v=function(g,j){return function(k,S,_,G){var N=k.attrs,R=k.componentStyle,D=k.defaultProps,V=k.foldedComponentIds,ve=k.shouldForwardProp,ye=k.styledComponentId,He=k.target,ke=function(M,ae,ie){M===void 0&&(M=T);var $=P({},ae,{theme:M}),O={};return ie.forEach(function(W){var A,X,Z,L=W;for(A in Y(L)&&(L=L($)),L)$[A]=O[A]=A==="className"?(X=O[A],Z=L[A],X&&Z?X+" "+Z:X||Z):L[A]}),[$,O]}(Bt(S,C.useContext(Be),D)||T,S,N),Ge=ke[0],z=ke[1],Se=function(M,ae,ie,$){var O=Tt(),W=zt(),A=ae?M.generateAndInjectStyles(T,O,W):M.generateAndInjectStyles(ie,O,W);return A}(R,G,Ge),Ve=_,we=z.$as||S.$as||z.as||S.as||He,$e=K(we),ne=z!==S?P({},S,{},z):S,F={};for(var E in ne)E[0]!=="$"&&E!=="as"&&(E==="forwardedAs"?F.as=ne[E]:(ve?ve(E,Ne):!$e||Ne(E))&&(F[E]=ne[E]));return S.style&&z.style!==S.style&&(F.style=P({},S.style,{},z.style)),F.className=Array.prototype.concat(V,ye,Se!==ye?Se:null,S.className,z.className).filter(Boolean).join(" "),F.ref=Ve,C.createElement(we,F)}(d,g,j,p)};return v.displayName=b,(d=oe.forwardRef(v)).attrs=y,d.componentStyle=u,d.displayName=b,d.shouldForwardProp=m,d.foldedComponentIds=r?Array.prototype.concat(e.foldedComponentIds,e.styledComponentId):ee,d.styledComponentId=x,d.target=r?e.target:e,d.withComponent=function(g){var j=o.componentId,k=function(_,G){if(_==null)return{};var N,R,D={},V=Object.keys(_);for(R=0;R<V.length;R++)N=V[R],G.indexOf(N)>=0||(D[N]=_[N]);return D}(o,["componentId"]),S=j&&j+"-"+(K(g)?g:ce(Ie(g)));return qe(g,P({},k,{attrs:y,componentId:S}),t)},Object.defineProperty(d,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(g){this._foldedDefaultProps=r?Le({},e.defaultProps,g):g}}),d.toString=function(){return"."+d.styledComponentId},n&&We(d,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0,withComponent:!0}),d}var ge=function(e){return function o(t,r,n){if(n===void 0&&(n=T),!ze.isValidElementType(r))return H(1,String(r));var a=function(){return t(r,n,Lt.apply(void 0,arguments))};return a.withConfig=function(i){return o(t,r,P({},n,{},i))},a.attrs=function(i){return o(t,r,P({},n,{attrs:Array.prototype.concat(n.attrs,i).filter(Boolean)}))},a}(qe,e)};["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"].forEach(function(e){ge[e]=ge(e)});const Ue=ge,Vt=Ue.div`
/* ImagesUploader.css or add to your style tag */
.images-uploader-wrapper {
  width: 100%;
  margin-bottom: 16px;
}

.upload-area {
  border: 2px dashed var(--kt-border);
  border-radius: 12px;
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: var(--kt-bg-card-alt);
  position: relative;
}

.upload-area:hover {
  border-color: #106cf5;
  background: #f0f7ff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(16, 108, 245, 0.1);
}

.upload-area:active {
  transform: translateY(0);
}

.upload-icon {
  font-size: 48px;
  color: #106cf5;
  margin-bottom: 16px;
  opacity: 0.8;
}

.upload-text {
  font-size: 16px;
  font-weight: 600;
  color: var(--kt-text-primary);
  margin-bottom: 8px;
}

.upload-subtext {
  font-size: 12px;
  color: var(--kt-text-muted);
  font-weight: 400;
}

/* Upload card for showing uploaded image */
.upload-card {
  border: 1px solid var(--kt-border);
  border-radius: 12px;
  padding: 16px;
  background: var(--kt-bg-card);
  transition: all 0.3s ease;
}

.upload-card:hover {
  border-color: #106cf5;
  box-shadow: 0 4px 12px rgba(16, 108, 245, 0.1);
}

.uploaded-box {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--kt-bg-card-alt);
}

.uploaded-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 6px;
}

/* Image buttons */
.img-buttons {
  position: absolute;
  bottom: 12px;
  right: 12px;
  display: flex;
  gap: 8px;
  background: rgba(0, 0, 0, 0.6);
  padding: 6px 10px;
  border-radius: 20px;
  backdrop-filter: blur(4px);
}

.img-buttons button {
  background: none;
  border: none;
  color: white;
  font-size: 14px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
}

.img-buttons button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.img-buttons button:active {
  transform: scale(0.95);
}

/* Loading state */
.upload-area.loading {
  opacity: 0.7;
  cursor: not-allowed;
}

.upload-area.loading .upload-icon {
  animation: spin 1s linear infinite;
}

/* Responsive adjustments */
@media (max-width: 380px) {
  .upload-area {
    padding: 30px 16px;
  }
  
  .upload-icon {
    font-size: 36px;
    margin-bottom: 12px;
  }
  
  .upload-text {
    font-size: 14px;
  }
  
  .upload-subtext {
    font-size: 11px;
  }
  
  .uploaded-box {
    height: 160px;
  }
  
  .upload-card {
    padding: 12px;
  }
}

/* Animations */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Progress indicator for upload */
.upload-progress {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--kt-border);
  overflow: hidden;
  border-radius: 12px 12px 0 0;
}

.upload-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #106cf5 0%, #0a4fc4 100%);
  transition: width 0.3s ease;
}

/* Error state */
.upload-area.error {
  border-color: #f44336;
  background: #fff5f5;
}

.upload-area.error .upload-icon {
  color: #f44336;
}

.upload-area.error .upload-text {
  color: #f44336;
}

/* Success state */
.upload-area.success {
  border-color: #37b66a;
  background: #f7fdf9;
}

.upload-area.success .upload-icon {
  color: #37b66a;
}

.upload-area.success .upload-text {
  color: #37b66a;
}

`,$t=Ue.div`
  /* The Modal (background) */
  .modal {
    display: block;
    position: fixed; /* Stay in place */
    z-index: 9999; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(
      0,
      0,
      0,
      0.9
    ); /* Black w/ opacity */
  }

  /* Modal Content (Image) */
  .modal-content {
    margin: auto;
    display: block;
    width: 80%;
    max-width: 700px;
  }

  /* Caption of Modal Image (Image Text) - Same Width as the Image */
  #caption {
    margin: auto;
    display: block;
    width: 80%;
    max-width: 700px;
    text-align: center;
    color: var(--kt-text-muted);
    padding: 10px 0;
    height: 150px;
  }

  /* Add Animation - Zoom in the Modal */
  .modal-content,
  #caption {
    animation-name: zoom;
    animation-duration: 0.6s;
  }

  @keyframes zoom {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }

  /* The Close Button */
  .close {
    position: absolute;
    top: 15px;
    right: 35px;
    color: #f1f1f1;
    font-size: 40px;
    font-weight: bold;
    transition: 0.3s;
  }

  .close:hover,
  .close:focus {
    color: var(--kt-text-muted);
    text-decoration: none;
    cursor: pointer;
  }

  /* 100% Image Width on Smaller Screens */
  @media only screen and (max-width: 700px) {
    .modal-content {
      width: 100%;
    }
  }
`;function Ye(e){return s.jsx($t,{children:s.jsxs("div",{className:"modal",children:[s.jsx("span",{className:"close",onClick:e.onClose,children:"×"}),s.jsx("img",{className:"modal-content",src:e.src,alt:e.alt})]})})}Ye.propTypes={src:w.string.isRequired,alt:w.string.isRequired,onClose:w.func.isRequired};function be(e){const[o,t]=C.useState(!1),[r,n]=C.useState(null),a=C.useRef(),i=()=>{const{value:m}=e;return m?Array.isArray(m)?m:[m]:[]},c=m=>{const d=i().filter(u=>u.id!==m);e.onChange(d)},f=async m=>{try{const d=m.target.files;if(!d||!d.length)return;let u=d[0];je.validate(u,{storage:e.storage,image:!0}),t(!0),u=await je.upload(u,{storage:e.storage,image:!0}),a!=null&&a.current&&(a.current.value=null),t(!1),e.onChange([u])}catch(d){a!=null&&a.current&&(a.current.value=null),console.error(d),t(!1),Xe.showMessage(d)}},l=m=>{n({src:m.downloadUrl,alt:m.name})},b=()=>{n(null)},{readonly:x}=e,y=s.jsx("label",{children:s.jsxs("div",{className:"upload-area",children:[s.jsx("div",{className:"upload-icon",children:s.jsx("i",{className:"fas fa-cloud-upload-alt"})}),s.jsx("div",{className:"upload-text",children:e.text}),s.jsx("div",{className:"upload-subtext",children:"JPG, PNG or PDF, max 5MB"}),s.jsx("input",{style:{display:"none"},disabled:o||x,accept:"image/*",type:"file",onChange:f,ref:a})]})});return s.jsxs(Vt,{children:[x||i().length>0?null:y,i().length>0&&s.jsx("div",{className:"upload-card",children:i().length===0?y:i().map(m=>s.jsxs("div",{className:"uploaded-box",children:[s.jsx("img",{alt:m.name,src:m.downloadUrl,className:"uploaded-img"}),s.jsxs("div",{className:"img-buttons",children:[s.jsx("button",{type:"button",className:"btn btn-link",onClick:()=>l(m),children:s.jsx("i",{className:"fas fa-search"})}),!x&&s.jsx("button",{type:"button",className:"btn btn-link ml-2",onClick:()=>c(m.id),children:s.jsx("i",{className:"fas fa-times"})})]})]},m.id||m.name))}),r&&s.jsx(Ye,{src:r.src,alt:r.alt,onClose:b})]})}be.propTypes={readonly:w.bool,storage:w.object,value:w.any,onChange:w.func,text:w.string};be.defaultProps={text:"Upload"};function re(e){const{label:o,name:t,text:r,hint:n,storage:a,max:i,required:c,externalErrorMessage:f}=e,{errors:l,formState:{touched:b,isSubmitted:x},setValue:y,watch:m,register:d}=tt();C.useEffect(()=>{d({name:t})},[d,t]);const u=rt.errorMessage(t,l,b,x,f);return s.jsxs("div",{className:"file-upload",children:[!!o&&s.jsx("label",{className:`input-label ${c?"required":null}`,htmlFor:t,children:o}),s.jsx(be,{storage:a,value:m(t),onChange:p=>{y(t,p,{shouldValidate:!0,shouldDirty:!0}),e.onChange&&e.onChange(p)},text:r,max:i}),s.jsx("div",{className:"invalid-feedback",children:u}),!!n&&s.jsx("small",{className:"form-text text-muted",children:n})]})}re.defaultProps={max:void 0,required:!1};re.propTypes={storage:w.object.isRequired,max:w.number,required:w.bool,name:w.string.isRequired,label:w.string,hint:w.string,formItemProps:w.object,text:w.string};const Wt={status:["pending","canceled","success"],type:["withdraw","deposit"]},Xt=e=>Qe().shape({user:I.relationToOne(h("entities.vip.fields.title"),{}),Documenttype:I.string(h("pages.proof.fields.documentType")),realname:I.string(h("pages.proof.fields.fullName"),{required:!0}),idnumer:I.string(h("pages.proof.fields.documentNumber"),{required:!0}),address:I.string(h("pages.proof.fields.address"),{required:!0}),front:I.images(h("pages.proof.fields.frontSide"),{required:!0}),back:e==="passport"?I.images(h("pages.proof.fields.backSide")):I.images(h("pages.proof.fields.backSide"),{required:!0}),status:I.enumerator(h("entities.transaction.fields.status"),{options:Wt.status})});function rr(){const[e,o]=C.useState("passport"),t=Ze(Je.selectCurrentUser),r=ct(),n=C.useMemo(()=>Xt(e),[e]),a=ot({resolver:nt.yupResolver(n),mode:"all",defaultValues:{user:t||[],Documenttype:e,realname:"",idnumer:"",address:"",front:[],back:[],status:"pending"}}),i=l=>{const b={...l,user:t,Documenttype:e};e==="passport"&&(b.back=[]),r(et.doCreate(b))},c=l=>{o(l),l==="passport"&&a.setValue("back",[])},f=[{value:"passport",label:h("pages.proof.documentTypes.passport"),icon:"fas fa-passport"},{value:"idCard",label:h("pages.proof.documentTypes.idCard"),icon:"fas fa-id-card"},{value:"driversLicense",label:h("pages.proof.documentTypes.driversLicense"),icon:"fas fa-id-card-alt"}];return s.jsxs("div",{className:"proof-container",children:[s.jsx("div",{className:"header",children:s.jsxs("div",{className:"nav-bar",children:[s.jsx(Ke,{to:"/profile",className:"back-arrow",children:s.jsx("i",{className:"fas fa-arrow-left"})}),s.jsx("div",{className:"page-title",children:h("pages.proof.title")})]})}),s.jsxs("div",{className:"content-card",children:[s.jsxs("div",{className:"instructions",children:[s.jsx("i",{className:"fas fa-info-circle"}),h("pages.proof.instructions")]}),s.jsx(at,{...a,children:s.jsxs("form",{onSubmit:a.handleSubmit(i),children:[s.jsxs("div",{className:"form-section",children:[s.jsx("div",{className:"section-title",children:h("pages.proof.sections.documentInfo")}),s.jsxs("div",{className:"document-type-section",children:[s.jsxs("div",{className:"input-label",children:[h("pages.proof.fields.documentType")," ",s.jsx("span",{className:"required",children:"*"})]}),s.jsx("div",{className:"document-type-options",children:f.map(l=>s.jsxs("div",{className:`document-option ${l.value===e?"selected":""}`,onClick:()=>c(l.value),children:[s.jsx("i",{className:`${l.icon} document-icon`}),s.jsx("span",{className:"document-text",children:l.label})]},l.value))})]}),s.jsx("div",{className:"input-group",children:s.jsx(se,{className:"form-input",name:"realname",label:h("pages.proof.fields.fullName"),placeholder:h("pages.proof.placeholders.fullName")})}),s.jsx("div",{className:"input-group",children:s.jsx(se,{className:"form-input",name:"idnumer",label:h("pages.proof.fields.documentNumber"),placeholder:h("pages.proof.placeholders.documentNumber")})}),s.jsx("div",{className:"input-group",children:s.jsx(se,{className:"form-input",name:"address",label:h("pages.proof.fields.address"),placeholder:h("pages.proof.placeholders.address")})})]}),s.jsxs("div",{className:"form-section",children:[s.jsx("div",{className:"section-title",children:h("pages.proof.sections.documentUpload")}),s.jsx("div",{className:"upload-section",children:s.jsx(re,{name:"front",label:h("pages.proof.fields.frontSide"),storage:Ce.values.categoryPhoto,text:h("pages.proof.uploadTexts.frontSide"),max:2})}),e!=="passport"&&s.jsx("div",{className:"upload-section",children:s.jsx(re,{name:"back",label:h("pages.proof.fields.backSide"),storage:Ce.values.categoryPhoto,text:h("pages.proof.uploadTexts.backSide"),max:2})})]}),s.jsxs("div",{className:"security-note",children:[s.jsxs("div",{className:"security-header",children:[s.jsx("i",{className:"fas fa-shield-alt"})," ",h("pages.proof.security.title")]}),s.jsx("div",{className:"security-text",children:h("pages.proof.security.text")})]}),s.jsx("button",{type:"submit",className:"submit-button",children:h("pages.proof.buttons.validateDocuments")})]})})]}),s.jsx("style",{children:`
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

        .proof-container {
          
          margin: 0 auto;
          position: relative;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
        }

        /* Header Section - Matching Profile Page */
        .header {
          min-height: 60px;
          position: relative;
          padding: 20px;
        }

        .nav-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .back-arrow {
          color: white;
          font-size: 20px;
          font-weight: 300;
          text-decoration: none;
          transition: opacity 0.3s ease;
        }

        .back-arrow:hover {
          opacity: 0.8;
        }

        .page-title {
          color: white;
          font-size: 17px;
          font-weight: 600;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        /* Content Card - Matching Profile Page */
        .content-card {
          background: var(--kt-bg-card);
          border-radius: 40px 40px 0 0;
          padding: 25px 20px 100px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          min-height: calc(100vh - 60px);
        }

        .instructions {
          background: #f0f7ff;
          border: 1px solid #e6f0ff;
          border-radius: 12px;
          padding: 16px;
          font-size: 14px;
          color: #106cf5;
          margin-bottom: 25px;
          display: flex;
          align-items: flex-start;
          gap: 10px;
          line-height: 1.5;
        }

        .instructions i {
          font-size: 16px;
          margin-top: 2px;
          flex-shrink: 0;
        }

        .form-section {
          margin-bottom: 30px;
        }

        .section-title {
          font-size: 16px;
          font-weight: 600;
          color: var(--kt-text-primary);
          margin-bottom: 16px;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--kt-border);
        }

        .document-type-section {
          margin-bottom: 20px;
        }

        .input-label {
          display: block;
          font-size: 14px;
          color: var(--kt-text-secondary);
          margin-bottom: 10px;
          font-weight: 500;
        }

        .required {
          color: #f44336;
        }

        .document-type-options {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .document-option {
          display: flex;
          align-items: center;
          padding: 14px 16px;
          border: 1px solid var(--kt-border);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          background: var(--kt-bg-card-alt);
        }

        .document-option:hover {
          border-color: #106cf5;
          background: #f0f7ff;
        }

        .document-option.selected {
          border-color: #106cf5;
          background: #e6f0ff;
          box-shadow: 0 0 0 2px rgba(16, 108, 245, 0.1);
        }

        .document-icon {
          font-size: 18px;
          color: var(--kt-text-secondary);
          margin-right: 12px;
          width: 24px;
          text-align: center;
        }

        .document-option.selected .document-icon {
          color: #106cf5;
        }

        .document-text {
          font-size: 12px;
          font-weight: 500;
          color: var(--kt-text-primary);
        }

        .document-option.selected .document-text {
          color: #106cf5;
          font-weight: 600;
        }

        .input-group {
          margin-bottom: 12px;
        }

        /* Input styling */
        .text-input {
          width: 100%;
        }

        .text-input input {
          width: 100%;
          padding: 12px 16px;
          font-size: 14px;
          border: 1px solid var(--kt-border);
          border-radius: 8px;
          background: var(--kt-bg-card);
          transition: all 0.3s ease;
          outline: none;
          color: var(--kt-text-secondary);
        }

        .text-input input:focus {
          border-color: #106cf5;
          box-shadow: 0 0 0 2px rgba(16, 108, 245, 0.1);
        }

        .text-input input::placeholder {
          color: var(--kt-text-muted);
          font-size: 14px;
        }

        .text-input label {
          display: block;
          font-size: 14px;
          color: var(--kt-text-secondary);
          margin-bottom: 6px;
          font-weight: 500;
        }

        /* Upload section styling */
        .upload-section {
          margin-bottom: 20px;
        }

        /* Security Note */
        .security-note {
          background: #fef3e9;
          border: 1px solid #ffd8b5;
          border-radius: 12px;
          padding: 18px;
          margin-bottom: 25px;
        }

        .security-header {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 15px;
          font-weight: 600;
          color: #ff7a00;
          margin-bottom: 8px;
        }

        .security-header i {
          font-size: 18px;
        }

        .security-text {
          font-size: 13px;
          color: #ff7a00;
          line-height: 1.5;
          opacity: 0.9;
        }

        /* Submit Button */
        .submit-button {
          width: 100%;
          padding: 12px;
          background: #106cf5;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .submit-button:hover {
          background: #0a4fc4;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(16, 108, 245, 0.3);
        }

        .submit-button:active {
          transform: translateY(0);
        }

        /* Image upload component styling override */
        .ant-upload.ant-upload-select {
          width: 100% !important;
        }

        .ant-upload-list-item {
          margin-top: 8px !important;
        }

        /* Responsive adjustments */
        @media (max-width: 380px) {
          .proof-container {
            padding: 0;
          }

          .header {
            padding: 16px;
            min-height: 50px;
          }

          .content-card {
            padding: 20px 16px 80px;
            border-radius: 30px 30px 0 0;
          }

          .instructions {
            font-size: 13px;
            padding: 14px;
          }

          .section-title {
            font-size: 15px;
          }

          .document-option {
            padding: 12px 14px;
          }

          .document-text {
            font-size: 13px;
          }

          .text-input input {
            padding: 10px 14px;
            font-size: 13px;
          }

          .submit-button {
            padding: 12px;
            font-size: 14px;
          }
        }

        @media (min-width: 768px) {
          .content-card {
            border-radius: 30px 30px 0 0;
            padding: 30px 25px 100px;
          }

          .document-type-options {
            flex-direction: row;
            gap: 12px;
          }

          .document-option {
            flex: 1;
            flex-direction: column;
            text-align: center;
            padding: 16px 10px;
          }

          .document-icon {
            margin-right: 0;
            margin-bottom: 8px;
          }
        }
      `})]})}export{rr as default};

(function(n,t){typeof exports=="object"&&typeof module<"u"?t(exports):typeof define=="function"&&define.amd?define(["exports"],t):(n=typeof globalThis<"u"?globalThis:n||self,t(n.GovieFrontend={}))})(this,function(n){"use strict";function t({type:e,functions:d=[]}){function s(){for(const c of d)typeof window<"u"&&window.addEventListener(e,c)}return{init:s}}function o(){for(const e of document.querySelectorAll('[data-module="gieds-header"]'))console.log({headerElement:e})}function i(){const e=document==null?void 0:document.body;if(!e)throw new Error("No body element found in the document.");e.classList.contains("js")||e.classList.add("js")}t({type:"DOMContentLoaded",functions:[i]}).init(),t({type:"load",functions:[o]}).init(),n.initHeader=o,Object.defineProperty(n,Symbol.toStringTag,{value:"Module"})});
//# sourceMappingURL=govie-frontend.js.map

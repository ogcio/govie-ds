(function(n,i){typeof exports=="object"&&typeof module<"u"?i(exports):typeof define=="function"&&define.amd?define(["exports"],i):(n=typeof globalThis<"u"?globalThis:n||self,i(n.GovieFrontend={}))})(this,function(n){"use strict";var p=Object.defineProperty;var A=(n,i,a)=>i in n?p(n,i,{enumerable:!0,configurable:!0,writable:!0,value:a}):n[i]=a;var o=(n,i,a)=>A(n,typeof i!="symbol"?i+"":i,a);function i({element:s}){return{getByElement:({name:e})=>{const t=s.querySelectorAll(`[data-element="${e}"]`);if(t.length===0)throw new Error(`No elements with 'data-element="${e}"' found.`);if(t.length>1)throw new Error(`More than one element with 'data-element="${e}"' found.`);return t[0]},getByData:({data:e})=>{const t=s.querySelectorAll(`[data-${e}]`);if(t.length===0)throw new Error(`No elements with 'data-${e}' found.`);if(t.length>1)throw new Error(`More than one element with 'data-${e}' found.`);return t[0]}}}class a{constructor({element:e}){o(this,"initialised");o(this,"element");o(this,"query");this.element=e,this.query=i({element:e}),this.initialised=!1}init(){this.initialised||(this.initComponent(),this.initialised=!0)}destroy(){this.initialised&&(this.destroyComponent(),this.initialised=!1)}}function f({name:s,classType:e}){return function(){const t=document.querySelectorAll(`[data-module="gieds-${s}"]`);for(const r of t)g(e,{element:r})}}class d extends a{constructor({element:t}){super({element:t});o(this,"searchIcon");o(this,"searchContainer");o(this,"searchIconHandler");this.searchIcon=this.query.getByElement({name:"search"}),this.searchContainer=this.query.getByElement({name:"container"}),this.searchIconHandler=r=>{r.stopPropagation();const c=this.searchContainer.classList;c.toggle("js:gi-max-height"),c.toggle("gi-max-h-0"),c.toggle("gi-opacity-0")}}initComponent(){this.searchIcon.addEventListener("click",this.searchIconHandler)}destroyComponent(){this.searchIcon.removeEventListener("click",this.searchIconHandler)}}const h=f({name:"header",classType:d});class y{constructor(){o(this,"_instances");this._instances={Header:{}}}addInstance(e,t,r,c=!1){if(!this._instances[e])return console.warn(`govie component ${e} does not exist.`),!1;if(r){if(this._instances[e][r]&&!c){console.warn(`govie instance with id ${r} already exists.`);return}c&&this._instances[e][r]&&this.destroyAndRemoveInstance(e,r)}this._instances[e][r??this._generateRandomId()]=t}getAllInstances(){return this._instances}getInstances(e){return this._instances[e]?this._instances[e]:(console.warn(`govie component ${e} does not exist.`),!1)}getInstance(e,t){if(this._componentAndInstanceCheck(e,t)){if(!this._instances[e][t]){console.warn(`govie instance with id ${t} does not exist.`);return}return this._instances[e][t]}}destroyAndRemoveInstance(e,t){this._componentAndInstanceCheck(e,t)&&(this.destroyInstanceObject(e,t),this.removeInstance(e,t))}destroyAndRemoveAllInstances(){for(const e in this._instances)for(const t in this._instances[e])this.destroyAndRemoveInstance(e,t)}removeInstance(e,t){this._componentAndInstanceCheck(e,t)&&delete this._instances[e][t]}destroyInstanceObject(e,t){this._componentAndInstanceCheck(e,t)&&this._instances[e][t].destroy()}instanceExists(e,t){return!(!this._instances[e]||!this._instances[e][t])}_generateRandomId(){return Math.random().toString(36).slice(2,11)}_componentAndInstanceCheck(e,t){return this._instances[e]?this._instances[e][t]?!0:(console.warn(`govie Instance with ID ${t} does not exist.`),!1):(console.warn(`govie Component ${e} does not exist.`),!1)}}function g(s,e){const t=new d(e);t.init(),l.addInstance("Header",t,e.id,!0)}function I(){l.destroyAndRemoveAllInstances()}const l=new y;typeof window<"u"&&(window.govieInstances=l);function m({type:s,functions:e=[]}){function t(){for(const r of e)typeof window<"u"&&window.addEventListener(s,r)}return{init:t}}const w=Object.freeze(Object.defineProperty({__proto__:null,properties:{header:[{name:"title",description:"Title of the header.",type:"string",required:!0}]}},Symbol.toStringTag,{value:"Module"}));function _(){const s=document==null?void 0:document.body;if(!s)throw new Error("No body element found in the document.");s.classList.contains("gieds-js")||s.classList.add("gieds-js")}function u(){_(),h()}function v(){I()}m({type:"load",functions:[u]}).init(),n.Header=d,n.destroyGovIe=v,n.initGovIe=u,n.initHeader=h,n.properties=w,Object.defineProperty(n,Symbol.toStringTag,{value:"Module"})});
//# sourceMappingURL=govie-frontend.umd.js.map

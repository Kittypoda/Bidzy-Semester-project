const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/allListings-CnE0nfTF.js","assets/constants-Cszep78z.js","assets/searchListing-Bzj-GCxL.js","assets/createListing-D0rSfyCH.js","assets/login-D55vWFZW.js","assets/register-CIBkuvPO.js","assets/oneListing-BP59vorS.js","assets/editProfile-DxDQAPF-.js","assets/showMyListings-e1H-eJIb.js"])))=>i.map(i=>d[i]);
(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function _(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(t){if(t.ep)return;t.ep=!0;const o=_(t);fetch(t.href,o)}})();const f="modulepreload",h=function(r){return"/Bidzy-Semester-project/"+r},u={},e=function(a,_,l){let t=Promise.resolve();if(_&&_.length>0){document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),n=i?.nonce||i?.getAttribute("nonce");t=Promise.allSettled(_.map(s=>{if(s=h(s),s in u)return;u[s]=!0;const d=s.endsWith(".css"),m=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${s}"]${m}`))return;const c=document.createElement("link");if(c.rel=d?"stylesheet":f,d||(c.as="script"),c.crossOrigin="",c.href=s,n&&c.setAttribute("nonce",n),document.head.appendChild(c),d)return new Promise((p,E)=>{c.addEventListener("load",p),c.addEventListener("error",()=>E(new Error(`Unable to preload CSS for ${s}`)))})}))}function o(i){const n=new Event("vite:preloadError",{cancelable:!0});if(n.payload=i,window.dispatchEvent(n),!n.defaultPrevented)throw i}return t.then(i=>{for(const n of i||[])n.status==="rejected"&&o(n.reason);return a().catch(o)})};function w(){const r=document.getElementById("loader");r&&r.classList.remove("hidden")}function L(){const r=document.getElementById("loader");r&&r.classList.add("hidden")}async function P(r=window.location.pathname){w();try{switch(console.log("Current pathname:",r),r.replace("/src/html/","/")){case"/Bidzy-Semester-project/":case"/Bidzy-Semester-project/index.html":await e(()=>import("./header-CZMH0pFf.js"),[]),await e(()=>import("./allListings-CnE0nfTF.js"),__vite__mapDeps([0,1])),await e(()=>import("./searchListing-Bzj-GCxL.js"),__vite__mapDeps([2,1])),await e(()=>import("./searchForm-BKSD6aWh.js"),[]),await e(()=>import("./createListing-D0rSfyCH.js"),__vite__mapDeps([3,1]));break;case"/Bidzy-Semester-project/login.html":await e(()=>import("./login-D55vWFZW.js"),__vite__mapDeps([4,1]));break;case"/Bidzy-Semester-project/register.html":await e(()=>import("./register-CIBkuvPO.js"),__vite__mapDeps([5,1]));break;case"/Bidzy-Semester-project/productpage.html":await e(()=>import("./header-CZMH0pFf.js"),[]),await e(()=>import("./oneListing-BP59vorS.js"),__vite__mapDeps([6,1])),await e(()=>import("./searchListing-Bzj-GCxL.js"),__vite__mapDeps([2,1])),await e(()=>import("./searchForm-BKSD6aWh.js"),[]);break;case"/Bidzy-Semester-project/search.html":await e(()=>import("./header-CZMH0pFf.js"),[]),await e(()=>import("./searchListing-Bzj-GCxL.js"),__vite__mapDeps([2,1])),await e(()=>import("./searchForm-BKSD6aWh.js"),[]);break;case"/Bidzy-Semester-project/profile.html":await e(()=>import("./header-CZMH0pFf.js"),[]),await e(()=>import("./searchListing-Bzj-GCxL.js"),__vite__mapDeps([2,1])),await e(()=>import("./searchForm-BKSD6aWh.js"),[]),await e(()=>import("./editProfile-DxDQAPF-.js"),__vite__mapDeps([7,1])),await e(()=>import("./createListing-D0rSfyCH.js"),__vite__mapDeps([3,1]));break;case"/Bidzy-Semester-project/mylistings.html":await e(()=>import("./header-CZMH0pFf.js"),[]),await e(()=>import("./showMyListings-e1H-eJIb.js"),__vite__mapDeps([8,1]));break;default:console.error(`No matching route for: ${r}`)}}catch(a){console.error(`Error loading route: ${r}`,a)}finally{L()}}console.log("app.js loaded!");await P(window.location.pathname);

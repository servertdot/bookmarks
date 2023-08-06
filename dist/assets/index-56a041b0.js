(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))t(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&t(i)}).observe(document,{childList:!0,subtree:!0});function s(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(o){if(o.ep)return;o.ep=!0;const r=s(o);fetch(o.href,r)}})();const L="8:30",S="18:00",E=(n,e)=>{const s=n?S:L,[t,o]=e.split(":"),[r,i]=s.split(":"),c=new Date;c.setHours(parseInt(t,10),parseInt(o,10),0);const a=new Date;a.setHours(parseInt(r,10),parseInt(i,10),0);const y=24*60*60*1e3;let l;return a>=c?l=a-c:l=a-c+y,l},h=(n,e)=>{sessionStorage.setItem(n,e)},g=(n=0)=>{const e=new Date().getHours(),s=new Date().getMinutes(),t=e>=8&&e<18;t?(document.body.classList.add("theme__light"),h("theme","theme__light")):(document.body.classList.add("theme__dark"),h("theme","theme__dark")),setTimeout(()=>{g(E(t,`${e}:${s}`))},n),console.log(n)},T=n=>{const e=document.createElement("li");return e.append(n),e},H=n=>{const e=document.querySelector(".list");e&&(e.innerHTML="");const s=[];n.forEach((t,o)=>{var c;const r=document.createElement("div"),i=(c=t.header)==null?void 0:c.textContent;r.classList.add("list-item"),r.dataset.title=i??`empty_${o}`,t.header&&r.appendChild(t.header),r.appendChild(t.list),e==null||e.appendChild(r),s.push(r)}),I(s)},C=n=>{const e=[],s=[];return n.forEach((t,o)=>{o!==0&&t.parentElement&&e.push(t.parentElement)}),e.forEach(t=>{const o=t.querySelector("h3"),r=document.createElement("ul");t.querySelectorAll("a").forEach(c=>{r.append(T(c))}),s.push({header:o,list:r})}),s},I=n=>{const e=[];n.forEach(s=>{e.push(s.outerHTML)}),e.length&&localStorage.setItem("bookmarks",JSON.stringify(e))},q=n=>{const e=new FileReader;e.onload=function(s){var a;const t=(a=s.target)==null?void 0:a.result,i=new DOMParser().parseFromString(t,"text/html").querySelectorAll("h3"),c=C(i);H(c)},e.readAsText(n)},M=()=>!!localStorage.getItem("bookmarks"),v=()=>{if(!M)return;const n=new DOMParser,e=document.querySelector(".list");JSON.parse(localStorage.getItem("bookmarks")).forEach(t=>{const o=n.parseFromString(t,"text/html").querySelector(".list-item");o&&(e==null||e.appendChild(o))})},D=(n,e=1e3)=>{let s;return(...t)=>{clearTimeout(s),s=setTimeout(()=>{n(...t)},e)}},_=n=>e=>e.length?n.filter(s=>s.title.toLowerCase().includes(e.toLowerCase())):[],k=n=>{const e=document.querySelector(".search-dropdown");n.length?e==null||e.classList.remove("hidden"):e==null||e.classList.add("hidden"),e&&(e.innerHTML=""),n.forEach(s=>{const t=document.createElement("a");t.classList.add("search-dropdown__item"),t.innerText=s.title,t.href=s.href,e==null||e.appendChild(t)})};g();const u=document.querySelector('input[type="file"]');u==null||u.addEventListener("change",n=>{var s;const e=n.target;if(e instanceof HTMLInputElement){const t=(s=e==null?void 0:e.files)==null?void 0:s[0];t&&q(t)}});v();const d=document.querySelector(".search"),m=document.querySelector(".list"),f=m==null?void 0:m.querySelectorAll("a"),p=[],O=_(p);f==null||f.forEach(n=>{p.push({title:n.textContent??"Not found title",href:n.href})});const b=n=>{const e=n.target;if(e instanceof HTMLInputElement){const s=e.value,t=O(s);k(t)}};d==null||d.addEventListener("input",D(b,300));
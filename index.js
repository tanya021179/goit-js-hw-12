import{a as S,i as v,S as b}from"./assets/vendor-4dYZuk4Q.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function a(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(r){if(r.ep)return;r.ep=!0;const s=a(r);fetch(r.href,s)}})();const q="47379465-d19c322484d0cfa984d66258f",p=async(t,e=1)=>{const a=new URLSearchParams({key:q,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:150});try{return(await S(`https://pixabay.com/api/?${a}`)).data}catch(o){throw new Error(o.message)}},y=t=>{v.error({message:t,messageColor:"#fafafb",backgroundColor:"#ef4040"})},g=(t,e)=>{if(e.length===0){y("Sorry, there are no images matching your search query. Please, try again!");return}t.insertAdjacentHTML("beforeend",w(e))},w=t=>t.map(({webformatURL:e,largeImageURL:a,tags:o,likes:r,views:s,comments:c,downloads:L})=>`
      <li class="gallery-item">
      <a class="gallery-link" href="${a}">   
      <img class="gallery-image" src="${e}" alt="${o}" width="360"/>
      </a>
      <div class="container">
      <p class="facts-container">
      Likes
    <span class="facts-span">${r}</span></p> 
      <p class="facts-container">
      Views
    <span class="facts-span">${s}</span></p>
      <p class="facts-container">
      Comments
    <span class="facts-span">${c}</span></p>
      <p class="facts-container">
      Downloads
    <span class="facts-span">${L}</span></p>
      </div>
      </li>
    `).join(""),P=document.querySelector(".js-form"),u=document.querySelector(".gallery"),m=document.querySelector(".form-search"),h=document.querySelector(".loader"),n=document.querySelector(".js-load-more"),l=document.querySelector(".facts-span");let i="",f=1,d;P.addEventListener("submit",x);n.addEventListener("click",C);async function x(t){if(t.preventDefault(),i=m.value.trim(),!!i){m.value="",f=1,h.style.display="inline",l.textContent="";try{const e=await p(i,f);u.innerHTML="",g(u,e.hits),d?d.refresh():d=new b(".gallery a"),e.hits.length<e.totalHits?n.classList.remove("load-more-hidden"):n.classList.add("load-more-hidden")}catch(e){console.log(e),y("Sorry, there are no images matching your search query. Please, try again!")}finally{h.style.display="none"}}}async function C(){f+=1,h.style.display="inline";try{const t=await p(i,f);if(!t.hits||t.hits.length===0){n.classList.add("load-more-hidden"),l.textContent="We're sorry, but you've reached the end of search results.";return}g(u,t.hits),d.refresh(),u.children.length>=t.totalHits?(n.classList.add("load-more-hidden"),l.textContent="We're sorry, but you've reached the end of search results."):(n.classList.remove("load-more-hidden"),l.textContent="");const e=document.querySelectorAll(".gallery-item"),a=e[e.length-t.hits.length].getBoundingClientRect().height;window.scrollBy({left:0,top:a*1.2,behavior:"smooth"})}catch(t){console.error("Error fetching images:",t),y("Sorry, there are no images matching your search query. Please, try again!")}finally{h.style.display="none"}}
//# sourceMappingURL=index.js.map

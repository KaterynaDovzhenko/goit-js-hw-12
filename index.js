import{a as f,S as L,i}from"./assets/vendor-D0cagnvz.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&a(d)}).observe(document,{childList:!0,subtree:!0});function o(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(r){if(r.ep)return;r.ep=!0;const s=o(r);fetch(r.href,s)}})();const y=t=>`<li class="gallery-card">
        <a href="${t.largeImageURL}" class="gallery-link">
            <img class="gallery-img" src="${t.webformatURL}" alt="${t.tags}" />
            </a>
             <div class="gallery-info">
              <p><strong>Likes:</strong> ${t.likes}</p>
              <p><strong>Views:</strong> ${t.views}</p>
              <p><strong>Comments:</strong> ${t.comments}</p>
              <p><strong>Downloads:</strong> ${t.downloads}</p>
            </div>
          </li>`,g=(t,e)=>{const o={params:{key:"46917062-2aeb1fc3b978e5a238a42f10e",q:t,page:e,per_page:15,image_type:"photo",orientation:"horizontal",safesearch:!0}};return f.get("https://pixabay.com/api/",o)},m=document.querySelector(".js-search-form"),u=document.querySelector(".js-gallery"),n=document.querySelector(".js-loadmore-btn");let l=1,c="";const w=new L(".gallery-link",{captionsData:"alt",captionDelay:50}),b=async t=>{try{if(t.preventDefault(),c=t.currentTarget.elements.user_query.value.trim(),c===""){i.show({message:"the field must be filled!"});return}l=1,n.classList.add("is-hidden"),loader.style.display="flex";const{data:e}=await g(c,l);if(e.total===0){i.show({message:"Sorry, there are no images matching your search query. Please try again!"}),u.innerHTML="",m.reset();return}e.total>1&&(n.classList.remove("is-hidden"),n.addEventListener("click",h));const o=e.hits.map(a=>y(a)).join("");u.innerHTML=o,p(),w.refresh()}catch(e){console.log(e),i.show({message:"Something went wrong. Please try again later."})}finally{loader.style.display="none"}};m.addEventListener("submit",b);const h=async t=>{try{l++;const{data:e}=await g(c,l),o=e.hits.map(a=>y(a)).join("");u.insertAdjacentHTML("beforeend",o),p(),l===e.totalHits&&(n.classList.remove("is-hidden"),n.removeEventListener("click",h),i.show({message:"We're sorry, but you've reached the end of search results."}))}catch(e){console.log(e)}};function p(){const t=document.querySelector(".gallery-card");if(t){const e=t.getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}}
//# sourceMappingURL=index.js.map

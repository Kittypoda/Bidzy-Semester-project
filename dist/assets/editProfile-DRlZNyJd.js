import{d as s,a as u}from"./constants-BFK3kwLT.js";const f=document.getElementById("edit-profile-btn"),d=document.getElementById("edit-profile-popup"),m=document.getElementById("cancel-edit-btn"),g=document.getElementById("edit-profile-form");function c(){const t=JSON.parse(localStorage.getItem("userName"));return t||(alert("Unable to identify the logged-in user. Redirecting to login..."),window.location.href="/src/html/login.html",null)}async function p(){const t=c();if(t)try{const o=localStorage.getItem("accessToken");if(!o){alert("User is not logged in. Redirecting to login..."),window.location.href="/src/html/login.html";return}const n=await fetch(`${s}/${t}`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`,"X-Noroff-API-Key":u}});if(n.ok){const e=await n.json();console.log("Fetched user profile:",e),e.data.avatar&&e.data.avatar.url&&(document.getElementById("avatar").style.backgroundImage=`url(${e.data.avatar.url})`),e.data.bio&&(document.getElementById("bio").textContent=e.data.bio);const i=document.getElementById("hi-user");if(i.textContent=`Hi, ${t}!`,e.data.credits!==void 0){const a=document.getElementById("credit");a.textContent=`Your current credit: $${e.data.credits}`}}else{const e=await n.json();console.error("Error fetching profile:",e),alert(`Failed to fetch profile: ${e.errors?.[0]?.message||"Unknown error"}`)}}catch(o){console.error("Error fetching profile:",o),alert("An unexpected error occurred while fetching the profile.")}}f.addEventListener("click",()=>{c()&&d.classList.remove("hidden")});m.addEventListener("click",()=>{d.classList.add("hidden")});g.addEventListener("submit",async t=>{t.preventDefault();const o=document.getElementById("avatar-url").value.trim(),n=document.getElementById("bio-text").value.trim();if(!o&&!n){alert("Please provide at least one field to update.");return}const e=c();if(!e)return;const i={};o&&(i.avatar={url:o,alt:"User avatar"}),n&&(i.bio=n);try{const a=localStorage.getItem("accessToken");if(!a){alert("User is not logged in. Redirecting to login..."),window.location.href="/src/html/login.html";return}const l=await fetch(`${s}/${e}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`,"X-Noroff-API-Key":u},body:JSON.stringify(i)});if(l.ok){const r=await l.json();console.log("Profile updated:",r),r.data.avatar&&r.data.avatar.url&&(document.getElementById("avatar").style.backgroundImage=`url(${r.data.avatar.url})`),r.data.bio&&(document.getElementById("bio").textContent=r.data.bio),d.classList.add("hidden")}else{const r=await l.json();console.error("API Error Response:",r),alert(`Failed to update profile: ${r.errors?.[0]?.message||"Unknown error"}`)}}catch(a){console.error("Error updating profile:",a),alert("An unexpected error occurred.")}});p();
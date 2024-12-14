import{A as b}from"./constants-BFK3kwLT.js";let d=[];function x(t){const n=document.createElement("div");n.classList.add("relative","overflow-hidden","rounded-lg","group","shadow-md","transition-colors","duration-300","hover:shadow-lg");const o=document.createElement("a");o.href=`/Bidzy-Semester-project/src/html/productpage.html?listingId=${t.id}`,o.classList.add("block","h-full","w-full");const e=document.createElement("div");e.classList.add("h-64","w-full","relative","bg-cover","bg-center","transition-colors","duration-300"),t.media&&Array.isArray(t.media)&&t.media.length>0?e.style.backgroundImage=`url(${t.media[0].url})`:e.style.backgroundImage="url('https://images.unsplash.com/photo-1521193089946-7aa29d1fe776?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";const s=document.createElement("div");s.classList.add("absolute","inset-0","bg-customDYellow","opacity-0","lg:group-hover:opacity-100","lg:opacity-0","transition-opacity","duration-300","z-0");const l=document.createElement("h1");l.textContent=t.title,l.classList.add("absolute","bottom-0","left-0","w-full","bg-customDYellow","pt-8","py-2","px-2","md:px-4","text-xs","md:text-sm","rounded-t-lg","block","lg:hidden","h-24","font-bold","truncate");const r=document.createElement("h2"),a=t.bids&&t.bids.length>0?Math.max(...t.bids.map(f=>f.amount)):0;r.textContent=a>0?`Highest Bid: $${a}`:"No bids yet",r.classList.add("absolute","bottom-4","md:bottom-2","px-2","md:px-4","text-xs","md:text-sm","block","lg:hidden");const c=document.createElement("div"),u=new Date(t.endsAt)-new Date,m=Math.ceil(u/(1e3*60*60*24));c.textContent=m>1?`${m} days left`:m===1?"1 day left":"Ended",c.classList.add("absolute","top-2","right-2","bg-customBlue","text-white","text-xs","font-baloo","py-1","px-2","rounded","lg:group-hover:hidden","transition-opacity","duration-300");const g=document.createElement("h1");g.textContent=t.title,g.classList.add("pt-12","text-lg","hidden","lg:block","lg:group-hover:text-black","truncate");const h=document.createElement("h2");h.textContent=a>0?`Highest Bid: $${a}`:"No bids yet",h.classList.add("hidden","lg:block","text-lg","lg:group-hover:text-black");const i=document.createElement("div");return i.classList.add("absolute","inset-0","flex","p-4","pt-24","flex-col","hidden","lg:group-hover:flex","z-10"),i.appendChild(g),i.appendChild(h),e.appendChild(s),e.appendChild(l),e.appendChild(r),e.appendChild(c),e.appendChild(i),o.appendChild(e),n.appendChild(o),n}function p(t){const n=document.getElementById("display-listings");n.classList.add("grid","gap-4","grid-cols-2","lg:grid-cols-3","p-4"),n.textContent="",t.forEach(o=>{const e=x(o);n.appendChild(e)})}async function y(){try{const t=await fetch(`${b}?_bids=true`);if(!t.ok)throw new Error("Failed to fetch listings");const n=await t.json();if(console.log("Fetched listings data:",n),d=n.data||n,!Array.isArray(d))throw new Error("Listings is not an array");p(d)}catch(t){console.error("Error fetching listings:",t)}}function w(t){const n=[...d];t==="newest"?n.sort((o,e)=>new Date(e.created)-new Date(o.created)):t==="lowest"?n.sort((o,e)=>(o.bids&&Math.min(...o.bids.map(s=>s.amount)))-(e.bids&&Math.min(...e.bids.map(s=>s.amount)))):t==="highest"&&n.sort((o,e)=>(e.bids&&Math.max(...e.bids.map(s=>s.amount)))-(o.bids&&Math.max(...o.bids.map(s=>s.amount)))),p(n)}document.getElementById("filter-container").addEventListener("click",t=>{if(t.target&&t.target.textContent){const n=t.target.textContent.toLowerCase().replace(" ","");w(n)}});y();

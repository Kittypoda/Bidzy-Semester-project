document.getElementById("search-form").addEventListener("submit",t=>{t.preventDefault();const e=document.getElementById("search-input").value.trim();e&&(window.location.href=`/src/html/search.html?q=${encodeURIComponent(e)}`)});
import{c as i}from"./constants-Cszep78z.js";async function m(a){a.preventDefault();const t=document.getElementById("name").value,l=document.getElementById("email").value,c=document.getElementById("password").value,n={name:t,email:l,password:c};console.log(n);try{const e={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)},s=await fetch(i,e),r=await s.json();return console.log(r),s.ok&&localStorage.setItem("username",t),r}catch(e){alert("Registration failed"),console.error("Registration failed",e)}finally{window.location.href="/src/html/login.html"}}const o=document.querySelector("#register-form");console.log(o);o?(console.log("Form found"),o.addEventListener("submit",m)):console.error("Form not found.");
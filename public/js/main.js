const openBtn=document.querySelector(".toggle-nav");
const closeBtn=document.querySelector(".sidebar-close");
const overlay=document.querySelector(".sidebar-overlay");
const sidebar=document.querySelector(".sidebar");
const auth_overlay=document.querySelector(".auth-overlay");
const auth=document.querySelector(".overlay");


openBtn.addEventListener('click',function(){
   console.log("open");
    overlay.classList.add("show");
   sidebar.classList.add("show");
});

closeBtn.addEventListener('click',function(){
   overlay.classList.remove("show");
   sidebar.classList.remove("show");
});


function work(){
  auth.style.display='none';
  auth_overlay.style.display='none';
}
function myFunction(){
   var x = document.getElementById("password");
   if (x.type === "password") {
     x.type = "text";
   } else {
     x.type = "password";
   }
}
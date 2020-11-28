

const wrapper = document.getElementById("wrapperRemoveTable");
wrapper.style.pointerEvents = "none";

document.getElementById("edit").addEventListener("click",(e)=>{
   if(e.target.innerHTML === "Click Here To Enter Edit Mode"){
        e.target.innerHTML = "Click Here To Enter Read-Only Mode";
        wrapper.style.pointerEvents = "all";
   }else{
       e.target.innerHTML = "Click Here To Enter Edit Mode"
       wrapper.style.pointerEvents = "none";
   }
})
const checkbox = document.getElementsByClassName("remove");
for(let i = 0; i < checkbox.length; ++i){
    checkbox[i].addEventListener("click",(e)=>{
         checkbox[i].parentElement.style.opacity = 0;
    })
}
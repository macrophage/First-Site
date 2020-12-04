
const wrapper = document.getElementById("wrapperRemoveTable");
wrapper.style.pointerEvents = "none";

document.getElementById("edit").addEventListener("click",(e)=>{
   if(e.target.innerHTML === "Click Here To Enter Edit Mode"){
        e.target.innerHTML = "Click Here To Enter Read-Only Mode";
        let body = document.getElementById("body");
        body.className = "bodyDelete";
        e.target.style.color = "white";
        for(let i=1; i < count; ++i){   
            for(j = 0; j <  table.rows[i].cells.length; ++j){
                    if(table.rows[i].cells[j].querySelector("a") !== null){
                            table.rows[i].cells[j].querySelector("a").style.color = "#ccc";
                    }
            }
        }
        wrapper.style.pointerEvents = "all";
   }else{
       e.target.innerHTML = "Click Here To Enter Edit Mode"
       e.target.style.color = "black";
       body.classList.remove("bodyDelete");
       for(let i=1; i < count; ++i){   
        for(j = 0; j <  table.rows[i].cells.length; ++j){
                if(table.rows[i].cells[j].querySelector("a") !== null){
                        table.rows[i].cells[j].querySelector("a").style.color = "black";
                }
        }
    }
       wrapper.style.pointerEvents = "none";
   }
})
const checkbox = document.getElementsByClassName("remove");
for(let i = 0; i < checkbox.length; ++i){
    checkbox[i].addEventListener("click",(e)=>{
         checkbox[i].parentElement.style.opacity = 0;
    })
}

const table = document.getElementById("table");
let count = table.rows.length; 






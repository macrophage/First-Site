let color;

const table = document.getElementById("table");

let count = table.rows.length;  

for(let i=1; i < count; ++i){   
    for(j = 0; j <  table.rows[i].cells.length; ++j){
            if(table.rows[i].cells[j].querySelector("a") !== null){
                let str = (table.rows[i].cells[j].querySelector("a").innerHTML).replace(/\s+/g, '');
                urlExists("/images/uploads/"+str+".jpg",table.rows[i].cells[j].querySelector("a"));
            }
    }
}




const wrapper = document.getElementById("wrapperRemoveTable");
wrapper.style.pointerEvents = "none";

document.getElementById("edit").addEventListener("click",(e)=>{
    
   if(e.target.innerHTML === "Click Here To Enter Edit Mode"){
    let body = document.getElementById("body");
    body.className = "bodyUpdate";
    e.target.style.color = "white";
    document.getElementsByClassName("gotoDelete")[0].querySelector("a").style.color = "white";
    for(let i=1; i < count; ++i){   
        for(j = 0; j <  table.rows[i].cells.length; ++j){
                if(table.rows[i].cells[j].querySelector("a") !== null){
                    if(table.rows[i].cells[j].querySelector("a").style.color !== color){
                        table.rows[i].cells[j].querySelector("a").style.color = "#ccc";
                    }
                }
        }
    }
   
        e.target.innerHTML = "Click Here To Enter Read-Only Mode";
        wrapper.style.pointerEvents = "all";
   }else{
       body.classList.remove("bodyUpdate");
       e.target.innerHTML = "Click Here To Enter Edit Mode"
       e.target.style.color = "black";
       document.getElementsByClassName("gotoDelete")[0].querySelector("a").style.color = "black";
       for(let i=1; i < count; ++i){   
        for(j = 0; j <  table.rows[i].cells.length; ++j){
                if(table.rows[i].cells[j].querySelector("a") !== null){
                    if(table.rows[i].cells[j].querySelector("a").style.color !== color){
                        table.rows[i].cells[j].querySelector("a").style.color = "black";
                    }
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

function urlExists(url,element) {
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {
    if (this.readyState === this.DONE) {
        if(this.status === 200){
             element.style.color = "orange"; //!color of dishes which have image on main page
             color = element.style.color
        }
    }
}
    xhr.open("HEAD", url) 
    xhr.send()
}



let arr = [];
let answer = "secret123456";

const code = document.getElementById("admin_code");
let i = 0;
document.addEventListener("keydown", event => {
    if(arr.length<12){ 
        if(answer[i]===event.key){
            arr.push(event.key);
            ++i;
        }else{
            arr = [];
            i = 0;
        }  
    }if(arr.length===12){
        if(arr.join("") === "secret123456"){
            code.removeAttribute("hidden")
            arr = [];
        }else{
            arr = [];
        }
    }

  });
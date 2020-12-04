function timeout () {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve("anything");
      }, 1000);
    });
  }


const link = document.getElementsByClassName("sauceLink");
const sauce = document.getElementsByClassName("sauce");
for(let i = 0; i < link.length; ++i){
        link[i].setAttribute("href","#"+link[i].name.slice(0,-1))
        link[i].addEventListener("click",()=>{
            for(let k = 0; k < sauce.length; ++k){
                console.log(link[i].name.slice(0,-1));
                if(sauce[k].querySelector("h3").getAttribute("name") === link[i].name.slice(0,-1)){
                    sauce[k].style.border = "5px solid #0000FF";
                    timeout()
.then(
  function () {
    sauce[k].style.border = "none";
  }
);
                    
                }
            }
        })
};
document.body.removeAttribute("tabindex")
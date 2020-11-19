
var a = document.getElementsByClassName("ingredient")


//TODO Make input fields appear, dissapear and grayed out.
for(let i = 0; i <a.length; ++i) {
    a[i].addEventListener("input",()=>{
       const value = a[i].value.trim();
       if(value){
           if(i<19){
            a[i+1].style.visibility = "visible";
            a[i+1].addEventListener("mousedown",()=>{
                a[i].disabled = true;
            })
           }
        }
       if(!value.trim().length){
           if (i === 0){
                a[i+1].style.visibility = "hidden";
           }else if(i === 19) {
                a[i].style.visibility = "hidden";
                a[i-1].disabled = false;
           }
           
           else{
                a[i].style.visibility = "hidden";
                a[i+1].style.visibility = "hidden";
                a[i-1].disabled = false; 
           } 


       }  
        
       a[i].addEventListener('keydown', (event)=> {
        if(event.key === "Tab"){
            if(i<19){
                a[i].disabled = true;
            }
        }
   })
     
    })
}
   //





const a = document.getElementsByClassName("ingredient")


//!Make input fields appear, dissapear and grayed out.
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
   //! Make fields enabled and make empty fields dissapear on post req 
   document.getElementById("submit").addEventListener("mousedown",()=>{
        for(let i = 0; i<20;++i){
            if(a[i].value.trim().length)
                a[i].disabled = false;
            else{
                a[i].disabled = true;
            }
        }
        
   })
  




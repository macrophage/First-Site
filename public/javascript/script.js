let counter = 1;
let form = document.forms[0];
$("#test").on("click",()=>{
let selectElement = form.querySelector('input[name="ingredients'+counter+'"]');
selectElement.style.visibility = "visible";
   ++counter;
})
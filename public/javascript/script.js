function addListener (arr,arr1){
    for(let i = 0; i < arr.length; ++i){
        arr[i].addEventListener("input",()=>{
            const value = arr[i].value.trim();
            const value1 = arr1[i].value.trim();
            if(value){
                if(value1){
                if(i<19){
                    arr1[i+1].style.visibility = "visible";
                    arr1[i+1].addEventListener("mousedown",()=>{
                        arr1[i].disabled = true;
                        arr[i].disabled = true;
                    })
                    arr[i+1].style.visibility = "visible";
                    arr[i+1].addEventListener("mousedown",()=>{
                        arr[i].disabled = true;
                        arr1[i].disabled = true;
                    })
                }
                arr[i].addEventListener('keydown', (event) => {
                    if (event.key === "Tab") {
                        if (i < 19) {
                            arr[i].disabled = true;
                            arr1[i].disabled = true;
                        }
                    }
                })
               
            }
            }
            if(!value.trim().length || !value1.trim().length){
              if(i===0){
                arr[i + 1].style.visibility = "hidden";
                arr1[i + 1].style.visibility = "hidden";
              }else if (i === 19 ){
                
                if(!value.trim().length && !value1.trim().length){
                    arr[i].style.visibility = "hidden";
                    arr1[i].style.visibility = "hidden";
                    arr[i - 1].disabled = false;
                    arr1[i - 1].disabled = false;

                    
                }
              }else{
                arr[i + 1].style.visibility = "hidden";
                arr1[i + 1].style.visibility = "hidden";
                if(!value.trim().length && !value1.trim().length){
                    arr[i].style.visibility = "hidden";
                    arr1[i].style.visibility = "hidden";
                    arr[i - 1].disabled = false;
                    arr1[i - 1].disabled = false;
                }
                }
            }
            
        })
    }
}


function manageFields(sauceName, sel) {
    const input = document.createElement("input");
    const invisibleInput = document.createElement("input");
    invisibleInput.style.display = "none";
    invisibleInput.value = selector.value;
    invisibleInput.name = "invisibleOptionInput"
    const ul = document.getElementById("chosenSauce");
    const li = document.createElement("li");
    li.className = "sauceNameList"
    input.type = "number";
    input.autocomplete = "off";
    input.min = "0";
    input.name = "optionInput"; 
    input.className = "sauceAmount";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "deleteBox";
//! Dynamic input
    if (sauceName !== "Choose Sauce") {

        li.appendChild(document.createTextNode(sauceName));
        li.appendChild(invisibleInput);
        li.appendChild(input);
        li.appendChild(checkbox);
        ul.appendChild(li);

        checkbox.addEventListener("click", () => {

            for (let i = 1; i < sel.length; ++i) {
                if (sel[i].value === checkbox.parentElement.textContent) {
                    sel[i].disabled = false;
                }
            }
            checkbox.parentElement.remove();

        })
    }
}


//!Make input fields appear, dissapear and grayed out.
const ing = document.getElementsByClassName("ingredient")
const q = document.getElementsByClassName("ingredientQuantity");
addListener(q,ing);
addListener(ing,q);

//! Make fields enabled and make empty fields dissapear on post req 

document.getElementById("submit").addEventListener("mousedown", () => {
    for (let i = 0; i < ing.length; ++i) {
        if(ing[0].value!== ""){

        
        if (ing[i].value.trim().length)
            ing[i].disabled = false;
        else {
            ing[i].disabled = true;
        }
        }
    }
    const checkbox = document.getElementById("isSauce");
    if (checkbox.checked) {
        document.getElementById("isSauceHidden").disabled = true;
    }
    for(let i = 1; i<selector.length;++i){
        selector[i].disabled = false;
    }

})
//! By choosing sauce adding number inputfield. By clicking checkbox removing inputfield 
const selector = document.getElementById("sauceSelector");
const sauceName = [];
const isSauce = document.getElementById("isSauce");


selector.addEventListener("change", () => {
    if (selector.value !== "Choose Sauce") {
        sauceName.push(selector.value);
        selector[selector.selectedIndex].disabled = true;
    }
    manageFields(selector.value, selector);

})
isSauce.addEventListener("click",()=>{
    if(isSauce.checked){
        selector.disabled = true;
        const ul = document.getElementById("chosenSauce");
        ul.innerHTML ="";
        for(let i = 1; i<selector.length;++i){
            selector[i].disabled = false;
        }
    }else{
        selector.disabled = false;
    }
})


// TODO



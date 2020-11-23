const ing = document.getElementsByClassName("ingredient")


//!Make input fields appear, dissapear and grayed out.
for (let i = 0; i < ing.length; ++i) {
    ing[i].addEventListener("input", () => {
        const value = ing[i].value.trim();
        if (value) {
            if (i < 19) {
                ing[i + 1].style.visibility = "visible";
                ing[i + 1].addEventListener("mousedown", () => {
                    ing[i].disabled = true;
                })
            }
        }
        if (!value.trim().length) {
            if (i === 0) {
                ing[i + 1].style.visibility = "hidden";
            } else if (i === 19) {
                ing[i].style.visibility = "hidden";
                ing[i - 1].disabled = false;
            } else {
                ing[i].style.visibility = "hidden";
                ing[i + 1].style.visibility = "hidden";
                ing[i - 1].disabled = false;
            }


        }

        ing[i].addEventListener('keydown', (event) => {
            if (event.key === "Tab") {
                if (i < 19) {
                    ing[i].disabled = true;
                }
            }
        })

    })
}
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
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
    input.required = true;
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
const quantity = document.getElementsByClassName("ingredientQuantity");


//! Make fields enabled and make empty fields dissapear on post req 

document.getElementById("submit").addEventListener("mousedown", () => {

    const checkbox = document.getElementById("isSauce");
    if (checkbox.checked) {
        document.getElementById("isSauceHidden").disabled = true;
    }
    for (let i = 1; i < selector.length; ++i) {
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
isSauce.addEventListener("click", () => {
    if (isSauce.checked) {
        selector.disabled = true;
        const ul = document.getElementById("chosenSauce");
        ul.innerHTML = "";
        for (let i = 1; i < selector.length; ++i) {
            selector[i].disabled = false;
        }
    } else {
        selector.disabled = false;
    }
})


// TODO
let counter = 1;
let addIngredient = document.getElementsByClassName("addIngredient")[0];
addIngredient.addEventListener("click", () => {
    let remove = document.createElement("input");
    remove.type = "checkbox";
    remove.className = "removeBox" + counter++;
    const container = document.getElementById("container");
    const div = document.createElement("div");
    div.className = "dishIngredients";
    const inputIngredient = document.createElement("input");
    const inputQuantity = document.createElement("input");
    inputIngredient.className = "ingredient";
    inputIngredient.name = "ingredient";
    inputIngredient.placeholder = "Enter Ingredient";
    inputIngredient.required = true;
    inputIngredient.autocomplete = "off";
    inputQuantity.className = "ingredientQuantity";
    inputQuantity.name = "ingredientQuantity";
    inputQuantity.type = "number";
    inputQuantity.placeholder = "Enter Quantity";
    inputQuantity.required = true;
    inputQuantity.autocomplete = "off";
    inputQuantity.min = "0";
    container.appendChild(div);
    div.appendChild(remove);
    div.appendChild(inputIngredient);
    div.appendChild(inputQuantity);

    remove.addEventListener("click", (e) => {
        const removeBox = document.getElementsByClassName("removeBox");
        div.innerHTML = ""


            --counter;
    })
})
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


const isSauce = document.getElementById("isSauce");
//! Add filter to dish
const checkboxFilter = document.getElementsByClassName("checkboxFilter");
for(let i = 0; i < checkboxFilter.length; ++i){
    checkboxFilter[i].addEventListener("click",()=>{
        if(i === 0){
            if(!(checkboxFilter[i+1].disabled)){
                checkboxFilter[i+1].disabled = "true";
                checkboxFilter[i+2].disabled = "true";
                isSauce.disabled = "true";
            }else{
                checkboxFilter[i+1].removeAttribute("disabled");
                checkboxFilter[i+2].removeAttribute("disabled");
                isSauce.removeAttribute("disabled");
            }
        }
        if(i === 1){
            if(!(checkboxFilter[i+1].disabled)){
                checkboxFilter[i+1].disabled = "true";
                checkboxFilter[i-1].disabled = "true";
                isSauce.disabled = "true";
            }else{
                checkboxFilter[i+1].removeAttribute("disabled");
                checkboxFilter[i-1].removeAttribute("disabled");
                isSauce.removeAttribute("disabled");
            }
        }
        if(i === 2){
            if(!(checkboxFilter[i-1].disabled)){
                checkboxFilter[i-1].disabled = "true";
                checkboxFilter[i-2].disabled = "true";
                isSauce.disabled = "true";
            }else{
                checkboxFilter[i-1].removeAttribute("disabled");
                checkboxFilter[i-2].removeAttribute("disabled");
                isSauce.removeAttribute("disabled");
            }
        }
    })
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
        for(let i = 0; i < checkboxFilter.length; ++i){
            checkboxFilter[i].disabled="true";
        }
        const ul = document.getElementById("chosenSauce");
        ul.innerHTML = "";
        for (let i = 1; i < selector.length; ++i) {
            selector[i].disabled = false;
        }
    } else {
        selector.disabled = false;
        for(let i = 0; i < checkboxFilter.length; ++i){
            checkboxFilter[i].removeAttribute("disabled")
        }
    }
})



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
    inputIngredient.id = "myInput"
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
        div.innerHTML = ""
            --counter;
    })
})


//////////////////////////////////////////////////!



function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
  }
  
    arrIngredients = JSON.parse(arrIngredients) //arrIngredients from admin.ejs file
    let addButton = document.getElementById("addIngredient")
    autocomplete(ing[0],arrIngredients); 
   addButton.addEventListener("click",()=>{
    for(let i = 0; i < ing.length; ++i){
        autocomplete(ing[i],arrIngredients);
    }
    });
    


    
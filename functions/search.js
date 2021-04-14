

function dishIngredients(doc,array){
        for(let i = 0; i < doc.length; ++i){
            for(let j = 0; j < doc[i].ingredients.name.length; ++j){
                array.push(doc[i].ingredients.name[j])
            }
        }
    return {
        array
    }
}

function advancedDishIngredients(doc,array){
    for(let i = 0; i < doc.length; ++i){
        for(let j = 0; j < doc[i].contain.length; ++j){
            for(let k = 0; k < doc[i].contain[j].ingredients.name.length; ++k){
                array.push(doc[i].contain[j].ingredients.name[k])
            }
        }
    }
return {
    array
}
}   

function dishSearchRight(doc,array,searchArr){
    let right = 0;
    for(let i = 0; i < doc.length; ++i){
        let ingNameLength = doc[i].ingredients.name.length
        for(let j = 0; j <ingNameLength; ++j){
            for (let k = 0; k < searchArr.length; ++k) {
                if (searchArr[k] === doc[i].ingredients.name[j])
                    ++right;
            }
        }
        if (right / ingNameLength > 0.495) {
            array.push(doc[i])
        }
        right = 0;
    }
return {
    array
}
}   

function advancedDishSearchRight(doc,array,searchArr){
    let right = 0;
    for(let i = 0; i < doc.length; ++i){
        let advancedIngNameLength = doc[i].ingredients.name.length
        for(let j = 0; j <advancedIngNameLength; ++j){
            for (let k = 0; k < searchArr.length; ++k) {
                if (searchArr[k] === doc[i].ingredients.name[j]) {
                    ++right;
                }
            }
            let values = sauceIngPercent(doc,i,searchArr)
            if  (((right+values.right)/(advancedIngNameLength+values.number))>0.495) {
                array.push(doc[i])
                break;
            }
        }
    }
return {
    array
}
}   

function sauceIngPercent (advancedDish,advancedDishIndex, searchArr) {
    let right = 0;
    let number = 0;
    
        
        for(let i = 0; i < advancedDish[advancedDishIndex].contain.length;++i){
            number = advancedDish[advancedDishIndex].contain[i].ingredients.name.length;
            for(let j = 0; j < number;++j){
                for(let k = 0; k<searchArr.length;++k){
                    if(searchArr[k]===advancedDish[advancedDishIndex].contain[i].ingredients.name[j]){
                        ++right;
                        
                    }
                }
            }
        }
    return {
        right,
        number
    };
}

module.exports ={
    dishIngredients,
    advancedDishIngredients,
    dishSearchRight,
    advancedDishSearchRight,
}
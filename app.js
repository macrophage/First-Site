

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mongooseDynamic = require ('mongoose-dynamic-schemas');
const app = express();

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/foodDB", {useNewUrlParser: true});

const port = process.env.port || 3000;
//! ********************************************************************************************* !\\

const sauceSchema = {
    name: {type: String, required: true},
    ingredients: [String],
    // ingredients: [{
    //     name: String,
    //     amount: Number,
    // }],
    recipe: {type: String, required: true},
    description: {type: String, required: false},
    time: Number,
    nutritionalValue: {
        proteins: Number,
        fats: Number,
        carbohydrates: Number,
        calories: Number
    },
    

}

const dishSchema = {
    name: { type: String, required: true },
    ingredients: [String],
    recipe: {type: String, required: true},
    description:{type:String,required: false},
    time: Number,
    nutritionalValue: {
        proteins: Number,
        fats: Number,
        carbohydrates: Number,
        calories: Number
    },
}

const advancedDishSchema = {
    name: { type: String, required: true },
    ingredients: [String],
    recipe: {type: String, required: true},
    description:{type:String,required: false},
    time: Number,
    nutritionalValue: {
        proteins: Number,
        fats: Number,
        carbohydrates: Number,
        calories: Number
    },
    contain: [sauceSchema],
    
}
const advancedDish = mongoose.model("AdvancedDish", advancedDishSchema);
const sauce = mongoose.model("Sauce", sauceSchema);
const dish = mongoose.model("Dish", dishSchema);

//! ********************************************************************************************* !\\


app.get("/",(req,res)=>{
    sauce.find((error,result)=>{
        
         res.render("admin",{sauceName:result})
         advancedDish.find((error,result)=>{
            console.log(result[2].contain[0]);
        })  
    })
    
    
})
app.post('/', function(req, res){
   
    if(req.body.isItSauce === "true"){
        
        
        const updateSauce =  {
            name: req.body.name,
            recipe: req.body.recipe,
            description: req.body.description,
            time: req.body.time,
            nutritionalValue:{
                carbohydrates: req.body.carbohydrates,
                proteins: req.body.proteins,
                fats: req.body.fats,
                calories: req.body.calories,
            },
            ingredients: req.body.ingredients,
        };
        sauce.findOneAndUpdate({name:req.body.name},updateSauce,{upsert:true},(err,result)=>{
                
        })
    }else{
        
        let sauceArr;
        sauceArr = req.body.invisibleOptionInput;
        const sauceQuantityArr = req.body.optionInput;
        if(sauceArr === undefined){
            const updateDish =  {
                name: req.body.name,
                recipe: req.body.recipe,
                description: req.body.description,
                time: req.body.time,
                nutritionalValue:{
                    proteins: req.body.proteins,
                    fats: req.body.fats,
                    carbohydrates: req.body.carbohydrates,
                    calories: req.body.calories,
                },
                ingredients: req.body.ingredients,
            };
            dish.findOneAndUpdate({name:req.body.name},updateDish,{upsert:true},(err,result)=>{
                    
            })
        } else{
            const sauceArrOfObj = []
            sauce.find((error,result)=>{
            if(Array.isArray(sauceArr)){
                
                for(let i = 0; i<sauceArr.length; ++i){
                    for(let k = 0; k < result.length; ++k){
                        if(result[k].name === sauceArr[i]){
                            sauceArrOfObj.push(result[k]) 
                        } 
                    }
                }
            }else{
                for(let i = 0; i < result.length; ++i){
                    if(result[i].name === sauceArr){
                        sauceArrOfObj.push(result[i])
                    }
                }
            }
            const updateAdvancedDish =  {
                name: req.body.name,
                ingredients: req.body.ingredients,
                recipe: req.body.recipe,
                description: req.body.description,
                time: req.body.time,
                nutritionalValue:{
                    proteins: req.body.proteins,
                    fats: req.body.fats,
                    carbohydrates: req.body.carbohydrates,
                    calories: req.body.calories,
                },
                contain: sauceArrOfObj
            };
            advancedDish.findOneAndUpdate({name:req.body.name},updateAdvancedDish,{upsert:true},(err,result)=>{
                
            })
               
           })
          
            
            
        }
       
        
    }
   
    
   
    
    
res.redirect("/")
});
app.get("/test",(req,res)=>{
    let i =0;
     dish.find((err,result)=>{
        res.render("main",{test: result})
        
    })
    
    
})

app.listen(port,()=>{
    console.log("Live");
})




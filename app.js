

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

let counter = 0;



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
    }
}
const listSchema = {
    items:[dishSchema]
}
const dish = mongoose.model("Dish", dishSchema);
const list = mongoose.model("Item",listSchema);
let dishArr = [];
//! ********************************************************************************************* !\\


app.get("/",(req,res)=>{
    res.render("admin.ejs");
    
    
})
app.post('/', function(req, res){
    const update =  {
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
        ingredients: req.body.ingredients
        
    };
    
    dish.findOneAndUpdate({name:req.body.name},update,{upsert:true},(err,res)=>{
        console.log(res);
    })
    
    
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


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

const dish = mongoose.model("Dish", dishSchema);

const food = new dish 

app.get("/",(req,res)=>{
    res.render("admin.ejs");
    
    
})
app.post('/', function(req, res){
    food.name = req.body.name;
    food.recipe = req.body.recipe;
    food.description = req.body.description;
    food.time = req.body.time;
    food.nutritionalValue.proteins = req.body.proteins;
    food.nutritionalValue.fats = req.body.fats;
    food.nutritionalValue.carbohydrates = req.body.carbohydrates;
    food.nutritionalValue.calories=req.body.calories;
    
   console.log(req.body);
 
    
    // console.log(food);
   
});

app.listen(port,()=>{
    console.log("Live");
})
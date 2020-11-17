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
const ragu = new dish;
ragu.name = "ragu";
ragu.ingredients.push("myaso");
ragu.ingredients.push("riba");
ragu.description = "optional";
ragu.nutritionalValue[0]=13;
ragu.nutritionalValue[1]=12;
ragu.nutritionalValue[2]=33;
ragu.nutritionalValue[3]=4551;
ragu.time = 4;


app.get("/",(req,res)=>{
    res.render("admin.ejs");
    console.log(ragu)
})
app.post("/",(req,res)=>{
    
})

app.listen(port,()=>{
    console.log("Live");
})
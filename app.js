const _ = require('lodash');
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mongooseDynamic = require('mongoose-dynamic-schemas');//!
const app = express();
const multer = require('multer');
const fs = require('fs');

//set storage engine 
const storage = multer.diskStorage({
    destination: './public/images/uploads',
    filename: function (req, file, callback) {
        callback(null, file.fieldname + ".jpg");
      }
    });


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/foodDB", {
    useNewUrlParser: true
});

const port = process.env.port || 3000;
//! ********************************************************************************************* !\\

const sauceSchema = {
    name: {
        type: String,
        required: true
    },

    ingredients: {
        name: [String],
        amount: [Number],
    },
    recipe: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    time: Number,
    nutritionalValue: {
        proteins: Number,
        fats: Number,
        carbohydrates: Number,
        calories: Number
    },


}

const dishSchema = {
    name: {
        type: String,
        required: true
    },
    ingredients: {
        name: [String],
        amount: [Number],
    },
    recipe: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    time: Number,
    nutritionalValue: {
        proteins: Number,
        fats: Number,
        carbohydrates: Number,
        calories: Number
    },

}

const advancedDishSchema = {
    name: {
        type: String,
        required: true
    },
    ingredients: {
        name: [String],
        amount: [Number],
    },
    recipe: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    time: Number,
    nutritionalValue: {
        proteins: Number,
        fats: Number,
        carbohydrates: Number,
        calories: Number
    },
    contain: [sauceSchema],
    containAmount: [Number]

}
const advancedDish = mongoose.model("AdvancedDish", advancedDishSchema);
const sauce = mongoose.model("Sauce", sauceSchema);
const dish = mongoose.model("Dish", dishSchema);

//! ********************************************************************************************* !\\
app.get("/main/dish/:selfPage", function(req, res) {

    const selfPage = req.params.selfPage;
    dish.exists({
        name: selfPage
    }, (err, boolean) => {
        if (boolean) {
            dish.find({
                name: selfPage
            }, (err, dish) => {
                res.render("dish.ejs", {
                    dish: dish,
                    name: selfPage
                });
            })
        }
    })
})

app.get("/main/advanced-dish/:selfPage", function(req, res) {
    const selfPage = req.params.selfPage;
    advancedDish.exists({
        name: selfPage
    }, (err, boolean) => {
        if (boolean) {
            advancedDish.find({
                name: selfPage
            }, (err, advancedDish) => {
                res.render("advancedDish.ejs", {
                    advancedDish: advancedDish,
                    name: selfPage
                });
            })
        }
    })
})

app.get("/main/sauce/:selfPage", function(req, res) {
    const selfPage = req.params.selfPage;
    sauce.exists({
        name: selfPage
    }, (err, boolean) => {
        if (boolean) {
            sauce.find({
                name: selfPage
            }, (err, sauce) => {
                res.render("sauce.ejs", {
                    sauce: sauce,
                    name: selfPage
                });
            })
        }
    })
})//! three different get's in case we have same names


app.get("/admin", (req, res) => {
    sauce.find((error, result) => {

        res.render("admin", {
            sauceName: result
        })
        dish.find((error, result) => {

        })
    })


})

app.get("/table", (req, res) => {

 

    dish.find((err, resDish) => {
        advancedDish.find((err, resAdvanced) => {
            sauce.find((err, resSauce) => {
                res.render("table.ejs", {
                    dish: resDish,
                    advancedDish: resAdvanced,
                    sauce: resSauce
                });
            })
        })

    })

})
app.get("/tableToUpdate",(req,res)=>{
    dish.find((err, resDish) => {
        advancedDish.find((err, resAdvanced) => {
            sauce.find((err, resSauce) => {
                res.render("tableToUpdate.ejs", {
                    dish: resDish,
                    advancedDish: resAdvanced,
                    sauce: resSauce
                });
            })
        })
    })
    
})
//!send 3 kind of dishes to main
app.get("/", (req, res) => {
    dish.find({},(err,dish)=>{
        advancedDish.find({},(err,advancedDish)=>{
            sauce.find({},(err,sauce)=>{
                res.render("main",{dish:dish,
                    advancedDish:advancedDish,
                    sauce:sauce});
            })
        })
    })
    
})


app.post('/', function(req, res) {




    if (req.body.isItSauce === "true") {


        const updateSauce = {
            name: req.body.name,
            recipe: req.body.recipe,
            description: req.body.description,
            time: req.body.time,
            nutritionalValue: {
                carbohydrates: req.body.carbohydrates,
                proteins: req.body.proteins,
                fats: req.body.fats,
                calories: req.body.calories,
            },
            ingredients: {
                name: req.body.ingredient,
                amount: req.body.ingredientQuantity
            }

        };
        sauce.findOneAndUpdate({
            name: req.body.name
        }, updateSauce, {
            upsert: true
        }, (err, result) => {

        })
    } else {

        let sauceArr;
        sauceArr = req.body.invisibleOptionInput;
        const sauceQuantityArr = req.body.optionInput;
        if (sauceArr === undefined) {

            const updateDish = {
                name: req.body.name,
                recipe: req.body.recipe,
                description: req.body.description,
                time: req.body.time,
                nutritionalValue: {
                    proteins: req.body.proteins,
                    fats: req.body.fats,
                    carbohydrates: req.body.carbohydrates,
                    calories: req.body.calories,
                },

                ingredients: {
                    name: req.body.ingredient,
                    amount: req.body.ingredientQuantity
                }
            };
            dish.findOneAndUpdate({
                name: req.body.name
            }, updateDish, {
                upsert: true
            }, (err, result) => {

            })
        } else {
            const sauceArrOfObj = []
            sauce.find((error, result) => {
                if (Array.isArray(sauceArr)) {

                    for (let i = 0; i < sauceArr.length; ++i) {
                        for (let k = 0; k < result.length; ++k) {
                            if (result[k].name === sauceArr[i]) {
                                sauceArrOfObj.push(result[k])
                            }
                        }
                    }
                } else {
                    for (let i = 0; i < result.length; ++i) {
                        if (result[i].name === sauceArr) {
                            sauceArrOfObj.push(result[i])
                        }
                    }
                }
                const updateAdvancedDish = {
                    name: req.body.name,
                    ingredients: {
                        name: req.body.ingredient,
                        amount: req.body.ingredientQuantity
                    },
                    recipe: req.body.recipe,
                    description: req.body.description,
                    time: req.body.time,
                    nutritionalValue: {
                        proteins: req.body.proteins,
                        fats: req.body.fats,
                        carbohydrates: req.body.carbohydrates,
                        calories: req.body.calories,
                    },
                    contain: sauceArrOfObj,
                    containAmount: req.body.optionInput
                };
                advancedDish.findOneAndUpdate({
                    name: req.body.name
                }, updateAdvancedDish, {
                    upsert: true
                }, (err, result) => {

                })

            })



        }


    }
    
    res.redirect("/TableToUpdate")
});




app.post("/table", (req, result) => {

    dish.exists({
        _id: req.body.remove
    }, (err, res) => {
        if (err) {
            console.log(err)
        } else {
            if (res) {
                dish.findOne({_id:req.body.remove},(request,dishRes)=>{
                    if(fs.existsSync('./public/images/uploads/'+(dishRes.name.replace(/\s+/g, ''))+".jpg"))
                        fs.unlinkSync('./public/images/uploads/'+(dishRes.name.replace(/\s+/g, ''))+".jpg");
                        dish.findByIdAndDelete(req.body.remove, err => {
                        if (err) {
                            console.log(err);
                        }
                        
                    })
                })
            }
        }
    })
    
    advancedDish.exists({
        _id: req.body.remove
    }, (err, res) => {
        if (err) {
            console.log(err)
        } else {
            if (res) {
                advancedDish.findOne({_id:req.body.remove},(request,advancedDishRes)=>{
                    if(fs.existsSync('./public/images/uploads/'+(advancedDishRes.name.replace(/\s+/g, ''))+".jpg"))
                        fs.unlinkSync('./public/images/uploads/'+(advancedDishRes.name.replace(/\s+/g, ''))+".jpg");
                    advancedDish.findByIdAndDelete(req.body.remove, err => {
                        if (err) {
                            console.log(err);
                        }
                        
                    })
                })
            }
        }
    })

    sauce.exists({
        _id: req.body.remove
    }, (err, res) => {
        if (err) {
            console.log(err)
        } else {
            if (res) {
                advancedDish.find({}, (err, advancedDishRes) => {
                    sauce.findOne({
                        _id: req.body.remove
                    }, (err, sauceRes) => {
                        //!if advanced dish contain this sauce 
                        let namesArr = [];
                        for (let i = 0; i < advancedDishRes.length; ++i) {
                            for (let k = 0; k < advancedDishRes[i].contain.length; ++k) {

                                if (req.body.remove.toString() === advancedDishRes[i].contain[k]._id.toString()) {

                                    namesArr.push(advancedDishRes[i].name);
                                }
                            }
                        }
                        if (namesArr.length > 0) {
                            result.render("deleteError.ejs", {
                                namesArr: namesArr
                            })
                        } else {
                            sauce.findByIdAndDelete(req.body.remove, err => {
                                if (err) {
                                    console.log(err);
                                }
                                if(fs.existsSync('./public/images/uploads/'+(sauceRes.name.replace(/\s+/g, ''))+".jpg"))
                                        fs.unlinkSync('./public/images/uploads/'+(sauceRes.name.replace(/\s+/g, ''))+".jpg");
                            })
                        }
                    })
                })

            }
        }
    })

})
let key
app.post("/tableToUpdate",(req,res)=>{
    key = req.body.update;
    res.render("update.ejs",{key:key})
})
app.post("/addImage",(req,res)=>{
    // init upload 
    const upload = multer ({
         storage: storage
    }).single(""+key.replace(/\s+/g, ''));
    upload(req,res, (err) => {
        if(err){
        }
    });
    res.redirect("/")
});


app.listen(port, () => {
    console.log("Live");
})
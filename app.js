const _ = require('lodash');
const express = require("express");

const { ROLE } = require('./public/data')

const bodyParser = require("body-parser");
const passport = require('passport');
const flash = require('connect-flash');
const mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
const bcrypt = require('bcrypt');
const app = express();
//passport config
require("./public/config/passport")(passport)
//
const session = require('express-session');


const multer = require('multer');
const fs = require('fs');


const advancedDish = require ("./models/dish").advancedDish
const dish = require ("./models/dish").dish
const sauce = require ("./models/dish").sauce


// Load User model
const User = require("./models/users")
const { forwardAuthenticated, ensureAuthenticated, authRole } = require('./public/config/auth');

  
//set storage engine 
const storage = multer.diskStorage({
    destination: './public/images/uploads',
    filename: function (req, file, callback) {
        callback(null, file.fieldname + ".jpg");
      }
    });




app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
//express-session
app.use(session({ cookie: { maxAge: 3.6e+6 }, 
    secret: 'woot',
    resave: false, 
    saveUninitialized: false}));
//Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/foodDB", {
    useNewUrlParser: true
});

const port = process.env.port || 3000;

//! ********************************************************************************************* !\\






//! ********************************************************************************************* !\\
//login and logout handler
app.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);
// Logout
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
    req.flash('success_msg', 'You are logged out');
  });
//
app.get('/login', function(req, res) {
    if(req.isAuthenticated()){
        res.redirect("/dashboard")
    }else{
        res.render("login.ejs");
    }
    
})
app.get('/register', function(req, res) {
    res.render("register.ejs");
})



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
                    name: selfPage,
                    currentUser:req.user
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
                    name: selfPage,
                    currentUser:req.user
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
                    name: selfPage,
                    currentUser:req.user
                });
            })
        }
    })
})//! three different get's in case we have same names


app.get("/admin",ensureAuthenticated,authRole(ROLE.ADMIN), (req, res) => {
    sauce.find((error, result) => {

        res.render("admin", {
            sauceName: result,
            currentUser:req.user,
        })
        dish.find((error, result) => {

        })
    })


})

app.get("/table",ensureAuthenticated,authRole(ROLE.ADMIN), (req, res) => {

 

    dish.find((err, resDish) => {
        advancedDish.find((err, resAdvanced) => {
            sauce.find((err, resSauce) => {
                res.render("table.ejs", {
                    dish: resDish,
                    advancedDish: resAdvanced,
                    sauce: resSauce,
                    currentUser:req.user
                });
            })
        })

    })

})
app.get("/tableToUpdate",ensureAuthenticated,authRole(ROLE.ADMIN), (req,res)=>{
    dish.find((err, resDish) => {
        advancedDish.find((err, resAdvanced) => {
            sauce.find((err, resSauce) => {
                res.render("tableToUpdate.ejs", {
                    dish: resDish,
                    advancedDish: resAdvanced,
                    sauce: resSauce,
                    currentUser:req.user
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
                    sauce:sauce,
                    currentUser:req.user
                });
            })
        })
    })
    
})
app.get("/filter-meat",(req,res)=>{
    dish.find({},(err,dish)=>{
        advancedDish.find({},(err,advancedDish)=>{
            sauce.find({},(err,sauce)=>{
                res.render("meatPage",{dish:dish,
                    advancedDish:advancedDish,
                    sauce:sauce,
                    currentUser:req.user});
            })
        })
    })
})
app.get("/filter-fish",(req,res)=>{
    dish.find({},(err,dish)=>{
        advancedDish.find({},(err,advancedDish)=>{
            sauce.find({},(err,sauce)=>{
                res.render("fishPage",{dish:dish,
                    advancedDish:advancedDish,
                    sauce:sauce,
                    currentUser:req.user});
            })
        })
    })
})
app.get("/filter-vegetables",(req,res)=>{
    dish.find({},(err,dish)=>{
        advancedDish.find({},(err,advancedDish)=>{
            sauce.find({},(err,sauce)=>{
                res.render("vegetablesPage",{dish:dish,
                    advancedDish:advancedDish,
                    sauce:sauce,
                    currentUser:req.user});
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
            let meat, fish, vegetables;
            if(req.body.meat){
                meat = true;
                fish = false;
                vegetables = false;
            }if(req.body.fish){
                meat = false;
                fish = true;
                vegetables = false;
            }if(req.body.vegetables){
                meat = false;
                fish = false;
                vegetables = true;
            }
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
                },
                meat: meat,
                fish: fish,
                vegetables: vegetables
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
                let meat, fish, vegetables;
                if(req.body.meat){
                    meat = true;
                    fish = false;
                    vegetables = false;
                }if(req.body.fish){
                    meat = false;
                    fish = true;
                    vegetables = false;
                }if(req.body.vegetables){
                    meat = false;
                    fish = false;
                    vegetables = true;
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
                    containAmount: req.body.optionInput,
                    meat: meat,
                    fish: fish,
                    vegetables: vegetables
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
                                namesArr: namesArr,
                                currentUser:req.user
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
    res.render("update.ejs",{key:key,
        currentUser:req.user})
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
app.post("/register", (req,res)=>{
   
    const { name, email, password, password2 } = req.body;
    let errors = [];
  
    if (!name || !email || !password || !password2) {
      errors.push({ msg: 'Please enter all fields' });
    }
  
    if (password != password2) {
      errors.push({ msg: 'Passwords do not match' });
    }
  
    if (password.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters' });
    }
  
    if (errors.length > 0) {
      res.render('register', {
        errors,
        name,
        email,
        password,
        password2
      });
    } else {
      User.findOne({ email: email }).then(user => {
        if (user) {
          errors.push({ msg: 'Email already exists' });
          res.render('register', {
            errors,
            name,
            email,
            password,
            password2
          });
        } else {
          var newUser = new User({
            name,
            email,
            password
          });
          if(req.body.adminCode == "admin"){
              newUser.isAdmin = true;
              newUser.role = "admin";
          }
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => {
                  req.flash(
                    'success_msg',
                    'You are now registered and can log in'
                    
                  );
                  
                  res.redirect('/login');
                })
                .catch(err => console.log(err));
            });
          });
        }
      });
    }
  });
  
  
app.post("/login",(req,res,next) =>{
    
    passport.authenticate('local',{
    successRedirect:"/dashboard",
    failureRedirect:"/login",
    failureFlash:true
})(req,res,next);
});


function checkAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}
app.listen(port, () => {
    console.log("Live");
})
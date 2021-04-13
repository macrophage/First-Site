const mongoose = require('mongoose');
const dishSchema = require("./dish").dishSchema
const advancedDishSchema = require("./dish").advancedDishSchema
const sauceSchema = require("./dish").sauceSchema

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  isAdmin:{type:Boolean,default:false},
  role:{
    type:String,
    default:"basic"
  },
  
    favoriteDish: [dishSchema],
    favoriteAdvancedDish: [advancedDishSchema],
    favoriteSauce: [sauceSchema]
  
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
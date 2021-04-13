const mongoose = require("mongoose");

const sauceSchema = new mongoose.Schema({
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


})

const dishSchema = new mongoose.Schema({
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
    meat: Boolean,
    fish: Boolean,
    vegetables: Boolean
})

const advancedDishSchema = new mongoose.Schema({
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
    containAmount: [Number],
    meat: Boolean,
    fish: Boolean,
    vegetables: Boolean
})
const advancedDish = mongoose.model("AdvancedDish", advancedDishSchema);
const sauce = mongoose.model("Sauce", sauceSchema);
const dish = mongoose.model("Dish", dishSchema);

module.exports = {dish,sauce,advancedDish,dishSchema,advancedDishSchema,sauceSchema}


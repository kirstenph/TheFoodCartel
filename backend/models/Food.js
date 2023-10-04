const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    stock:{
        type: Number,
        require: true
    },
    price:{
        type: Number,
        require: true
    },
    image:{
        url: String,
        filename: String
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    dateCreated:{
        type : Date, 
        default: Date.now
    }
});

module.exports = mongoose.model("Food", foodSchema);
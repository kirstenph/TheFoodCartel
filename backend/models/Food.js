const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
    category: String,
    name: {
        type: String,
        require: true
    },
    stock: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    vat: {
        type: Number,
    },
    image: {
        url: String,
        filename: String
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    isBestseller: {
        type: Boolean,
        default: false,
    },
    desc: {
        type: String,
    },
    goodFor: {
        type: Number
    }
}, { timestamps: true });

module.exports = mongoose.model("Food", foodSchema);
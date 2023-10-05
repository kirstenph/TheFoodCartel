const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
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
    isActive: {
        type: Boolean,
        default: true,
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
    }
}, { timestamps: true });

module.exports = mongoose.model("Food", foodSchema);
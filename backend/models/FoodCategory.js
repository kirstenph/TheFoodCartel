const mongoose = require("mongoose");

const FoodCategorySchema = new mongoose.Schema({
    name: String,
    foods: [
        ObjectId("product1"),
        ObjectId("product2")
      ]
}, { timestamps: true });

module.exports = mongoose.model("Food Category", FoodCategorySchema);
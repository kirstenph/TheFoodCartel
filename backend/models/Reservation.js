const mongoose = require("mongoose");

const reserveSchema = new mongoose.Schema({
    tablenum: String,
    guestnum: String,
    date: Date,
    time: String,
    description: String
})

module.exports = mongoose.model("Reserve", reserveSchema);
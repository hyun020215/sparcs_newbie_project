const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    title: String,
    date: Date,
    author: String,
    content: String
}, { timestamps: true });

module.exports = schema;

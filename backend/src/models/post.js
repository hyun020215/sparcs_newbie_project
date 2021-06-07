const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    title: String,
    date: String,
    author: String,
    content: String
}, { timestamps: true });

module.exports = schema;

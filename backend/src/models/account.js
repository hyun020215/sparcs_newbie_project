const mongoose = require("mongoose");
const Post = require("./post");

const schema = new mongoose.Schema({
	accountID: String,
	accountPassword: String,
	accountNickname: String,
    posts: {
        type: [Post],
        default: []
    }
}, { timestamps: true });

const AccountModel = mongoose.model("accounts", schema);

module.exports = AccountModel;

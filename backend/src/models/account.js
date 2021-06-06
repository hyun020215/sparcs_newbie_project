const mongoose = require("mongoose");
const Post = require("./post");

const schema = new mongoose.Schema({
	_accountID: String,
	_accountPassword: String,
	_accountNickname: String,
    posts: {
        type: [Post],
        default: []
    }
}, { timestamps: true });

const AccountModel = mongoose.model("accounts", schema);

module.exports = AccountModel;

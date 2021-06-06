const AccountModel = require("./models/account");

function checkAccount(accountID, accountPassword, callback) {
    AccountModel.exists({ _accountID: accountID, _accountPassword: accountPassword }, (error, result) => {
        callback(result);
    });
}

function checkID(accountID, callback) {
    AccountModel.exists({ _accountID: accountID }, (error, result) => {
        callback(result);
    });
}

function signIn(accountID, accountPassword, accountNickname, callback) {
    const newAccount = new AccountModel({
        accountID,
        accountPassword,
        accountNickname
    });
    newAccount.save((error, result) => {
        callback(result);
    });
}

function withdraw(accountID, callback) {
    AccountModel.deleteOne({ _accountID: accountID }, (error, result) => {
        callback(result);
    });
}

function editInfo(accountID, newAccountID, newAccountPassword, newAccountNickname, callback) {
    AccountModel.find({ _accountID: accountID }, function (error, element) {
        element._accountID = newAccountID;
        element._accountPassword = newAccountPassword;
        element._accountNickname = newAccountNickname;
        element.save(function (err, result) {
            callback(result);
        });
    });
}

function getPosts(accountID, callback) {
    AccountModel.find({ _accountID: accountID }, (error, element) => {
        callback(element.posts);
    });
}

function addPost(accountID, title, date, author, content, callback) {
    AccountModel.findById(accountID, function (error, element) {
        element.posts.add(newPost);
        element.save(function (err, result) {
            callback(result);
        });
    });
}

function removePost(accountID, postID, callback) {
    AccountModel.findById(accountID, function (err, element) {
        element.posts.remove(postID);
        element.save(function (err, result) {
            callback(result);
        });
    });
}

function editPost(id, callback) {
    AccountModel.findById(accountID, function (err, element) {
        element.posts.find(postID);
        element.save(function (err, result) {
            callback(result);
        });
    });
}

module.exports = {
    checkAccount,
    checkID,
    signIn,
    withdraw,
    editInfo,
    getPosts,
    addPost,
    removePost,
    editPost
};

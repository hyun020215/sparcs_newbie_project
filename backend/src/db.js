const AccountModel = require("./models/account");

function checkAccount(accountID, accountPassword, callback) {
    AccountModel.exists({ accountID: accountID, accountPassword: accountPassword }, (error, result) => {
        callback(result);
    });
}

function findAccount(accountID, callback) {
    AccountModel.findOne({ accountID: accountID }, (error, result) => {
        callback(result);
    });
}

function checkID(accountID, callback) {
    AccountModel.exists({ accountID: accountID }, (error, result) => {
        callback(result);
    });
}

function signIn(accountID, accountPassword, callback) {
    const accountNickname = "TemporaryNickname";
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
    AccountModel.remove({ accountID: accountID }, (error, result) => {
        callback(result);
    });
}

function editInfo(accountID, newAccountID, newAccountPassword, newAccountNickname, callback) {
    AccountModel.findOneAndUpdate({ accountID: accountID },
        { $set: { accountID: newAccountID, accountPassword: newAccountPassword, accountNickname: newAccountNickname } },
        { returnNewDocument: true }, (error, result) => {
            callback(result);
        });
}

function getPosts(accountID, callback) {
    AccountModel.findOne({ accountID: accountID }, (error, element) => {
        if (element != null) {
            if (element.posts == null) callback([]);
            else callback(element.posts);
        }
    });
}

function addPost(accountID, title, date, author, content, callback) {
    const newPost = {
        title,
        date,
        author,
        content
    };
    AccountModel.updateOne({ accountID: accountID }, { $push: { posts: newPost } }, function (error, result) {
        callback(result);
    });
}

function removePost(accountID, postID, callback) {
    AccountModel.updateOne({ accountID: accountID }, { $pull: { posts: { _id: postID } } }, function (error, result) {
        callback(result);
    });
}

function editPost(accountID, callback) {
    AccountModel.findOne({ accountID: accountID }, function(err, element) {
        element.posts.find(postID);
        element.save(function (err, result) {
            callback(result);
        });
    });
}

module.exports = {
    checkAccount,
    findAccount,
    checkID,
    signIn,
    withdraw,
    editInfo,
    getPosts,
    addPost,
    removePost,
    editPost
};

const AccountModel = require("./models/account");

function getPosts(accountID, callback) {
    AccountModel.find({ _accountID: accountID }, (error, element) => {
        callback(element.posts);
    });
}

function addPost(accountID, title, date, author, content, callback) {
    AccountModel.findById(accountID, function (err, element) {
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
  getPosts,
  addPost,
  removePost,
  editPost
};

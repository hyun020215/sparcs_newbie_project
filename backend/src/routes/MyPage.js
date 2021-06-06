const express = require("express");
const db = require("../db");
const router = express.Router();

router.get("/:accountID", (req, res) => {
    db.getPosts(req.params.accountID, (items) => {
        if (items == null) res.json([]);
        else res.json(items);
    });
});

router.post("/:accountID", (req, res) => {
    const { title, date, author, content } = req.body;
    db.addPost(req.params.accountID, title, date, author, content, (newItem) => {
        res.json(newItem);
    });
});

router.delete("/:accountID/:id", (req, res) => {
    db.removePost(req.params.accountID, req.params.id, () => {
        res.status(200).send();
    });
});

router.put("/:accountID/:id/edit", (req, res) => {
    db.editPost(req.params.accountID, req.params.id, () => {
        res.status(200).send();
    });
});

module.exports = router;

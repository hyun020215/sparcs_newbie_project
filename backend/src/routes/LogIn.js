const express = require("express");
const db = require("../db");
const router = express.Router();

router.get("/:accountID/:accountPW", (req, res) => {
    db.findAccount(req.params.accountID, (account) => {
        if (account != null) {
            if (account.accountPassword == req.params.accountPW) res.json(account);
            else res.status(500).send("Login failed! Wrong Password!");
        }
        else res.status(500).send("Login failed! Wrong ID!");
    });
});

router.post("/", (req, res) => {
    const { accountID, accountPW } = req.body;
    db.findAccount(accountID, (result) => {
        if (result != null) res.status(500).send("ID already exists!");
        else {
            db.signIn(accountID, accountPW, () => {
                db.findAccount(accountID, (account) => {
                    res.json(account);
                });
            });
        }
    });
});

router.delete("/:accountID", (req, res) => {
    console.log(req.params.accountID);
    db.withdraw(req.params.accountID, () => {
        res.status(200).send("Withdrew successfully!");
    });
});

router.put("/", (req, res) => {
    const { accountID, ID, password, nickname } = req.body.accountID;
    
    db.editInfo(accountID, ID, password, nickname, (account) => {
        console.log(account);
        res.status(200).json(account);
    });
});

module.exports = router;

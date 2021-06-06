const express = require("express");
const db = require("../db");
const router = express.Router();

router.get("/", (req, res) => {
    const { accountID, accountPW } = req.body;
    db.checkAccount(accountID, accountPW, (result) => {
        if (result) {
            db.findAccount(accountID, (account) => {
                res.json(account);
            });
        }
        else res.send("Login failed!");
    });
});

router.post("/", (req, res) => {
    const { accountID, accountPW } = req.body;
    db.checkID(accountID, (result) => {
        if (result) res.send("ID already exists!");
        else {
            db.signIn(accountID, accountPW, () => {
                res.send("Signed in successfully!");
            });
        }
    });
});

router.delete("/", (req, res) => {
    db.withdraw(req.params.accountID, () => {
        res.status(200).send("Withdrew successfully!");
    });
});

router.put("/", (req, res) => {
    const { accountID, newAccountID, newAccountPassword, newAccountNickname } = req.body;
    db.checkID(newAccountID, (result) => {
        if (result) res.send("ID already exists!");
        else {
            db.editInfo(accountID, newAccountID, newAccountPassword, newAccountNickname, () => {
                res.send("Profile changed successfully!");
            });
        }
    });
});

module.exports = router;

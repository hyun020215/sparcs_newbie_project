const axios =require("axios");

const express = require("express");
const router = express.Router();

const client_id = 's5UxxqAfHTE0E2DXDf7e';
const client_secret = 'rVe4hx9xtU';

router.get("/:query", (req, res) => {

    const query = req.params.query;
    const reqOptions = {
        headers: {
            'X-Naver-Client-Id': client_id,
            'X-Naver-Client-Secret': client_secret
        },
        params: {
            query: query
        }
    };
    try {
        axios.get('https://openapi.naver.com/v1/search/book.json', reqOptions).then(response => {
            console.log(response.data);
            return res.json(response.data)
        });
    } catch (e) {
        return res.json({
            status: 400,
            message: e
        });
    }
});

module.exports = router;

const express = require('express');
const { getPublicToken } = require('../services/forge/auth.js');
const {getInternalToken}= require('../services/forge/auth.js')

let router = express.Router();

router.get('/token', async function (req, res, next) {
    try {
        res.json(await getInternalToken());
    } catch (err) {
        next(err);
    }
});

module.exports = router;
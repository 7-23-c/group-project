const express = require('express');
const router = express.Router();
const TokenController = require('../controllers/tokens');

router.post('/token', (req, res, next) =>
TokenController.getToken(req, res, next));

router.post('/reset-token', (req, res) =>
TokenController.checkToken(req, res));

module.exports = router;
const express = require('express');
const router = express.Router();
const TokenController = require('../controllers/tokens');
const Authorize = require('../helpers/authorize');

router.post('/token', (req, res, next) => TokenController.getToken(req, res, next));

module.exports = router;
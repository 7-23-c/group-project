const express = require('express');
const router = express.Router();
const imageController = require('../controllers/images');

router.post('/images', (req, res, next) =>
imageController.uploadImage(req, res, next));

module.exports = router;
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authentication');
const User = require('../models/user');

// example of using a controller
router.get('/', (req, res, next) => AuthController.getRoot(req, res, next));

module.exports = router;
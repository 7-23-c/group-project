const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users');

router.post('/users', (req, res, next) => UserController.createNewUser(req, res, next));

module.exports = router;
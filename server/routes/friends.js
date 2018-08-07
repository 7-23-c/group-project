const express = require('express');
const router = express.Router();
const friendsController = require('../controllers/friends');

// retrieve a list of friends
router.get('/friends', (req, res, next) => 
friendsController.getFriends(req, res, next));

// send a friend request
router.post('/friends/:id', (req, res, next) =>
friendsController.addFriend(req, res, next));

// accept a friend request
router.put('/friends/:id', (req, res, next) =>
friendsController.acceptFriend(req, res, next));

// remove a friend
router.delete('/friends/:id', (req, res, next) =>
friendsController.removeFriend(req, res, next));

module.exports = router;
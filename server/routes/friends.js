const express = require('express');
const router = express.Router();
const friendsController = require('../controllers/friends');
const Verify = require('../helpers/verify');

// retrieve a list of friends
router.get('/friends', Verify, (req, res, next) => 
friendsController.getFriends(req, res, next));

// send a friend request
router.post('/friends/:id', Verify, (req, res, next) =>
friendsController.addFriend(req, res, next));

// accept a friend request
router.put('/friends/:id', Verify, (req, res, next) =>
friendsController.acceptFriend(req, res, next));

// remove a friend
router.delete('/friends/:id', Verify, (req, res, next) =>
friendsController.removeFriend(req, res, next));

module.exports = router;
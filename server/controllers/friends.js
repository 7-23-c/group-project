const friendsController = {};
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/settings').jwtSecret;
const extractJwt = require('../helpers/extract');
const User = require('../models/user');

friendsController.getFriends = function(req, res) {
    if (req.query && req.query.friend) {
        User.findOne({ username: req.query.friend })
        .then(user => {
            return res.status(200).json({
                friend: {
                    id: user.id
                }
            });
        })
        .catch(() => {
            return res.status(404).json({
                error: 'No user found.'
            });
        });
    } else {
        jwt.verify(extractJwt(req), jwtSecret, function(err, decoded) {
            if (err) {
                return res.status(500).json({
                    error: 'An unknown error occurred.'
                });
            } else {
                User.findById(decoded.id, 'friends').populate('friends.friend_id', 'username')
                    .then(user => {
                        // filter accepted friends
                        var friends = user.friends.filter(friend => friend.accepted);
                        // filter pending friend requests
                        var pending = user.friends.filter(friend => !friend.accepted && !friend.sender);
    
                        var returnedFriends = friends.map(id => id.friend_id);
                        var returnedPending = pending.map(id => id.friend_id);
                        
                        return res.status(200).json({
                            friends: returnedFriends,
                            pending: returnedPending
                        });
                    })
                    .catch(() => {
                        return res.status(500).json({
                            error: 'Something unexpected happened.'
                        });
                    });
            }
        });
    }

    
};

friendsController.addFriend = function(req, res) {
    jwt.verify(extractJwt(req), jwtSecret, function(err, decoded) {
        if (err) {
            return res.status(500).json({
                error: 'Something unexpected happened.'
            });
        } else {
            User.findById(decoded.id)
            .then(user => {
                var friendAdded = user.friends.filter(theFriend => theFriend.friend_id.toString() === req.params.id);
                if (friendAdded.length > 0) {
                    throw 'You\'ve already sent this user a friend request.';
                } else if (req.params.id === decoded.id) {
                    throw 'You can\'t add yourself as a friend!';
                } else {
                    return User.findById(req.params.id);
                }
            })
            .then(user => {
                if (!user) {
                    throw 'A user with that id was not found.';
                }
                
                var newFriend = {
                    friend_id: decoded.id
                };

                user.friends.push(newFriend);

                return user.save();            
            })
            .then(() => {
                return User.findById(decoded.id);
            })
            .then(user => {
                var newFriendSender = {
                    friend_id: req.params.id,
                    sender: true
                };

                user.friends.push(newFriendSender);

                return user.save();
            })
            .then(() => {
                return res.status(200).json({
                    success: 'Friend request sent!'
                });
            })
            .catch(err => {
                return res.status(400).json({
                    error: err
                });
            });
        }
    });
};

friendsController.removeFriend = function(req, res) {
    jwt.verify(extractJwt(req), jwtSecret, function(err, decoded) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                error: 'Something unexpected happened.'
            });
        } else {
            User.update({ _id: decoded.id}, { $pull: { 'friends': { friend_id: req.params.id }}}, { safe: true, multi: false })
            .then(() => {
                return User.update({ _id: req.params.id }, { $pull: { 'friends': { friend_id: decoded.id }}}, { safe: true, multi: false });
            })
            .then(() => {
                return res.status(200).json({
                    success: 'Friend removed!'
                });
            })
            .catch(err => {
                return res.status(500).json({
                    error: err
                });
            });
        }
    });
};

friendsController.acceptFriend = function(req, res) {
    jwt.verify(extractJwt(req), jwtSecret, function(err, decoded) {
        User.findById(decoded.id)
            .then(user => {
                var myFriend = user.friends.filter(friend => friend.friend_id === req.params.id);
            
                if (!myFriend.accepted && !myFriend.sender) {
                    var myFriendIndex = user.friends.findIndex(friend => friend.friend_id.toString() === req.params.id);

                    user.friends[myFriendIndex].accepted = true;

                    return user.save();
                } else {
                    throw 'You\'ve already accepted this friend request. Please wait for the other user to accept it.';
                }
            })
            .then(() => {
                return User.findById(req.params.id);
            })
            .then(friend => {
                var myIndex = friend.friends.findIndex(friend => friend.friend_id.toString() === decoded.id);
            
                friend.friends[myIndex].accepted = true;

                return friend.save();
            })
            .then(() => {
                return res.status(200).json({
                    success: 'Accepted friend request.'
                });
            })
            .catch(err => {
                return res.status(500).json({
                    error: err
                });
            });
    });
};

module.exports = friendsController;
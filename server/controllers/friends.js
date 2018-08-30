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
                error: 'Something unexpected happened.1'
            });
        } else {
            User.findById(decoded.id)
                .then(user => {
                    var friendAdded = user.friends.filter(theFriend => theFriend.friend_id.toString() === req.params.id);
                    var myId = user.friends.filter(myId => myId.friend_id.toString() === decoded.id);
                    if (friendAdded.length > 0) {
                        return res.status(400).json({
                            error: 'You\'ve already sent this user a friend request.'
                        });
                    } else if (myId.length > 0) {
                        return res.status(400).json({
                            error: 'You can\'t add yourself as a friend!'
                        });
                    } else {
                        User.findById(req.params.id)
                            .then(friend => {
                                var newFriendSender = {
                                    friend_id: friend.id,
                                    sender: true
                                };
                                var newFriend = {
                                    friend_id: user.id
                                };

                                user.friends.push(newFriendSender);
                                friend.friends.push(newFriend);

                                user.save()
                                    .then(() => {
                                        friend.save()
                                            .then(() => {
                                                return res.status(201).json({
                                                    success: 'Friend request sent.'
                                                });
                                            })
                                            .catch(() => {
                                                return res.status(500).json({
                                                    error: 'Something unexpected happened.2'
                                                });
                                            });
                                    })
                                    .catch(() => {
                                        return res.status(500).json({
                                            error: 'Something unexpected happened.3'
                                        });
                                    });
                            })
                            .catch(() => {
                                return res.status(500).json({
                                    error: 'Something unexpected happened.4'
                                    //error: err
                                });
                            });
                    }
                })
                .catch(() => {
                    return res.status(500).json({
                        error: 'Something unexpected happened.5'
                    });
                });
        }
    });
};

friendsController.removeFriend = function(req, res) {
    jwt.verify(extractJwt(req), jwtSecret, function(err, decoded) {
        if (err) {
            return res.status(500).json({
                error: 'Something unexpected happened.'
            });
        } else {
            User.update({ _id: decoded.id}, { $pull: { 'friends': { friend_id: req.params.id }}}, { safe: true, multi: false })
                .then(() => {
                    User.update({ _id: req.params.id }, { $pull: { 'friends': { friend_id: decoded.id }}}, { safe: true, multi: false })
                        .then(() => {
                            return res.status(204).json({
                                success: 'Friend removed!'
                            });
                        })
                        .catch(() => {
                            return res.status(500).json({
                                error: 'Something unexpected happened.'
                            });
                        });
                })
                .catch(() => {
                    return res.status(500).json({
                        error: 'Something unexpected happened.'
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

                    user.save()
                        .then(() => {
                            User.findById(req.params.id)
                                .then(friend => {
                                    var myIndex = friend.friends.findIndex(friend => friend.friend_id.toString() === decoded.id);
                                
                                    friend.friends[myIndex].accepted = true;

                                    friend.save()
                                        .then(() => {
                                            return res.status(204).json({
                                                success: 'Accepted friend request.'
                                            });
                                        })
                                        .catch(() => {
                                            return res.status(500).json({
                                                error: 'Something unexpected happened.'
                                            });
                                        });
                                })
                                .catch(() => {
                                    return res.status(500).json({
                                        error: 'Something unexpected happened.'
                                    });
                                });
                        })
                        .catch(() => {
                            return res.status(500).json({
                                error: 'Something unexpected happened.'
                            });
                        });
                } else {
                    return res.status(400).json({
                        error: 'You\'ve already accepted this friend request. Please wait for the other user to accept it.'
                    });
                }
            })
            .catch(() => {
                return res.status(500).json({
                    error: 'Something unexpected happened.'
                });
            });
    });
};

module.exports = friendsController;
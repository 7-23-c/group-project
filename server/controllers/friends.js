const friendsController = new Object();
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/settings').jwtSecret;
const extractJwt = require('../helpers/extract');
const User = require('../models/user');

friendsController.getFriends = function(req, res, next) {    
    jwt.verify(extractJwt(req), jwtSecret, function(err, decoded) {
        if (err) {
            return res.status(500).json({ error: 'An unknown error occurred.'})
        } else {
            User.findById(decoded.id, 'friends').populate('friends.friend_id', 'username').exec(function(err, user) {
                if (err) {
                    return res.json({ error: 'Something unexpected happened. Please try again.'})
                } else {
                    var friends = user.friends.filter(friend => friend.accepted);
                    var pending = user.friends.filter(friend => !friend.accepted && !friend.sender);

                    var returnedFriends = friends.map(id => id.friend_id);
                    var returnedPending = pending.map(id => id.friend_id);
                    
                    return res.json({ friends: returnedFriends, pending: returnedPending });
                }
            });
        }
    });
}

friendsController.addFriend = function(req, res, next) {
    jwt.verify(extractJwt(req), jwtSecret, function(err, decoded) {
        if (err) {
            return res.json({ error: 'Something unexpected happened. Please try again.' });
        } else {
            User.findById(decoded.id, function(err, user) {
                var friendAdded = user.friends.filter(theFriend => theFriend.friend_id.toString() === req.params.id);

                if (err) {
                    return res.json({ error: 'Something unexpected happened. Please try again.'});
                } else if (friendAdded.length > 0) {
                    return res.json({ error: 'You\'ve already sent this user a friend request.'});
                } else {
                    User.findById(req.params.id, function(err, friend) {
                        if (err) {
                            return res.json({ error: 'Something unexpected happened. Please try again.'});
                        } else {
                            var newFriendSender = {
                                friend_id: friend.id,
                                sender: true
                            }

                            var newFriend = {
                                friend_id: user.id
                            }
                            user.friends.push(newFriendSender);
                            friend.friends.push(newFriend);

                            user.save(function(err) {
                                if (err) {
                                    return res.json({ error: 'Something unexpected happened. Please try again.' });
                                } else {
                                    friend.save(function(err) {
                                        if (err) {
                                            return res.json({ error: 'Something unexpected happened. Please try again.'});
                                        } else {
                                            return res.json({ success: 'Friend request sent.'});
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}

friendsController.removeFriend = function(req, res, next) {
    jwt.verify(extractJwt(req), jwtSecret, function(err, decoded) {
        if (err) {
            return res.json({ error: 'Something unexpected happened. Please try again.' });
        } else {
            User.update({ _id: decoded.id}, { $pull: { 'friends': { friend_id: req.params.id }}}, { safe: true, multi: false }).exec(function(err) {
                if (err) {
                    return res.json({ error: 'Unable to remove friend. Please try again.' });
                } else {
                    User.update({ _id: req.params.id }, { $pull: { 'friends': { friend_id: decoded.id }}}, { safe: true, multi: false }).exec(function(err) {
                        if (err) {
                            return res.json({ error: 'Unable to remove friend. Please try again.' });
                        } else {
                            return res.json({ success: 'Friend removed!' });
                        }
                    })
                }
            });
        }
    });
}

friendsController.acceptFriend = function(req, res, next) {
    jwt.verify(extractJwt(req), jwtSecret, function(err, decoded) {
        User.findById(decoded.id, function(err, user) {
            var myFriend = user.friends.filter(friend => friend.friend_id === req.params.id);
            
            if (!myFriend.accepted && !myFriend.sender) {
                var myFriendIndex = user.friends.findIndex(friend => friend.friend_id.toString() === req.params.id);

                user.friends[myFriendIndex].accepted = true;

                user.save(function(err) {
                    if (err) {
                        return res.json({ error: 'Unable to accept friend request.' });
                    } else {
                        User.findById(req.params.id, function(err, friend) {
                            var myIndex = friend.friends.findIndex(friend => friend.friend_id.toString() === decoded.id);
                            
                            friend.friends[myIndex].accepted = true;

                            friend.save(function(err) {
                                if (err) {
                                    return res.json({ error: 'Something weird happened. Not able to accept friend request.' })
                                } else {
                                    return res.json({ success: 'Accepted friend request.' });
                                }
                            });
                        });
                    }
                });
            } else {
                res.json({ error: 'You have to be the sender of the request to accept a friend request.'});
            }
        });
    });
}

module.exports = friendsController;
const friendsController = new Object();
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET || process.env.JWT_SECRET_DEV;
const User = require('../models/user');

friendsController.getFriends = function(req, res, next) {
    var token = req.headers.authorization.split(' ')[1];
    
    jwt.verify(token, jwtSecret, function(err, decoded) {
        if (err) {
            return res.json({ error: 'Something unexpected happened. Please try again.'})
        } else {
            User.findById(decoded.id, 'friends', function(err, user) {
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
    var token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, jwtSecret, function(err, decoded) {
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
    var token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, jwtSecret, function(err, decoded) {
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
// in progress
}

module.exports = friendsController;
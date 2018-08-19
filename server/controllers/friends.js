const friendsController = new Object();
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/settings').jwtSecret;
const extractJwt = require('../helpers/extract');
const User = require('../models/user');

friendsController.getFriends = function(req, res, next) {    
    jwt.verify(extractJwt(req), jwtSecret, function(err, decoded) {
        if (err) {
            return res.status(500).json({
                error: 'An unknown error occurred.'
            })
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
                .catch(err => {
                    return res.status(500).json({
                        error: 'Something unexpected happened.'
                    })
                })
        }
    });
}

friendsController.addFriend = function(req, res, next) {
    jwt.verify(extractJwt(req), jwtSecret, function(err, decoded) {
        if (err) {
            return res.status(500).json({
                error: 'Something unexpected happened.1'
            });
        } else {
            User.findById(decoded.id)
                
                .then(user => {
                    console.log("///////// USER Details ///////")
                    console.log( user);
                    console.log("I want to get rid of this id,right? : " +"user._id " + user._id)
                    delete user._id;
                    console.log("user._id after delete is: " + user._id);
                    console.log("//////// END OF USER ////////");

                    console.log("///////// USER Details ///////")
                    console.log(user);
                    console.log("//////// END OF USER ////////");
                    var friendAdded = user.friends.filter(theFriend => theFriend.friend_id.toString() === req.params.id);
                    if (friendAdded.length > 0) {

                        return res.status(400).json({
                            error: 'You\'ve already sent this user a friend request.'
                        });
                    } else {
                        console.log("Friend I want to add:");
                        console.log("User.findById: " + req.params.id);
                        //console.log(req.params.id);
                        User.findById(req.params.id)
                        

                            .then(friend => {
                                console.log("friend.id: " + friend.id)
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
                                
                                    .then(data => {
                                        //console.log("friend: " + friend)
                                        friend.save()
                                            .then(data => {
                                                return res.status(201).json({
                                                    success: 'Friend request sent.'
                                                });
                                            })
                                            .catch(err => {
                                                console.log(err);

                                                return res.status(500).json({
                                                    error: 'Something unexpected happened.2'
                                                });
                                            })
                                    })
                                    .catch(err => {
                                        console.log(err);

                                        return res.status(500).json({
                                            error: 'Something unexpected happened.3'
                                        });
                                    })
                            })
                            .catch(err => {
                                console.log(err);
                                return res.status(500).json({
                                    error: 'Something unexpected happened.4'
                                    //error: err
                                });
                            })
                    }
                })
                .catch(err => {
                    return res.status(500).json({
                        error: 'Something unexpected happened.5'
                    });
                })
        }
    });
}

friendsController.removeFriend = function(req, res, next) {
    jwt.verify(extractJwt(req), jwtSecret, function(err, decoded) {
        if (err) {
            return res.status(500).json({
                error: 'Something unexpected happened.'
            });
        } else {
            User.update({ _id: decoded.id}, { $pull: { 'friends': { friend_id: req.params.id }}}, { safe: true, multi: false })
                .then(data => {
                    User.update({ _id: req.params.id }, { $pull: { 'friends': { friend_id: decoded.id }}}, { safe: true, multi: false })
                        .then(data => {
                            return res.status(204).json({
                                success: 'Friend removed!'
                            });
                        })
                        .catch(err => {
                            return res.status(500).json({
                                error: 'Something unexpected happened.'
                            });
                        })
                })
                .catch(err => {
                    return res.status(500).json({
                        error: 'Something unexpected happened.'
                    });
                })
        }
    });
}

friendsController.acceptFriend = function(req, res, next) {
    jwt.verify(extractJwt(req), jwtSecret, function(err, decoded) {
        User.findById(decoded.id)
            .then(user => {
                var myFriend = user.friends.filter(friend => friend.friend_id === req.params.id);
            
                if (!myFriend.accepted && !myFriend.sender) {
                    var myFriendIndex = user.friends.findIndex(friend => friend.friend_id.toString() === req.params.id);

                    user.friends[myFriendIndex].accepted = true;

                    user.save()
                        .then(data => {
                            User.findById(req.params.id)
                                .then(friend => {
                                    var myIndex = friend.friends.findIndex(friend => friend.friend_id.toString() === decoded.id);
                                
                                    friend.friends[myIndex].accepted = true;

                                    friend.save()
                                        .then(data => {
                                            return res.status(204).json({
                                                success: 'Accepted friend request.'
                                            });
                                        })
                                        .catch(err => {
                                            return res.status(500).json({
                                                error: 'Something unexpected happened.'
                                            })
                                        })
                                })
                                .catch(err => {
                                    return res.status(500).json({
                                        error: 'Something unexpected happened.'
                                    })
                                })
                        })
                        .catch(err => {
                            return res.status(500).json({
                                error: 'Something unexpected happened.'
                            });
                        })
                } else {
                    return res.status(400).json({
                        error: 'You\'ve already accepted this friend request. Please wait for the other user to accept it.'
                    });
                }
            })
            .catch(err => {
                return res.status(500).json({
                    error: 'Something unexpected happened.'
                });
            })
    });
}

module.exports = friendsController;
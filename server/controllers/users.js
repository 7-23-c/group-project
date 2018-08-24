const UserController = new Object();
const passport = require('passport');
const User = require('../models/user');
const sendEmail = require('../helpers/emailer.js');
const extractJwt = require('../helpers/extract.js');
const jwtSecret = require('../config/settings').jwtSecret;
const jwt= require('jsonwebtoken')

require('../config/passport');

/*
* If we have extra time near the end of the project
* Go back and add login attempt tracking
* Lock an account after too many attempts were made
*/
UserController.createNewUser = function(req, res, next) {
    passport.authenticate('local-registration', function(err, user, info) {
        if (err) {
            return res.status(500).json(info);
        }
        if (!user) {
            return res.status(400).json(info)
        }
        return res.status(201).json(info);
    })(req, res, next);
}

UserController.updateUser = function(req, res, next) {
    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    error: 'Unable to find a user with given information.'
                })
            }

            // start saving updated user details
            if (req.body.email) {
                user.local.email = req.body.email;
            }
            if (req.body.username) {
                user.username = req.body.username;
            }
            if (req.body.password) {
                user.local.password = user.generateHash(req.body.password);
            }

            user.save()
                .then(data => {
                    return res.status(204).json({
                        success: 'User updated successfully!'
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
            })
        })
}

UserController.deleteUser = function(req, res, next) {
    User.findById(req.params.id)
        .then(user => {
            user.remove()
                .then(data => {
                    return res.status(204).json({
                        success: 'User deleted successfully!'
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

//Password Reset
UserController.forgotPassword = function(req, res){
    const randomString = length => {
        let text = "";
        const possible = "abcdefghijklmnopqrstuvwxyz0123456789_-.";
        for (let i = 0; i< length; i++) {
            text+= possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
        
        User.findOne({'local.email': req.body.email})
        .then(user => {
            const token = randomString(40);
            const emailData = {
                to: user.local.email,
                subject: "Beacon Password Reset Instructions",
                text: `Please use the following link for instruction to reset your password: http://localhost:5000/resetpass/${token}`,
                html: `<p>Please use the link below for isntruction to reset your password.</p><p>http://localhost:5000/resetpass/${token}</p>`,
            };
            user.resetPassLink = token;
            user.save()
            .then(data => {
                sendEmail(emailData);
                return res.status(200).json({message: `Email has been sent to ${user.local.email}`});
            })
        })
}

UserController.resetPassword = function(req, res){
    const {resetpasslink, newPassword} = req.body;
    if (!req.body) return res.status(400).json({message: 'No Request Body'});
    User.findOne({'resetPassLink':resetpasslink})
    .then(user => {
        user.local.password = user.generateHash(newPassword)
        user.resetPassLink = ""
        user.save()
        .then(data => {
            return res.status(200).json({message: 'Password updated succesfully'})
        })
    })
}

module.exports = UserController;
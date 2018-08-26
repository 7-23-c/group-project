const UserController = new Object();
const passport = require('passport');
const User = require('../models/user');

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

UserController.findUser = function (req, res) {
    User.findOne({ 'username': req.query.username })
        .select('username')
        .then(user => {
            return res.status(200).json({
                user: user
            });
        })
        .catch(() => {
            return res.status(500).json({
                error: 'An unknown error occurred'
            });
        });
};

module.exports = UserController;
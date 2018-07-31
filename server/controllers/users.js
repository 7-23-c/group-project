const UserController = new Object();
const passport = require('passport');
const User = require('../models/user');

/*
* If we have extra time near the end of the project
* Go back and add login attempt tracking
* Lock an account after too many attempts were made
*/
UserController.createNewUser = function(req, res, next) {
    passport.authenticate('local-registration', function(err, user, info) {
        if (err) {
            return res.json({ error: 'Something unexpected happened.'});
        }
        if (!user) {
            return res.json({ error: 'That email address is already in use.' })
        }
        return res.json({ success: 'Created user successfully!'})
    })(req, res, next);
}

UserController.updateUser = function(req, res, next) {
    let token = req.headers.authorization;
    let jwtSecret = JWT_SECRET || JWT_SECRET_DEV;
    
    jwt.verify(token, jwtSecret, function(error, decoded) {
        User.findById(decoded.id, function(err, user) {
            if (err) {
                return res.json({ error: 'Something unexpected happened.' })
            }
            if (!user) {
                return res.json({ error: 'Unable to update user.' })
            }

            // start saving updated user details
            if (req.body.email) {
                user.local.email = req.body.email;
            }
            if (req.body.username) {
                user.username = req.body.username;
            }
            if (req.body.password) {
                user.local.password = req.body.password;
            }

            user.save(function(err) {
                if (err) {
                    return res.json({ error: 'Unable to update user.' });
                }
                return res.json({ success: 'User updated successfully!' });
            });
        });
    });
}

UserController.deleteUser = function(req, res, next) {
    let token = req.headers.authorization;
    let jwtSecret = JWT_SECRET || JWT_SECRET_DEV;
    
    jwt.verify(token, jwtSecret, function(error, decoded) {
        User.findById(decoded.id, function(err, user) {
            if (err) {
                return res.json({ error: 'Something unexpected happened.' });
            }

            user.remove(function(err) {
                if (err) {
                    return res.json({ error: 'Something unexpected happened.' });
                }
                return res.json({ success: 'User deleted successfully!' });
            });
        });
    });
}

module.exports = UserController;
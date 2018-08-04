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
            return res.json(info);
        }
        if (!user) {
            return res.json(info)
        }
        return res.json(info);
    })(req, res, next);
}

UserController.updateUser = function(req, res, next) {
    User.findById(req.params.id, function(err, user) {
        if (err) {
            return res.json({ error: 'Unable to update user at this time.' })
        }
        if (!user) {
            return res.json({ error: 'Unable to update user at this time.' })
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

        user.save(function(err) {
            if (err) {
                return res.json({ error: 'Unable to update user at this time.' });
            }
            return res.json({ success: 'User updated successfully!' });
        });
    });
}

UserController.deleteUser = function(req, res, next) {
    User.findById(req.params.id, function(err, user) {
        if (err) {
            return res.json({ error: 'Something unexpected happened.' });
        }

        user.remove(function(err) {
            if (err) {
                return res.json({ error: 'Unable to delete user at this time.' });
            }
            return res.json({ success: 'User deleted successfully!' });
        });
    });
}

module.exports = UserController;
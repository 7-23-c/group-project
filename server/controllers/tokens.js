const TokenController = {};
const passport = require('passport');
const User = require('../models/user');

require('../config/passport');

TokenController.getToken = function(req, res, next) {
    passport.authenticate('generate-token', function(err, user, info) {
        if (err) {
            return res.status(500).json(info);
        }
        if (!user) {
            return res.status(400).json(info);
        }
        return res.status(200).json(info);
    })(req, res, next);
};

TokenController.checkToken = function(req, res) {
    User.findOne({ resetPassLink: req.body.resetToken })
    .then(user => {
        if (!user) {
            throw 'Password reset link expired or doesn\'t exist.';
        }
        return res.status(200).json({
            message: 'Token is valid.'
        });
    })
    .catch(err => {
        return res.status(500).json({
            error: err
        });
    });
};

module.exports = TokenController;
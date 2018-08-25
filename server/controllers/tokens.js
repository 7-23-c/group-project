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
            return res.status(500).json({
                message: 'Token is invalid.'
            });
        }
        return res.status(200).json({
            message: 'Token is valid.'
        });
    })
    .catch(() => {
        return res.status(500).json({
            error: 'Password reset link expired'
        });
    })
}

module.exports = TokenController;
const TokenController = {};
const passport = require('passport');

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

module.exports = TokenController;
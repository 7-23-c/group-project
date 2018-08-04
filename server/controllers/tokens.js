const TokenController = new Object();
const passport = require('passport');

require('../config/passport');

TokenController.getToken = function(req, res, next) {
    passport.authenticate('generate-token', function(err, user, info) {
        if (err) {
            return res.json(info);
        }
        if (!user) {
            return res.json(info)
        }
        return res.json(info);
    })(req, res, next);
}

module.exports = TokenController;
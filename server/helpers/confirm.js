const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/settings').jwtSecret;
const extractJWT = require('./extract');

function Confirm(req, res, next) {
    jwt.verify(extractJWT(req), jwtSecret, function(err, decoded) {
        if (err) {
            return res.status(500).json({
                error: 'Something unexpected happen.'
            });
        } else if (decoded) {
            return next();
        } else {
            return res.status(403).json({
                error: 'Unauthorized Access.'
            });
        }
    });
}

module.exports = Confirm;
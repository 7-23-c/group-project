const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/settings').jwtSecret;
const extractJwt = require('../helpers/extract');

function Verify(req, res, next) {
    jwt.verify(extractJwt(req), jwtSecret, function (err, decoded) {
        if (err) {
            return res.status(401).json({
                error: 'Invalid token.'
            });
        }

        req.locals = {};
        req.locals.decoded = decoded;

        return next();
    });
}

module.exports = Verify;
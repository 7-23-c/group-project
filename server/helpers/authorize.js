const jwt = require('jsonwebtoken');

/*
* Helper :: Authorize
*
* Verifies that the id from the token provided by the user,
* matches the id of whom they are trying to modify.
*/
function Authorize(req, res, next) {
    var id = req.params.id;
    var token = req.headers.token;
    var jwtSecret = process.env.JWT_SECRET || process.env.JWT_SECRET_DEV;
    
    jwt.verify(token, jwtSecret, function(err, decoded) {
        if (err) {
            return res.json({ error: 'Unauthorized Access.'})
        } else if (decoded.id === id) {
            return next();
        } else {
            return res.json({ error: 'Unauthorized Access.'});
        }
    });
}

module.exports = Authorize;
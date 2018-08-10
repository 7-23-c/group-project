const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/settings').jwtSecret;
/*
* Helper :: Authorize
*
* Verifies that the id from the token provided by the user,
* matches the id of whom they are trying to modify.
*/
function Authorize(req, res, next) {
    var id = req.params.id;
    var token = req.headers.authorization.split(' ')[1];
    
    jwt.verify(token, jwtSecret, function(err, decoded) {
        if (err) {
            return res.json({ error: 'Something unexpected happen. Please try again.'})
        } else if (decoded.id === id) {
            return next();
        } else {
            return res.json({ error: 'Unauthorized Access.'});
        }
    });
}

module.exports = Authorize;
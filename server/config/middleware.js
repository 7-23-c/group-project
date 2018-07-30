const middleware = new Object();
const jwt = require('jsonwebtoken');
const jwtSecret = JWT_SECRET || JWT_SECRET_DEV;

// verify token
// THIS IS A WORK IN PROGRESS... NOT CURRENTLY IN USE
middleware.jwtVerify = function(token) {
    jwt.verify(token, jwtSecret, function(err, decoded) {
        if (err) {
            throw new Error(err);
        }
        console.log(decoded.id)
    });
}

module.exports = middleware;
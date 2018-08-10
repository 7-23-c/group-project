/*
* Helper :: Extract
*
* 
* Extracts the JSON Web Token from the Authorization Bearer header
*/
function Extract(req) {
    if (!req.headers) {
        return null;
    } else if (!req.headers.authorization) {
        return null;
    } else {
        var headers = req.headers.authorization.split(' ');
        var bearerIndex = headers.findIndex(el => el === 'Bearer');
        return headers[bearerIndex + 1];
    }
}

module.exports = Extract;
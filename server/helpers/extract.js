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

Extract('Bearer kj;lj324234lkj;lasdf');

module.exports = Extract;
// example controller file
const AuthController = new Object();

AuthController.getRoot = function(req, res, next) {
    res.send('Hello, world!');
}

module.exports = AuthController;
const finalhandler = require('finalhandler');
const http = require('http');
const  logger = require('morgan');
 
// create "middleware"

function Logger(req, res, next) {
    var done = finalhandler(req, res, next)
  logger(req, res, function (err) {
    if (err) return done(err)
 
    // respond to request
    res.setHeader('content-type', 'text/plain')
    res.end('hello, world!')
  })
};

module.export = Logger
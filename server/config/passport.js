// all passport configuration will go here
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use('local-registration', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function (req, email, password, done) {
    User.findOne({
      'local.email': email
    }, function (err, user) {
      if (err) {
        return done(null, false, {
          error: 'Something unexpected happen. Please try again.'
        });
      }

      if (user) {
        return done(null, false, {
          error: 'That email address is already in use.'
        });
      }

      var newUser = new User();

      newUser.local.email = email;
      newUser.local.password = newUser.generateHash(password);
      newUser.name.first = req.body.fName;
      newUser.name.last = req.body.lName;
      newUser.username = req.body.username;

      newUser.save(function (err) {
        if (err) throw err;
        return done(null, newUser, {
          message: 'User created successfully!'
        });
      });
    });
  }
));


/*
 var strategy = new Strategy(params, function (payload, done) {
    //finding the user in the database
    console.log(payload);
    models.users.findById(parseInt(payload.userId))
        .then((user) => {
            //if the user is found
            if (user) {
                return done(null, {
                    id: user.id,
                    username: user.username
                });
            } else {
                return done(new Error("User not found"), null);
            }
        }).catch((err) => {
        console.log(err);
            return done(new Error("uncaught error! try again later"), null);
        })
});

  module.exports = {
    initialize: function () {
        return passport.initialize();
    },
    authenticate: function (req, res, next) {
        return passport.authenticate("jwt", {
            session: false
        }, (err, user, info) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            if (!user) {
                return res.json({
                    status: 'error',
                    error: 'ANOTHORIZED_USER'
                });
            }
            // Forward user information to the next middleware
            req.user = user; 
            next();
        })(req, res, next);
    }
};

//import the express router
var express = require('express');
var router = express.Router();
//here I am importing the functions defined above, I put them in the config folder
var jwt_login_strategy = require('../config/jwt-login-strategy');
//and finally use the jwt_login_strategy as a middleware
router.post('something', jwt_login_strategy.authenticate, your_other_middleware(req, res, next)=>{...});

*/

module.exports = passport;
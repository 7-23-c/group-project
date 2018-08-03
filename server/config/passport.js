// all passport configuration will go here
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use('local-registration', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},
    function(req, email, password, done) {
        User.findOne({ 'local.email': email }, function (err, user) {
            if (err) { return done(null, false, { error: 'Something unexpected happen. Please try again.'}); }

            if (user) {
                return done(null, false, { error: 'That email address is already in use.' });
            }

            var newUser = new User();

            newUser.local.email = email;
            newUser.local.password = newUser.generateHash(password);
            newUser.name.first = req.body.fName;
            newUser.name.last = req.body.lName;
            newUser.username = req.body.username;

            newUser.save(function(err){
                if(err) throw err;
                return done(null, newUser, { message: 'User created successfully!'});
            });
        });
    }
));
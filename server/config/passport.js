// all passport configuration will go here
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');

passport.use('local-registration', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    function(email, password, done) {
        User.findOne({ email: email }, function (err, user) {
            if (err) { return done(err); }
            if (user) {
                return done(null, false);
            }
            var newUser = new User();
            newUser.email = email;
            newUser.password = newUser.generateHash(password);
            newUser.save(function(err){
                if(err) throw err;
                return done(null, newUser);
            });
        });
    }
));
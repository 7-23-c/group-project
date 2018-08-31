// module imports
require('dotenv').config(); // DEVELOPMENT ONLY
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const logger = require('morgan');
const helmet = require('helmet');
const app = express();

// runs our database configuration
require('./server/config/database')();

// PRODUCTION ONLY
// app.use(express.static(path.join(__dirname, 'client/build')));

// app middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());

// initialize passport
app.use(passport.initialize());


// all api related routes go here
app.use('/', [
    require('./server/routes/users'),
    require('./server/routes/beacons'),
    require('./server/routes/friends'),
    require('./server/routes/images'),
    require('./server/routes/tokens')
]);

// PRODUCTION ONLY
// app.get('*', (req, res) => {
//    res.sendFile(path.join(__dirname + '/client/build/index.html'));
// });

// Development mode port
const port = process.env.PORT || 5000;
app.listen(port);

module.exports = app;

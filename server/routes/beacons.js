const express = require('express');
const router = express.Router();
const BeaconController = require('../controllers/beacons');
const Authorize = require('../helpers/authorize');

router.post('/beacons/:id', Authorize, (req, res, next) => BeaconController.createNewBeacon(req, res, next));

module.exports = router;
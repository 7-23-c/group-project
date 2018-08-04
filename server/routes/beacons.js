const express = require('express');
const router = express.Router();
const BeaconController = require('../controllers/beacons');

router.post('/beacons', (req, res, next) => BeaconController.createNewBeacon(req, res, next));

module.exports = router;
const express = require('express');
const router = express.Router();
const BeaconController = require('../controllers/beacons');
const Verify = require('../helpers/verify');

router.get('/beacons', Verify, (req, res, next) =>
BeaconController.findAllBeacons(req, res, next));

router.get('/nearby', Verify, (req, res, next) =>
BeaconController.findNearbyBeacons(req, res, next));

router.get('/beacons/:id', Verify, (req, res) =>
BeaconController.findOneBeacon(req, res));

router.put('/beacons/:id', Verify, (req, res, next) =>
BeaconController.updateBeacon(req, res, next) );

router.delete('/beacons/:id', Verify, (req, res, next) =>
BeaconController.deleteBeacon(req, res, next));

module.exports = router;
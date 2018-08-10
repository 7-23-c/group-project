const express = require('express');
const router = express.Router();
const BeaconController = require('../controllers/beacons');

router.post('/beacons', (req, res, next) =>
BeaconController.createNewBeacon(req, res, next));

router.get('/beacons', (req, res, next) =>
BeaconController.findAllBeacons(req, res, next));

router.get('/beacons/:id', (req, res, next) =>
BeaconController.findOneBeacon(req, res, next));

router.put('/beacons/:id', (req, res, next) =>
BeaconController.updateBeacon(req, res, next) );

router.delete('/beacons/:id', (req, res, next) =>
BeaconController.deleteBeacon(req, res, next));

module.exports = router;
const BeaconController = {};
const Beacon = require('../models/beacon');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/settings').jwtSecret;
const extractJwt = require('../helpers/extract');

BeaconController.findAllBeacons = (req, res) => {
    jwt.verify(extractJwt(req), jwtSecret, function(err, decoded){
        Beacon.find({created_by: decoded.id})
            .limit(10)
            //.populate('created_by', 'username')
            .then(beacons => {
                return res.status(200).json({
                    beacons: beacons
                });
            })
            .catch(() => {
                return res.status(500).json({
                    error: 'An unknown error occurred.'
                });
            });
    });
};

BeaconController.findNearbyBeacons = (req, res) => {
    jwt.verify(extractJwt(req), jwtSecret, function(err, decoded) {
        Beacon.find({
            created_by: decoded.id,
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [req.query.longitude, req.query.latitude]
                      },
                      $maxDistance: 50
                }
            },
        })
        .then(beacons => {
            return res.status(200).json({
                beacons: beacons
            });
        })
        .catch(err => {
            console.log(err);
        });
    });
};

BeaconController.findOneBeacon = (req, res) => {
    jwt.verify(extractJwt(req), jwtSecret, function(err, decoded) {
        Beacon.findById(req.params.id)
        .populate('created_by', 'name.first name.last')
            .then(beacon => {
                if(!beacon) {
                    return res.status(404).json({
                        error: 'Beacon not found.'
                    });            
                } else if (beacon.created_by.id.toString() !== decoded.id) {
                    return res.status(403).json({
                        error: 'Unauthorized Access.'
                    });
                } else {
                    return res.status(200).json({
                        beacon: beacon
                    });
                }
            })
            .catch(() => {
                return res.status(500).json({
                    error: 'An unknown error occurred.'
                });
            });
    });
};

BeaconController.updateBeacon = (req, res) => {
    jwt.verify(extractJwt(req), jwtSecret, function(err, decoded) {
        if (err) {
            return res.status(500).json({
                error: 'An unknown error occurred.'
            });
        } else {
            Beacon.findById(decoded.id)
            .then(beacon => {
                if(!beacon) {
                    return res.status(404).json({ error:
                        'Beacon not found.'
                    });
                } else {
                    if (req.body.name) {
                        beacon.name = req.body.name;
                    }

                    if (req.body.latitude) {
                        beacon.location.latitude = req.body.latitude;
                    }

                    if (req.body.longitude) {
                        beacon.location.longitude = req.body.longitude;
                    }

                    if (req.body.description) {
                        beacon.description = req.body.description;
                    }

                    beacon.save()
                        .then(() => {
                            return res.status(204).json({
                                success: 'Beacon updated successfully!'
                            });
                        })
                        .catch(() => {
                            return res.status(500).json({
                                error: 'An unknown error occurred.'
                            });
                        });
                }
            })
            .catch(() => {
                return res.status(500).json({
                    error: "An unknown error occurred."
                });
            });
        }
    });
};

BeaconController.deleteBeacon = function(req, res) {    
    jwt.verify(extractJwt(req), jwtSecret, function(err, decoded) {
        Beacon.findById(req.params.id)
            .then(beacon => {
                if (beacon.created_by.toString() !== decoded.id) {
                    return res.status(403).json({
                        error: 'Unauthorized Access.'
                    });
                } else {
                    beacon.remove()
                        .then(() => {
                            return res.status(204).json({
                                success: 'Beacon deleted successfully!'
                            });
                        })
                        .catch(() => {
                            return res.status(500).json({
                                error: 'Something unexpected happened.'
                            });
                        });
                }
            })
            .catch(() => {
                return res.status(500).json({
                    error: 'Something unexpected happened.'
                });
            });
    });
};

module.exports = BeaconController;
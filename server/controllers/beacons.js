const BeaconController = new Object();
const Beacon = require('../models/beacon');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/settings').jwtSecret;
const extractJwt = require('../helpers/extract');

BeaconController.createNewBeacon = function(req, res, next) {
    jwt.verify(extractJwt(req), jwtSecret, function(err, decoded) {
        if (err) {
            return res.status(500).json({
                error: 'An unknown error occurred.'
            });
        } else {
            var errors = [];
            var newBeacon = new Beacon();

            newBeacon.name = req.body.name || 'Untitled Beacon';

            if (!req.body.latitude) {
                errors.push('Latitude is required.');
            } else {
                newBeacon.location.latitude = req.body.latitude;
            }

            if (!req.body.longitude) {
                errors.push('Longitude is required.');
            } else {
                newBeacon.location.longitude = req.body.longitude;
            }

            newBeacon.created_by = decoded.id;

            newBeacon.description = req.body.description || 'No description set yet.';

            if (errors.length > 0) {
                return res.status(400).json({
                    errors: errors
                });
            } else {
                newBeacon.save()
                    .then(data => {
                        return res.status(201).json({
                            success: 'Beacon created successfully!'
                        });
                    })
                    .catch(err => {
                        return res.status(500).json({
                            error: 'An unknown error occurred.'
                        });
                    });
            }
        }
    });
}

BeaconController.findAllBeacons = (req, res, next) => {
    jwt.verify(extractJwt(req), jwtSecret, function(err, decoded){
        Beacon.find({created_by: decoded.id}).populate('created_by', 'username')
            .then(beacons => {
                return res.status(200).json({
                    beacons: beacons
                });
            })
            .catch(err => {
                return res.status(500).json({
                    error: 'An unknown error occurred.'
                });
            });
    });
};

BeaconController.findOneBeacon = (req, res, next) => {
    jwt.verify(extractJwt(req), jwtSecret, function(err, decoded) {
        Beacon.findById(req.params.id)
            .then(beacon => {
                if(!beacon) {
                    return res.status(404).json({
                        error: 'Beacon not found.'
                    });            
                } else if (beacon.created_by.toString() !== decoded.id) {
                    return res.status(403).json({
                        error: 'Unauthorized Access.'
                    });
                } else {
                    return res.status(200).json({
                        beacon: beacon
                    });
                }
            })
            .catch(err => {
                return res.status(500).json({
                    error: 'An unknown error occurred.'
                });
            });
    });
};

BeaconController.updateBeacon = (req, res, next) => {
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
                        .then(data => {
                            return res.status(204).json({
                                success: 'Beacon updated successfully!'
                            });
                        })
                        .catch(err => {
                            return res.status(500).json({
                                error: 'An unknown error occurred.'
                            });
                        })
                }
            })
            .catch(err => {
                return res.status(500).json({
                    error: "An unknown error occurred."
                });
            });
        }
    });
};

BeaconController.deleteBeacon = function(req, res, next) {    
    jwt.verify(extractJwt(req), jwtSecret, function(err, decoded) {
        Beacon.findById(req.params.id)
            .then(beacon => {
                if (beacon.created_by.toString() !== decoded.id) {
                    return res.status(403).json({
                        error: 'Unauthorized Access.'
                    });
                } else {
                    beacon.remove()
                        .then(data => {
                            return res.status(204).json({
                                success: 'Beacon deleted successfully!'
                            });
                        })
                        .catch(err => {
                            return res.status(500).json({
                                error: 'Something unexpected happened.'
                            });
                        })
                }
            })
            .catch(err => {
                return res.status(500).json({
                    error: 'Something unexpected happened.'
                });
            })
    });
}

module.exports = BeaconController;
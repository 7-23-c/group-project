const BeaconController = new Object();
const Beacon = require('../models/beacon');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/settings').jwtSecret;
const extractJwt = require('../helpers/extract');

BeaconController.createNewBeacon = function(req, res, next) {
    jwt.verify(extractJwt(req), jwtSecret, function(err, decoded) {
        if (err) {
            return res.json({ error: 'An error occurred while saving the Beacon.' });
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
                return res.json({ errors: errors });
            } else {
                newBeacon.save()
                    .then(data => {
                        res.json({ success: 'Beacon created successfully!' });
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: 'An error occurred while saving the Beacon.'
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
            res.json({ beacons: beacons });
        })
        .catch(err => {
            res.status(500).json({
                error: "An error occurred while retrieving beacons."
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
                        error: "Beacon not found."
                    });            
                } else if (beacon.created_by.toString() !== decoded.id) {
                    return res.json({ error: 'Unauthorized Access.'});
                } else {
                    res.json({ beacon: beacon });
                }
            })
            .catch(err => {
                return res.status(500).json({
                    error: "Error retrieving Beacon."
                });
            });
    });
};

BeaconController.updateBeacon = (req, res, next) => {
    jwt.verify(extractJwt(req), jwtSecret, function(err, decoded) {
        if (err) {
            return res.json({ error: 'Error updating beacon.' });
        } else {
            Beacon.findById(decoded.id)
            .then(beacon => {
                if(!beacon) {
                    return res.status(404).json({
                        error: "Beacon not found. "
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
                            res.json({ success: 'Beacon updated successfully!'});
                        })
                        .catch(err => {
                            res.json({ error: 'Error updating beacon.'});
                        })
                }
            })
            .catch(err => {
                return res.status(500).json({
                    error: "Error updating beacon."
                });
            });
        }
    });
};

BeaconController.deleteBeacon = function(req, res, next) {    
    jwt.verify(extractJwt(req), jwtSecret, function(err, decoded) {
        Beacon.findById(req.params.id, function(err, beacon) {
            if (err) {
                return res.json({ error: 'Something unexpected happened.' });
            } else if (beacon.created_by.toString() !== decoded.id) {
                return res.json({ error: 'Unauthorized Access.'});
            } else {
                beacon.remove(function(err) {
                    if (err) {
                        return res.json({ error: 'Something unexpected happened.' });
                    }
                    return res.json({ success: 'Beacon deleted successfully!' });
                });
            }
        });
    });
}

module.exports = BeaconController;
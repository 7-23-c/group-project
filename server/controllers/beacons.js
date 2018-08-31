const BeaconController = {};
const Beacon = require('../models/beacon');

BeaconController.findAllBeacons = (req, res) => {
    Beacon.find({created_by: req.locals.decoded.id})
    .limit(10)
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
};

BeaconController.findNearbyBeacons = (req, res) => {
    Beacon.find({
        created_by: req.locals.decoded.id,
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
        return res.status(401).json({
            error: err
        });
    });
};

BeaconController.findOneBeacon = (req, res) => {
    Beacon.findById(req.params.id)
    .populate('created_by', 'name.first name.last')
    .then(beacon => {
        if(!beacon) {
            throw 'Beacon not found.';
        } else if (beacon.created_by.id.toString() !== req.locals.decoded.id) {
            throw 'You don\'t have access to that resource.';
        } else {
            return res.status(200).json({
                beacon: beacon
            });
        }
    })
    .catch(err => {
        return res.status(500).json({
            error: err
        });
    });
};

BeaconController.updateBeacon = (req, res) => {
    Beacon.findById(req.locals.decoded.id)
    .then(beacon => {
        if(!beacon) {
            throw 'Beacon not found.';
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

            return beacon.save();
        }
    })
    .then(() => {
        return res.status(200).json({
            success: 'Beacon updated successfully!'
        });
    })
    .catch(err => {
        return res.status(500).json({
            error: err
        });
    });
};

BeaconController.deleteBeacon = function(req, res) {    
    Beacon.findById(req.params.id)
    .then(beacon => {
        if (beacon.created_by.toString() !== req.locals.decoded.id) {
            throw 'Unauthorized Access.';
        } else {
            return beacon.remove();
        }
    })
    .then(() => {
        return res.status(200).json({
            success: 'Beacon deleted successfully!'
        });
    })
    .catch(err => {
        return res.status(500).json({
            error: err
        });
    });
};

module.exports = BeaconController;
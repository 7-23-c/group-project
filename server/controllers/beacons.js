const BeaconController = new Object();
const Beacon = require('../models/beacon');
const jwtSecret = process.env.JWT_SECRET || process.env.JWT_SECRET_DEV;

BeaconController.createNewBeacon = function(req, res, next) {
    var beacon = new Beacon({
        title: req.body.title || "Untitled Beacon", 
        location: {
            longitude: req.body.longitude,
            latitude: req.body.latitude
        } 
    });
    
    beacon.save()
    .then(data => {
        res.json({ success: 'Beacon created successfully!' });
    })
    .catch(err => {
        res.status(500).json({
            error: 'An error occurred while saving the Beacon.'
        });
    });   
}

BeaconController.findAllBeacons = (req, res, next) => {
    var token = req.header.authorization.split(' ')[1];

    jwt.verify(token, jwtSecret, function(err, decoded){
        Beacon.find({created_by: decoded.id})
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
    Beacon.findById(req.params.id)
    .then(beacon => {
        if(!beacon) {
            return res.status(404).json({
                error: "Beacon not found."
            });            
        }
        res.json({ beacon: beacon });
    })
    .catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                error: "Beacon not found."
            });                
        }
        return res.status(500).json({
            error: "Error retrieving Beacon."
        });
    });
};

BeaconController.updateBeacon = (req, res, next) => {
    // Find beacon and update it with the request body
    Beacon.findByIdAndUpdate(req.params.id, {
        title: req.body.title || "Untitled Beacon",
        location: {
            longitude: req.body.longitude,
            latitude: req.body.latitude
        }
    }, {new: true})
    .then(beacon => {
        if(!beacon) {
            return res.status(404).json({
                error: "Beacon not found. "
            });
        }
        res.json({ beacon: beacon });
    })
    .catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                error: "Beacon not found."
            });                
        }
        return res.status(500).json({
            error: "Error updating beacon."
        });
    });
};

BeaconController.deleteBeacon = function(req, res, next) {
    Beacon.findById(req.params.id, function(err, beacon) {
        if (err) {
            return res.json({ error: 'Something unexpected happened.' });
        }

        beacon.remove(function(err) {
            if (err) {
                return res.json({ error: 'Something unexpected happened.' });
            }
            return res.json({ success: 'Beacon deleted successfully!' });
        });
    });
}

module.exports = BeaconController;
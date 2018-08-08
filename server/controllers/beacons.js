const BeaconController = new Object();
const Beacon = require('../models/beacon');
const jwtSecret = process.env.JWT_SECRET || process.env.JWT_SECRET_DEV;
// add in all controller methods

BeaconController.createNewBeacon = function(req, res, next) {
    if(!req.body.content) {
        return res.status(400).send({
            message: "Field Cannot Be Empty"
        });
    }
    const beacon = new Beacon({
        title: req.body.title || "Untitled Beacon", 
        location:{
            longitude: req.body.latitude,
            latitude: req.body.longitude
        } 
    });
    
    beacon.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while saving the Beacon."
        });
    });   
}

BeaconController.findAllBeacon = (req, res, next) => {

    var token = req.header.authorization.split(' ')[1];
    jwt.verify(token, jwtSecret, function(err, decoded){

        
    Beacon.find({created_by: decoded.id})
    .then(beacons => {
        res.json({beacons: beacons});
    }).catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving beacons."
        });
    
    });



    /*Beacon.find()
    .then(beacons => {
        res.send(beacons);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving beacons."
        });*/
    });
};

BeaconController.findOneBeacon = (req, res, next) => {
    Beacon.findById(req.params.id)
    .then(beacon => {
        if(!beacon) {
            return res.status(404).json({
                message: "Beacon not found with id " + req.params.id
            });            
        }
        res.json(beacon);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                message: "Beacon not found with id " + req.params.id
            });                
        }
        return res.status(500).json({
            message: "Error retrieving Beacon with id " + req.params.id
        });
    });
};

BeaconController.updateBeacon = (req, res, next) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).json({
            message: "This cannot be empty"
        });
    }

    // Find beacon and update it with the request body
    Beacon.findByIdAndUpdate(req.params.id, {
        title: req.body.title || "Untitled Beacon",
        location:{
            longitude: req.body.latitude,
            latitude: req.body.longitude
        }
    }, {new: true})
    .then(beacon => {
        if(!beacon) {
            return res.status(404).json({
                message: "Note not found with id " + req.params.id
            });
        }
        res.json(beacon);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                message: "Note not found with id " + req.params.id
            });                
        }
        return res.status(500).json({
            message: "Error updating note with id " + req.params.id
        });
    });
};

BeaconController.deleteBeacon = function(req, res, next) {
        Beacon.findById(req.params.id,function(err, beacon) {
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
const BeaconController = new Object();
const Beacon = require('../models/beacon');

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
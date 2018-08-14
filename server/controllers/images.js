const imageController = new Object();
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/settings').jwtSecret;
const extractJwt = require('../helpers/extract');
const User = require('../models/user');
const Image = require('../models/image');
const Beacon = require('../models/beacon');

imageController.getSingelImage = function(req, res, next) {
    jwt.verify(extractJwt(req), jwtSecret, function(err, decoded) {

    });
}

imageController.uploadImage = function(req, res, next) {
    jwt.verify(extractJwt(req), jwtSecret, function(err, decoded) {
        if (err) {
            return res.status(500).json({
                'error': 'An unknown error occurred.'
            });
        } else if (req.body && req.body.beaconId) {
            Beacon.findById(req.body.beaconId)
                .then(beacon => {
                    var newImage = new Image();
                    newImage.description = req.body.description || '';
                    newImage.alt = req.body.alt || '';
                    newImage.beacon = req.body.beaconId;
                    newImage.created_by = decoded.id;

                    newImage.save()
                        .then(image => {
                            var file = {
                                image_id: image.id
                            };

                            beacon.images.push(file);

                            beacon.save()
                                .then(data => {
                                    return res.status(200).json({
                                        'success': 'Image uploaded successfully!',
                                        'beacon': 'Pushed image to beacon.'
                                    });
                                })
                                .catch(err => {
                                    return res.status(500).json({
                                        'error': 'An unknown error occurred.'
                                    });
                                })
                        })
                        .catch(err => {
                            return res.status(500).json({
                                'error': 'An unknown error occurred.'
                            });
                        })
                })
                .catch(err => {
                    return res.status(500).json({
                        'error': 'An unknown error occurred.'
                    });
                })
        } else {
            var newBeacon = new Beacon();
            newBeacon.name = '';
            newBeacon.location.latitude = req.body.latitude;
            newBeacon.location.longitude = req.body.longitude;
            newBeacon.description = '';
            newBeacon.created_by = decoded.id;

            newBeacon.save()
                .then(beacon => {
                    var newImage = new Image();
                    newImage.description = req.body.description || '';
                    newImage.alt = req.body.alt || '';
                    newImage.beacon = beacon.id;
                    newImage.created_by = decoded.id;

                    newImage.save()
                        .then(image => {
                            var image = {
                                image_id: image.id
                            };

                            beacon.images.push(image);

                            beacon.save()
                                .then(data => {
                                    return res.status(200).json({
                                        'success': 'Image uploaded successfully!'
                                    });
                                })
                                .catch(err => {
                                    return res.status(500).json({
                                        'error': 'An unknown error occurred.'
                                    });
                                })
                        })
                        .catch(err => {
                            return res.status(500).json({
                                'error': 'An unknown error occurred.'
                            });
                        })
                })
                .catch(err => {
                    return res.status(500).json({
                        'error': 'An unknown error occurred.'
                    });
                })
        }
    });
}

module.exports = imageController;
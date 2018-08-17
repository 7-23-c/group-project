const imageController = new Object();
const jwt = require('jsonwebtoken');
const aws = require('aws-sdk');
const jwtSecret = require('../config/settings').jwtSecret;
const extractJwt = require('../helpers/extract');
const User = require('../models/user');
const Image = require('../models/image');
const Beacon = require('../models/beacon');

aws.config.update({
    secretAccessKey: process.env.AWS_SECRET || process.env.aws_secret_access_key,
    accessKeyId: process.env.AWS_ACCESS_KEY || process.env.aws_access_key_id,
    region: process.env.AWS_REGION || process.env.region
});
const s3 = new aws.S3();

// begin methods
imageController.getSingleImage = function(req, res, next) {
    jwt.verify(extractJwt(req), jwtSecret, function(err, decoded) {
        Image.findById(req.params.id)
            .then(image => {
                if (image.created_by.toString() === decoded.id) {
                    var myBucket = 'beacons-images'
                    var myKey = image.key
                    var signedUrlExpireSeconds = 60 * 20

                    var url = s3.getSignedUrl('getObject', {
                        Bucket: myBucket,
                        Key: myKey,
                        Expires: signedUrlExpireSeconds
                    });

                    return res.status(200).json({
                        'url': url,
                        'description': image.description,
                        'alt': image.alt,
                    });
                } else {
                    return res.status(500).json({
                        'error': 'Couldn\'t get image.'
                    });
                }
            })
            .catch(err => {
                return res.status(500).json({
                    'error': 'An unknown error occurred.'
                });
            })
    });
}

imageController.uploadImage = function(req, res, next) {
    jwt.verify(extractJwt(req), jwtSecret, function(err, decoded) {
        if (err) {
            return res.status(500).json({
                'error': 'An unknown error occurred.'
            });
        } else if (req.body && req.file && req.body.beaconId) {
            Beacon.findById(req.body.beaconId)
                .then(beacon => {
                    var newImage = new Image();
                    newImage.description = req.body.description || '';
                    newImage.alt = req.body.alt || '';
                    newImage.beacon = req.body.beaconId;
                    newImage.created_by = decoded.id;
                    newImage.key = req.file.key;
                    
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
        } else if (req.body && req.file) {
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
                    newImage.key = req.file.key;

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
        } else {
            return res.status(500).json({
                'error': 'An unknown error occurred.'
            });
        }
    });
}

imageController.deleteImage = function(req, res, next) {
    jwt.verify(extractJwt(req), jwtSecret, function(err, decoded) {
        Image.findById(req.params.id)
            .then(image => {
                if (image.created_by.toString() === decoded.id) {
                    s3.deleteObject({
                        Bucket: 'beacons-images',
                        Key: image.key
                    }, function (err, data){
                        if (err) {
                            return res.status(500).json({
                                'error': 'An unknown error occurred'
                            });
                        } else {
                            image.remove()
                                .then(data => {
                                    return res.status(204);
                                })
                                .catch(err => {
                                    return res.status(500).json({
                                        error: 'Something unexpected happened.'
                                    });
                                })
                        }
                    });
                }
            })
            .catch(err => {
                return res.status(500).json({
                    'error': 'An unknown error occurred'
                });
            })
    });
}

module.exports = imageController;
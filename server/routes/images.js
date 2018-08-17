const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const imageController = require('../controllers/images');
const confirmUserIsValid = require('../helpers/confirm');

aws.config.update({
    secretAccessKey: process.env.AWS_SECRET || process.env.aws_secret_access_key,
    accessKeyId: process.env.AWS_ACCESS_KEY || process.env.aws_access_key_id,
    region: process.env.AWS_REGION || process.env.region
});
const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        acl: 'private',
        bucket: 'beacons-images',
        key: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
        }
    })
});

// retrieve a single image with a presigned url
router.get('/images/:id', (req, res, next) =>
imageController.getSingleImage(req, res, next));

// upload an image
router.post('/images', confirmUserIsValid, upload.single('image'), (req, res, next) =>
imageController.uploadImage(req, res, next));

// delete an image
router.delete('/images/:id', (req, res, next) =>
imageController.deleteImage(req, res, next));

module.exports = router;
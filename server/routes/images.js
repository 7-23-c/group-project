const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const imageController = require('../controllers/images');
const awsConfig = require('../config/aws');
const confirmUserIsValid = require('../helpers/confirm');

aws.config.update({
    secretAccessKey: awsConfig.aws_secret_access_key,
    accessKeyId: awsConfig.aws_access_key_id,
    region: awsConfig.region
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

router.get('/images/:id', (req, res, next) =>
imageController.getSingleImage(req, res, next));

router.post('/images', confirmUserIsValid, upload.single('image'), (req, res, next) =>
imageController.uploadImage(req, res, next));

module.exports = router;
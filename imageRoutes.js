var express = require('express');
var imageController = require('./imageController');
var upload = require('./cloudinaryUploads/multer');

var router = express.Router();

router.post('/addImage', upload.any(), imageController.createApp);

module.exports = router
const path = require('path');
const express = require('express');
const controller = require(path.join(__dirname, '..', 'controllers', 'dbController'));
const router = express.Router();

router.get('/', controller.main);
router.get('/upload', controller.upload);
router.get('/admin',controller.admin);

module.exports = router;
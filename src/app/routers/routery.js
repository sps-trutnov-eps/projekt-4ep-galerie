const path = require('path');
const express = require('express');
const { route } = require('..');
const controller = require(path.join(__dirname, '..', 'controllers', 'controllers'));
const router = express.Router();

router.get('/', controller.main);


module.exports = router;
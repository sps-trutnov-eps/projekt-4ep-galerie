const path = require('path');
const express = require('express');
const { route } = require('..');
const controller = require(path.join(__dirname, '..', 'controllers', 'controllers'));
const controller_tagy = require(path.join(__dirname, '..', 'controllers', 'tagy_controller'));
const router = express.Router();

router.get('/', controller.main);
router.post('/filtrovani_tagu/:data',controller_tagy.filtrovani_tagu)

module.exports = router;
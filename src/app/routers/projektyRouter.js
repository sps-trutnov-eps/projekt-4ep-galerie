const path = require('path');
const express = require('express');
const { resourceLimits } = require('worker_threads');
const controller = require(path.join(__dirname, '..', 'controllers', 'projektyController'));
const router = express.Router();

router.post('/hodnoceni',controller.hodnoceni);
router.get('/prehled', controller.prehled); 
router.get('/vypsat', controller.vypsat);
router.get('/', controller.main);

module.exports = router;

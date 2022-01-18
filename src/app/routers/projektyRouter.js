const path = require('path');
const express = require('express');
const { resourceLimits } = require('worker_threads');
const controller = require(path.join(__dirname, '..', 'controllers', 'projektyController'));
const router = express.Router();

router.post('/hodnoceni', controller.hodnoceni);

router.get('/detail/:id', controller.detail);
router.get('/prehled', controller.prehled); 
router.get('/', controller.main);

module.exports = router;

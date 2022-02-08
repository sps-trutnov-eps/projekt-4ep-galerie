const path = require('path');

const express = require('express');
const router = express.Router();

const controller = require(path.join(__dirname, '..', 'controllers', 'projektyController'));

router.post('/hodnoceni', controller.hodnoceni);

router.get('/detail/:id', controller.detail);
router.get('/', controller.main);

module.exports = router;

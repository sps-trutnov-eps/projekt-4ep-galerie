const path = require('path');

const express = require('express');

const router = express.Router();

const controller = require(path.join(__dirname, '..', 'controllers', 'prehledController'));

router.get("/galerie_prehled", controller.galerie_prehled);

router.get("/vypsat", controller.Vypsat);


module.exports = router;
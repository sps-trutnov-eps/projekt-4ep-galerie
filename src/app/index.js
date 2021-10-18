const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());


const dbController = require(path.join(__dirname, 'controllers', 'dbController'));
var router = express.Router();
app.use('/', router);

router.get('/', dbController.main);

module.exports = app;
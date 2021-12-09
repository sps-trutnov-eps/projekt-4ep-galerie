const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ "extended": true }));

app.use('/', require(path.join(__dirname, 'routers', 'dbRouter')));

module.exports = app;
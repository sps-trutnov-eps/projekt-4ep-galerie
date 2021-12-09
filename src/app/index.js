const { strict } = require('assert/strict');
const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const key = require('dotenv').config();

app.use('/admin', session({
    resave: false,
    secure: false,
    saveUninitialized: false,
    secret: key,
    cookie: {
        sameSite: 'strict',
        expires: 600000,
    }
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'www')));
app.use(express.json());
app.use(express.urlencoded({ "extended": true }));
app.use('/', require(path.join(__dirname, 'routers', 'dbRouter')));
module.exports = app;
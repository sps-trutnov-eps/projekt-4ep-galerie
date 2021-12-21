const express = require('express');
const session = require('express-session');
const env = require('dotenv').config()
const path = require('path');
const app = express();
const key = process.env;
app.use('/', session({
    secret: key,
    secure: false,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        sameSite: true,
        expires: 300000 //5 minut 60000 = 1 minuta
    },
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'www')));
app.use(express.json());
app.use(express.urlencoded({ "extended": true }));
app.use('/', require(path.join(__dirname, 'routers', 'dbRouter')));
app.use('/', require(path.join(__dirname, 'routers', 'routery')));
module.exports = app;
app.use('/styles',express.static(path.join(__dirname, 'styles')));
app.use('/scripts',express.static(path.join(__dirname, 'scripts')));
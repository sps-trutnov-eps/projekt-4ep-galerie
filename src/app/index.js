const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'www')));
app.use(express.json());
app.use('/admin', session({
    resave: false,
    saveUninitialized: false,
    secret: 'pepe',
    cookie: {
        expires: 600000
    }
}));

app.use(express.urlencoded({ "extended": true }));
app.use('/', require(path.join(__dirname, 'routers', 'dbRouter')));
module.exports = app;
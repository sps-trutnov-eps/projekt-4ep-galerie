const path = require('path');

const prehledModel = require(path.join(__dirname, '..', 'models', 'prehledModel'));
const dbModel = require(path.join(__dirname, '..', 'models', 'dbModel'));

exports.Vypsat = (request, response) => {
    dbModel.vypsatVse();
}

exports.galerie_prehled = (request, response) => {
    response.render('galerie_prehled');
}
const path = require('path');

const prehledModel = require(path.join(__dirname, '..', 'models', 'prehledModel'));

exports.Vypsat = (request, response) => {
    prehledModel.Vypsat();
}
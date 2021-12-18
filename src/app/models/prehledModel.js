const path = require('path');

const jsondb = require('simple-json-db');

const db = new jsondb(path.join(__dirname, '..', '..', '..', 'data', 'clanky.json'));

exports.Vypsat = () => {
    let data = db.JSON();
    let clanky = [];

    for(let i = 0; i < data.length; i++){
        clanky.push(data[i])
        console.log(data[i]);
    }





    return clanky;
}
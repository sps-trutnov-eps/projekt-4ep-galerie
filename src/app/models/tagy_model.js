const path = require('path');
const JSONdb = require('simple-json-db');
const db = new JSONdb(path.join(__dirname, '..', '..', '..', 'data', 'tagy.json'));

exports.Ziskej_tagy=()=>
{
    return db.JSON();
}
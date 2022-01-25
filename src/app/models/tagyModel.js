const path = require('path');
const jsondb = require('simple-json-db');

const db = new jsondb(path.join(__dirname, '..', '..', '..', 'data', 'tagy.json'));

exports.ziskejTagy = () => {
    return db.JSON();
}

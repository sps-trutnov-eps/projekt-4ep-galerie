const path = require('path');
const JSONdb = require('simple-json-db');
const db = new JSONdb(path.join(__dirname, '..', '..', '..', 'data', 'clanky-schema.json'));

exports.nacist = (id) => {
    return db.get(id);
}

exports.nacistVse = () => {
    return db.JSON();
}
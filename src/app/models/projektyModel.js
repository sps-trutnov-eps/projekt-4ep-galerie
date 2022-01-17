const path = require('path');
const JSONdb = require('simple-json-db');
const db_tagy = new JSONdb(path.join(__dirname, '..', '..', '..', 'data', 'tagy.json'));
const db_projekty = new JSONdb(path.join(__dirname, '..', '..', '..', 'data', 'clanky.json'));

exports.Ziskej_tagy = () => {
    return db_tagy.JSON();
}

exports.Pocet_projektu = () => {
    return db_projekty.JSON().length;
}

exports.nacistProjekt = (id) => {
    let data = db_projekty.get(id);
    data.id = id;
    return data;
}

const path = require('path');
const JSONdb = require('simple-json-db');

const dbTagy = new JSONdb(path.join(__dirname, '..', '..', '..', 'data', 'tagy.json'));
const db = new JSONdb(path.join(__dirname, '..', '..', '..', 'data', 'projekty.json'));

exports.ziskejTagy = () => {
    return dbTagy.JSON();
}

exports.dalsiId = () => {
    return db.JSON()['next_id'];
}

exports.nacistProjekt = (id) => {
    let data = db.get(id);
    data.id = id;
    return data;
}

exports.nacistVsechny = () => {
    let projekty = db.JSON();
    delete projekty['next_id'];
    return projekty;
}

exports.aktualizovatHodnoceni = (id, typ) => {
    let projekt = db.get(id);
    if(typ == "like"){
        projekt.like++;
    }
    else{
        projekt.dislike++;
    }
    db.set(id, projekt)
}

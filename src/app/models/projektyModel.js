const path = require('path');
const jsondb = require('simple-json-db');

const dbTagy = new jsondb(path.join(__dirname, '..', '..', '..', 'data', 'tagy.json'));
const dbProjekty = new jsondb(path.join(__dirname, '..', '..', '..', 'data', 'projekty.json'));

exports.ziskejTagy = () => {
    return dbTagy.JSON();
}

exports.dalsiId = () => {
    return dbProjekty.JSON()['next_id'];
}

exports.nacistProjekt = (id) => {
    let data = dbProjekty.get(id);

    data.id = id;

    return data;
}

exports.nacistVsechny = () => {
    let projekty = dbProjekty.JSON();

    delete projekty['next_id'];

    return projekty;
}

exports.aktualizovatHodnoceni = (id, typ) => {
    let projekt = dbProjekty.get(id);

    if(typ == "like") {
        projekt.like++;
    } else {
        projekt.dislike++;
    }

    dbProjekty.set(id, projekt)
}

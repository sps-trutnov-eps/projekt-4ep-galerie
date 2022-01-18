const path = require('path');
const JSONdb = require('simple-json-db');
const db_tagy = new JSONdb(path.join(__dirname, '..', '..', '..', 'data', 'tagy.json'));
const db_projekty = new JSONdb(path.join(__dirname, '..', '..', '..', 'data', 'projekty.json'));

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

exports.vypsat = () => {
    let data = db_projekty.JSON();
    let clanky = [];

    for(let i = 0; i < data.length; i++){
        clanky.push(data[i])
        console.log(data[i]);
    }

    return clanky;
}

exports.aktualizovatHodnoceni = (id, typ) => {
    let projekt = db_projekty.get(id);
    if(typ == "like"){
        projekt.like++;
    }
    else{
        projekt.dislike++;
    }
    db_projekty.set(id, projekt)
}

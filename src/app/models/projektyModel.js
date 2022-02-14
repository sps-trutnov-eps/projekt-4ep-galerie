const path = require('path');
const fs = require('fs');
const bcrypt = require("bcryptjs");
const jsondb = require('simple-json-db');

const db = new jsondb(path.join(__dirname, '..', '..', '..', 'data', 'projekty.json'));

if(!db.has('next_id')) {
    db.set('next_id', 1);
}

exports.dalsiId = () => {
    return db.JSON()['next_id'];
}

exports.nacistProjekt = (id) => {
    if(!db.has(id)) {
        return false;
    }

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

    if(typ == "like") {
        projekt.like++;
    } else {
        projekt.dislike++;
    }

    db.set(id, projekt)
}

exports.editProject = (id, items) => {
    var project = db.get(id);
    project.autor = (items?.autor===undefined?project.autor:items.autor);
    project.datum = (items?.datum===undefined?project.datum:items.datum);
    project.nadpis = (items?.nadpis===undefined?project.nadpis:items.nadpis);
    project.popis_short = (items?.popis_short===undefined?project.popis_short:items.popis_short);
    project.popis_full = (items?.popis_full===undefined?project.popis_full:items.popis_full);
    project.tagy = (items?.tagy===undefined?project.tagy:items.tagy);
    project.like = (items?.like===undefined?project.like:items.like);
    project.dislike = (items?.dislike===undefined?project.dislike:items.dislike);
    project.obrazky = (items?.obrazky===undefined?project.obrazky:items.obrazky);
    db.set(id, project);
}

exports.getProjectNames = () => {
    return Object.keys(db.JSON());
}

exports.getProjectTitles = () => {
    var data = [];
    var projects = db.JSON();
    for (var i = 0; i < Object.keys(projects).length; i++) {
        var name = Object.keys(projects)[i];
        var obj = {};
        obj[name] = Object.values(projects)[i].nadpis;
        data.push(obj);
    }
    return data;
}

exports.deleteProject = (id) => {
    let nextID = db.get('next_id')
    const path = '../public/img/' + id;
    var projekt = db.get(id);
    //odebrání obrázků
    for (var i = 0; i < projekt.obrazky.length; i++) {
        fs.unlink(path + '/' + projekt.obrazky[i],(err) => {
            if(err) throw err;
            console.log('picture deleted');
        });
    }
    var odpoved = db.delete(id);
    //odebrání složky musí být prázdná
    fs.rmdir(path,(err) => { 
        if(err) throw err;
        console.log('file deleted');
    });
    db.set('next_id', nextID - 1); //zmenšení next id
    return odpoved;
}

exports.newDbItem = (name, desc_short, desc_full, author, tags,obrazky, like, dislike) => {
    let id = db.get('next_id')
    db.set('next_id', id + 1)
    db.set(id, {
        "autor": author,
        "datum": new Date().toLocaleDateString(),
        "nadpis": name,
        "popis_short": desc_short,
        "popis_full": desc_full,
        "tagy": tags,
        "obrazky": obrazky,
        "like": like,
        "dislike": dislike
    });
}

exports.compareAdmin = (req, res, next) => {
    bcrypt.hash(process.env.ADMIN_PASSWORD, 5, function (err, hash) {
        // porovnávání hashem s heslem
        bcrypt.compare(req.session.password, hash, function (err, result) {
          // porovnaní údajů
          if(req.session.username == process.env.ADMIN_USERNAME && result == true){
            req.session.userid = 'admin';
            res.redirect('/admin/edit');
          }
          else{
              res.redirect('/admin')
          }
        });

    }); 
}

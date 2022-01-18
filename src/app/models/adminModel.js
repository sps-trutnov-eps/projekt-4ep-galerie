const path = require('path');
const bcrypt = require("bcryptjs");
const jsondb = require('simple-json-db');

const db = new jsondb(path.join(__dirname, '..', '..', '..', 'data', 'projekty.json'));

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
    var odpoved = db.delete(id);
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

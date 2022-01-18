const path = require('path');
const bcrypt = require("bcryptjs");
const JSONdb = require('simple-json-db');

const db = new JSONdb(path.join(__dirname, '..', '..', '..', 'data', 'projekty.json'));

exports.editProject = (id, items) => {
    var Project = db.get(id);
    Project.autor = (items?.autor===undefined?Project.autor:items.autor);
    Project.datum = (items?.datum===undefined?Project.datum:items.datum);
    Project.nadpis = (items?.nadpis===undefined?Project.nadpis:items.nadpis);
    Project.popis_short = (items?.popis_short===undefined?Project.popis_short:items.popis_short);
    Project.popis_full = (items?.popis_full===undefined?Project.popis_full:items.popis_full);
    Project.tagy = (items?.tagy===undefined?Project.tagy:items.tagy);
    Project.like = (items?.like===undefined?Project.like:items.like);
    Project.dislike = (items?.dislike===undefined?Project.dislike:items.dislike);
    Project.obrazky = (items?.obrazky===undefined?Project.obrazky:items.obrazky);
    db.set(id, Project);
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
    db.set('next_id',db.get('next_id')+1)
    db.set(id  , {
        "autor": author,
        "datum": new Date().toLocaleDateString(),
        "nadpis": name,
        "popis_short": desc_short,
        "popis_full": desc_full,
        "tagy": tags,
        "obrazky": obrazky,
        "Like": like,
        "Dislike": dislike
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

const path = require('path');
const bcrypt = require("bcryptjs");
const JSONdb = require('simple-json-db');

const db = new JSONdb(path.join(__dirname, '..', '..', '..', 'data', 'projekty.json'));

exports.editArticle = (id, items) => {
    var Article = db.get(id);
    Article.autor = (items?.autor===undefined?Article.autor:items.autor);
    Article.datum = (items?.datum===undefined?Article.datum:items.datum);
    Article.nadpis = (items?.nadpis===undefined?Article.nadpis:items.nadpis);
    Article.popis_short = (items?.popis_short===undefined?Article.popis_short:items.popis_short);
    Article.popis_full = (items?.popis_full===undefined?Article.popis_full:items.popis_full);
    Article.tagy = (items?.tagy===undefined?Article.tagy:items.tagy);
    Article.like = (items?.like===undefined?Article.like:items.like);
    Article.dislike = (items?.dislike===undefined?Article.dislike:items.dislike);
    Article.obrazky = (items?.obrazky===undefined?Article.obrazky:items.obrazky);
    db.set(id, Article);
}

exports.getArticleNames = () => {
    return Object.keys(db.JSON());
}

exports.getArticleTitles = () => {
    var data = [];
    var articles = db.JSON();
    for (var i = 0; i < Object.keys(articles).length; i++) {
        var name = Object.keys(articles)[i];
        var obj = {};
        obj[name] = Object.values(articles)[i].nadpis;
        data.push(obj);
    }
    return data;
}

exports.deleteArticle = (id) => {
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
    console.log('compareAdmin Sekce --------------------')
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

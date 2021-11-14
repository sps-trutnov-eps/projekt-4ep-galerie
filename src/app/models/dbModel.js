const path = require('path');
const JSONdb = require('simple-json-db');
const db = new JSONdb(path.join(__dirname, '..', '..', '..', 'data', 'clanky.json'));

exports.nacist = (id) => {
    var clanek = db.get(id);
    return clanek;
}

exports.nacistVse = () => {
    var clanky = db.JSON();
    return clanky;
}

exports.editArticle = (id, items) => {
    var Article = db.get(id);
    Article.autor = (items?.autor===undefined?Article.autor:items.autor);
    Article.datum = (items?.datum===undefined?Article.datum:items.datum);
    Article.viditelny = (items?.viditelny===undefined?Article.viditelny:items.viditelny);
    Article.nadpis = (items?.nadpis===undefined?Article.nadpis:items.nadpis);
    Article.popis_short = (items?.popis_short===undefined?Article.popis_short:items.popis_short);
    Article.popis_full = (items?.popis_full===undefined?Article.popis_full:items.popis_full);
    Article.tagy = (items?.tagy===undefined?Article.tagy:items.tagy);
    db.set(id, Article);
}

exports.getArticleNames = () => {
    return Object.keys(db.JSON());
}

exports.deleteArticle = (id) => {
    var odpoved = db.delete(id);
    return odpoved;
}
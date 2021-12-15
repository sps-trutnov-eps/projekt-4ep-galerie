const path = require('path');
const JSONdb = require('simple-json-db');
const db = new JSONdb(path.join(__dirname, '..', '..', '..', 'data', 'clanky.json'));

exports.nacist = (id) => {
    return db.get(id);
}

exports.nacistVse = () => {
    return db.JSON();
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

exports.newDbItem = (name, desc_short, desc_full, author, mail, tags) => {
    db.set(`ID_${Object.keys(db.JSON()).length + 1}`  , {
        "autor": [
            {
                "jmeno": author,
                "e-mail": mail
            }
        ],
        "datum": new Date().toLocaleDateString(),
        "viditelny": false,
        "nadpis": name,
        "popis_short": desc_short,
        "popis_full": desc_full,
        "tagy": []
    });
}

exports.nacistDetail = (id) =>
{
    let data = db.get(`ID_${id}`);
    data.id = id;
    return data;
}
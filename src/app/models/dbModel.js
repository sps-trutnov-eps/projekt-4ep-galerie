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
// docasne, mozna se pozdeji smaze ¯\_(ツ)_/¯
exports.mainPageArticles = () => {
    var clanky = this.getArticleNames();
    var vybraneClanky = []
    if (clanky.length > 2) {
        for (var i = 0; i < 3; i++) {
            var nahoda = Math.floor(Math.random() * clanky.length);
            while (vybraneClanky.includes(nahoda)) {
                nahoda = Math.floor(Math.random() * clanky.length);
            }
            vybraneClanky.push(nahoda)
        }
        for (var i = 0; i < 3; i++) {
            var cislo = vybraneClanky[i];
            vybraneClanky[i] = clanky[cislo];
        }
    }
    else {
        vybraneClanky = clanky
    }
    return vybraneClanky;
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
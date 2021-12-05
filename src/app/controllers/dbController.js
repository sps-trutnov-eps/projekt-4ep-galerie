const dbModel = require(require('path').join(__dirname, '..', 'models', 'dbModel'));

exports.main = (req, res) => {
    var data = dbModel.nacistVse();
    //dbModel.editArticle("ID_1", {"autor":[{"jmeno":"", "e-mail":""}], "datum":"", "viditelny":false, "nadpis":"", "popis_short":"", "popis_full":"", "tagy": []});
    //dbModel.editArticle("ID_1", {"datum":"", "viditelny":false});
    res.render('test', {data});
}

exports.upload = (req, res) => {
    res.render('upload_form');
}

exports.admin = (req, res) => {
    res.render('admin_page');
}

exports.adminEdit = (req, res) => {
    res.render('admin/edit');
}

exports.getArticleData = (req, res) => {
    var name = `ID_${req.params.article}`;
    var data = dbModel.nacist(name);
    res.send(data);
}

exports.getArticleNames = (req, res) => {
    res.send(dbModel.getArticleNames());
}

exports.getArticleTitles = (req, res) => {
    res.send(dbModel.getArticleTitles());
}

exports.editArticle = (req, res) => {
    var id = req.body[0];
    var items = req.body[1];
    dbModel.editArticle(id, items);
    res.send({"msg":"Článek změněn!"});
}

exports.deleteArticle = (req, res) => {
    var id = req.body.ID;
    var odpoved = dbModel.deleteArticle(id);
    var msg = {};
    switch(odpoved) {
        case true: {
            msg = {"msg":"Clanek byl vymazan uspesne."};
            break;
        }
        case undefined: {
            msg = {"msg":"Clanek nenalezen."};
            break;
        }
        default: {
            msg = {"msg":"Neznama chyba"};
            break;
        }
    }
    res.send(msg);
}
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
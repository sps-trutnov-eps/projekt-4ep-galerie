const express = require('express');
const session = require('express-session');
const dbModel = require(require('path').join(__dirname, '..', 'models', 'dbModel'));
const { Console } = require('console');
const multer = require('multer');
const { ESRCH } = require('constants');

const storage = multer.diskStorage({
    destination: './app/www/img/' + Object.keys(dbModel.nacistVse()).length,
    filename: (req, file, res) => {
        res(null, file.originalname)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb){
        const fileTypes = /jpeg|jpg|png/;
        const mimeType = fileTypes.test(file.mimetype);
        if(mimeType){
            cb(null, true);
        } 
        else {
            cb('error');
        }
    }
}).array('image');
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
exports.uploadArticle = (req, res) => {
    let name = req.body.name;
    let desc_short = req.body.desc_short;
    let desc_full = req.body.desc_full;
    let author = req.body.author;
    let tags = req.body.tags;

    dbModel.newDbItem(name, desc_short, desc_full, author, tags);
}
exports.postLoginInfo = (req, res) => {
    req.session.username = req.body.username;
    req.session.password = req.body.password;
    console.log('loginAdmin Sekce --------------------')
    
    res.send({"status":100})
}
exports.compareAdmin = (req, res, next) => {
    dbModel.compareAdmin(req, res, next);
}
exports.uploadImg = (req, res) => {
    upload(req, res, (err) => {
        if(err){
            res.send('FCKING ERROR MATE');
        }else {
            console.log(req.file);
            res.send('Soubor poslán');
        }
    });
}

exports.detail = (rq, res) =>
{
    let id = rq.params.id;
    var data = dbModel.nacistDetail(id);
    res.render('detail', {data});
}
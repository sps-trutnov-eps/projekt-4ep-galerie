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
    var name = req.params.article;
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

exports.postLoginInfo = (req, res) => {
    req.session.username = req.body.username;
    req.session.password = req.body.password;
    console.log('loginAdmin Sekce --------------------')
    
    res.send({"status":100})
}
exports.compareAdmin = (req, res, next) => {
    dbModel.compareAdmin(req, res, next);
}
exports.pre_upload = (req, res,next) => 
{
    next();
}
exports.uploadImg = (req, res,next) => {
    upload(req, res, (err) => {
        if(err){
            
        }else
        {   
            console.log(req.files);
            res.locals.nazvy_souboru=[];
            for(let i in req.files)
                res.locals.nazvy_souboru.push(req.files[i].originalname);  
        }
        next();
    });
}
exports.uploadArticle = (req, res,next) => {
    console.log(res.locals.nazvy_souboru);
    let name = req.body.nazev;
    let desc_short = req.body.kratky_popis;
    let desc_full = req.body.dlouhy_popis;
    let author = req.body.autori;
    let tags = req.body.tagy;
    let obrazky = res.locals.nazvy_souboru;
    
    dbModel.newDbItem(name, desc_short, desc_full, author, tags,obrazky);
    res.send('Vsechno OK!');
}
exports.detail = (rq, res) =>
{
    let id = rq.params.id;
    var data = dbModel.nacistDetail(id);
    res.render('detail', {data});
}
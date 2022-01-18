const multer = require('multer');

const adminModel = require(require('path').join(__dirname, '..', 'models', 'adminModel'));
const projektyModel = require(require('path').join(__dirname, '..', 'models', 'projektyModel'));

exports.upload = (req, res) => {
    res.render('admin/upload_form', {
        data: projektyModel.ziskejTagy()
    });
}

exports.admin = (req, res) => {
    res.render('admin/admin_page');
}

exports.adminEdit = (req, res) => {
    res.render('admin/edit');
}

exports.getProjectData = (req, res) => {
    var id = req.params.id;
    var data = projektyModel.nacistProjekt(id);
    res.send(data);
}

exports.getProjectNames = (req, res) => {
    res.send(adminModel.getProjectNames());
}

exports.getProjectTitles = (req, res) => {
    res.send(adminModel.getProjectTitles());
}

exports.editProject = (req, res) => {
    var id = req.body[0];
    var items = req.body[1];
    adminModel.editProject(id, items);
    res.send({"msg":"Článek změněn!"});
}

exports.deleteProject = (req, res) => {
    var id = req.body.ID;
    var odpoved = adminModel.deleteProject(id);
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
    
    res.send({"status":100})
}

exports.compareAdmin = (req, res, next) => {
    adminModel.compareAdmin(req, res, next);
}

exports.pre_upload = (req, res,next) => 
{
    next();
}

exports.uploadImg = (req, res,next) => {
    const upload = multer({
        storage: multer.diskStorage({
            destination: './app/www/img/' + projektyModel.dalsiId(),
            filename: (req, file, res) => {
                res(null, file.originalname)
            }
        }),
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
    upload(req, res, (err) => {
        if(err){
            
        }else
        {   
            res.locals.nazvy_souboru=[];
            for(let i in req.files)
                res.locals.nazvy_souboru.push(req.files[i].originalname);  
        }
        next();
    });
}

exports.uploadProject = (req, res,next) => {
    let name = req.body.nazev;
    let desc_short = req.body.kratky_popis;
    let desc_full = req.body.dlouhy_popis;
    let author = req.body.autori;
    let tags = req.body.tagy;
    let obrazky = res.locals.nazvy_souboru;
    let hodnoceniLike = 0;
    let hodnoceniDislike = 0;
    
    adminModel.newDbItem(name, desc_short, desc_full, author, tags,obrazky, hodnoceniLike, hodnoceniDislike);
    return res.redirect('/admin/edit')
}

exports.logout = (req, res) => {
    req.session.username = undefined;
    req.session.password = undefined;
    req.session.userid = undefined;
    res.send({"msg":{"status":100, "text":"Úspěšně odhlášeno!"}})
}

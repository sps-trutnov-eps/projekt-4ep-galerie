const path = require('path');
const multer = require('multer');

const tagyModel = require(path.join(__dirname, '..', 'models', 'tagyModel'));
const projektyModel = require(path.join(__dirname, '..', 'models', 'projektyModel'));

exports.upload = (req, res) => {
    res.render('admin/upload_form', {
        data: tagyModel.ziskejTagy()
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
    res.send(projektyModel.getProjectNames());
}

exports.getProjectTitles = (req, res) => {
    res.send(projektyModel.getProjectTitles());
}

exports.editProject = (req, res) => {
    var id = req.body[0];
    var items = req.body[1];
    projektyModel.editProject(id, items);
    res.send({"msg":"Projekt změněn!"});
}

exports.deleteProject = (req, res) => {
    var id = req.body.ID;
    var odpoved = projektyModel.deleteProject(id);
    var msg = {};
    switch(odpoved) {
        case true: {
            msg = {"msg":"Projekt byl vymazán úspěšně."};
            break;
        }
        case undefined: {
            msg = {"msg":"Projekt nenalezen."};
            break;
        }
        default: {
            msg = {"msg":"Neznámá chyba."};
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
    projektyModel.compareAdmin(req, res, next);
}

exports.uploadImg = (req, res, next) => {
    const upload = multer({
        storage: multer.diskStorage({
            destination: './app/www/img/' + projektyModel.dalsiId(),
            filename: (req, file, res) => {
                res(null, file.originalname)
            }
        }),
        fileFilter: function(req, file, cb) {
            const fileTypes = /jpeg|jpg|png/;
            const mimeType = fileTypes.test(file.mimetype);
            if(mimeType) {
                cb(null, true);
            } 
            else {
                cb('error');
            }
        }
    }).array('image');

    upload(req, res, (err) => {
        if(err) {
            
        } else {   
            res.locals.nazvy_souboru=[];
            for(let i in req.files)
                res.locals.nazvy_souboru.push(req.files[i].originalname);  
        }
        next();
    });
}

exports.uploadProject = (req, res, next) => {
    let name = req.body.nazev.trim().replace(/[<>]/g, ' ');
    let desc_short = req.body.kratky_popis.trim().replace(/[<>]/g, ' ');;
    let desc_full = req.body.dlouhy_popis.trim().replace(/[<>]/g, ' ');;
    let author = req.body.autori.trim().replace(/[<>]/g, ' ');;

    let tags = req.body.tagy;
    let obrazky = res.locals.nazvy_souboru;
    let hodnoceniLike = 0;
    let hodnoceniDislike = 0;
    
    projektyModel.newDbItem(name, desc_short, desc_full, author, tags,obrazky, hodnoceniLike, hodnoceniDislike);
    return res.redirect('/admin/edit')
}

exports.logout = (req, res) => {
    req.session.username = undefined;
    req.session.password = undefined;
    req.session.userid = undefined;
    res.send({"msg":{"status":100, "text":"Úspěšně odhlášeno!"}})
}

exports.isLogged = (req, res, next) => {
    if (req.session.userid == undefined) {
        next();
    }
    if (req.session.userid == 'admin') {
        res.redirect("/admin/edit")
    }
}

exports.verify = (req, res, next) => {
    if(req.session.userid == 'admin') {
        next();
    }
    else {
        res.redirect('/')
    }
}

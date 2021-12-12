const dbModel = require(require('path').join(__dirname, '..', 'models', 'dbModel'));
const { Console } = require('console');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: './img/',
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
}).single('image');

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

exports.uploadArticle = (req, res) => {
    let name = req.body.name;
    let desc_short = req.body.desc_short;
    let desc_full = req.body.desc_full;
    let author = req.body.author;
    let mail = req.body.mail;
    let tags = req.body.tags;

    dbModel.newDbItem(name, desc_short, desc_full, author, mail, tags);
}

exports.uploadImg = (req, res) => {
    upload(req, res, (err) => {
        if(err){
            res.send('FCKING ERROR MATE');
        }else {
            console.log(req.file);
            res.send('test');
        }
    });
}
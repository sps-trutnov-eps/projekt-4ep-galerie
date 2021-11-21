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

exports.postLoginInfo = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    var login_udaje = {
        "users": [
            {
                "username": "admin",
                "password": "admin"
            }
        ]
    }
    
    
    var input_username = username;
    var input_password = password;
    if(input_username == login_udaje.users[0].username && input_password == login_udaje.users[0].password){
        //window.location.href = "/";
        console.log("Correct");

    }
    else{
        console.log("Wrong username or password");
        //res.redirect('/upload_form');
    }
    
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
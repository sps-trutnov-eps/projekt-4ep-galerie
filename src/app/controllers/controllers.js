const tagy_db = require(require('path').join(__dirname, '..', 'models', 'tagy_model'));
exports.main = (req, res) => 
{
    let data = tagy_db.Ziskej_tagy();
    console.log(data);
    res.render('main',{data});
}


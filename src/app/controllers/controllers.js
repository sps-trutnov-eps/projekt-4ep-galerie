const tagy_db = require(require('path').join(__dirname, '..', 'models', 'tagy_model'));
const dbModel = require(require('path').join(__dirname, '..', 'models', 'dbModel'));
exports.main = (req, res) => 
{
    let data={tagy:tagy_db.Ziskej_tagy(),projekty:dbModel.nacistVse()};
    console.log(data);
    res.render('main',{data});
}


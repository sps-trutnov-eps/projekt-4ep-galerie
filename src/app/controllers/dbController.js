const dbModel = require(require('path').join(__dirname, '..', 'models', 'dbModel'));

exports.main = (req, res) => {
    var data = dbModel.nacistVse();
    res.render('test', {data});
}

exports.upload = (req, res) => {
    res.render('upload_form');
}
module.exports = (req,next) => {
    console.log('adminVerify sekce ------------------------------');
    console.log(req.session);
    if(req.session.userid == 'admin') {
        console.log('jsi admin');
        next();
    }
    else {
        console.log('nejsi admin');
    }
}
module.exports = (req,res,next) => {
    console.log('adminVerify sekce ------------------------------');
    console.log(req.session);
    if(req.session.userid == 'admin' /*req.session.password == 'a'*/) {
        console.log('jsi admin');
        next();
    }
    else {
        console.log('nejsi admin');
        res.redirect('/admin')
    }
}
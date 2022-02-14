const path = require('path');

const express = require('express');
const router = express.Router();

const controller = require(path.join(__dirname, '..', 'controllers', 'adminController'));

const verify = (req, res, next) => {
    if(req.session.userid == 'admin') {
        next();
    }
    else {
        res.redirect('/')
    }
}

const isLogged = (req, res, next) => {
    if (req.session.userid == undefined) {
        next();
    }
    if (req.session.userid == 'admin') {
        res.redirect("/admin/edit")
    }
}

router.get('/upload', verify, controller.upload);
router.get('/getProjectNames', verify, controller.getProjectNames);
router.get('/edit/:id',verify, controller.getProjectData)
router.get('/edit', verify, controller.adminEdit);
router.get('/getProjectTitles', verify, controller.getProjectTitles);
router.get('/compare', controller.compareAdmin);

router.post('/sendImg', verify, controller.uploadImg, controller.uploadProject);
router.post('/editProject', verify, controller.editProject);
router.post('/deleteProject', verify, controller.deleteProject);

router.post('/loginInfo', controller.postLoginInfo);
router.post('/logout', controller.logout)

router.get('/', isLogged ,controller.admin);

module.exports = router;

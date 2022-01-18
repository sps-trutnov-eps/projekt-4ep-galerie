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

router.get('/upload', verify, controller.upload);
router.get('/getArticleNames', verify, controller.getArticleNames);
router.get('/edit/:id',verify, controller.getArticleData)
router.get('/edit', verify, controller.adminEdit);
router.get('/getArticleTitles', verify, controller.getArticleTitles);
router.get('/compare', controller.compareAdmin);

router.post('/newArticle', verify, controller.uploadArticle);
router.post('/sendImg', controller.pre_upload, controller.uploadImg, controller.uploadArticle);
router.post('/editArticle', verify, controller.editArticle);
router.post('/deleteArticle', verify, controller.deleteArticle);

router.post('/loginInfo', controller.postLoginInfo);
router.post('/logout', controller.logout)

router.get('/', controller.admin);

module.exports = router;

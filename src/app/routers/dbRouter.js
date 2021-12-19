const path = require('path');
const express = require('express');
const controller = require(path.join(__dirname, '..', 'controllers', 'dbController'));
const router = express.Router();
const verify = require('../middleware/admin-auth')
router.get('/', controller.main);
router.get('/admin/upload', verify, controller.upload);
router.get('/admin',controller.admin);
router.get('/admin/edit', verify, controller.adminEdit);
router.get('/admin/edit/:article',verify, controller.getArticleData)
router.get('/admin/getArticleNames', verify, controller.getArticleNames);
router.get('/admin/getArticleTitles', verify, controller.getArticleTitles);
router.get('/admin/compare', controller.compareAdmin);

router.post('/newArticle', verify, controller.uploadArticle);
router.post('/sendImg', controller.uploadImg);
router.post('/admin/editArticle',verify, controller.editArticle);
router.post('/admin/deleteArticle', verify, controller.deleteArticle);

router.post('/loginInfo', controller.postLoginInfo);
router.post('/admin/logout',verify, controller.logout);


module.exports = router;
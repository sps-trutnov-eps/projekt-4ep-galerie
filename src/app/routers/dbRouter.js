const path = require('path');
const express = require('express');
const controller = require(path.join(__dirname, '..', 'controllers', 'dbController'));
const router = express.Router();
const verify = require('../middleware/admin-auth')
router.get('/', controller.main);
router.get('/upload', controller.upload);
router.get('/admin',controller.admin);
router.get('/admin/edit', verify, controller.adminEdit);
router.get('/admin/edit/:article',verify, controller.getArticleData)
router.get('/admin/getArticleNames', controller.getArticleNames);
router.get('/admin/getArticleTitles', controller.getArticleTitles);
router.get('/admin/compare', controller.compareAdmin);

router.post('/newArticle',controller.uploadArticle);
router.post('/sendImg', controller.uploadImg);
router.post('/admin/editArticle', controller.editArticle);
router.post('/admin/deleteArticle', controller.deleteArticle);

router.post('/newArticle',controller.uploadArticle);
router.post('/loginInfo', controller.postLoginInfo);


module.exports = router;
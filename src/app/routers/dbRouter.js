const path = require('path');
const express = require('express');
const controller = require(path.join(__dirname, '..', 'controllers', 'dbController'));
const router = express.Router();
const verify = require('../middleware/admin-auth')

router.get('/admin/upload', controller.upload);
router.get('/admin/test', controller.upload);
router.get('/admin',controller.admin);
router.get('/admin/getArticleNames', controller.getArticleNames);
router.get('/admin/edit/:article',verify, controller.getArticleData)
router.get('/admin/edit', verify, controller.adminEdit);
router.get('/admin/getArticleTitles', controller.getArticleTitles);
router.get('/admin/compare', controller.compareAdmin);
router.get('/projekty/detail/:id', controller.detail);

router.post('/newArticle',controller.uploadArticle);
router.post('/admin/sendImg',controller.pre_upload ,controller.uploadImg, controller.uploadArticle);
router.post('/admin/editArticle', controller.editArticle);
router.post('/admin/deleteArticle', controller.deleteArticle);

router.post('/newArticle',controller.uploadArticle);
router.post('/admin/loginInfo', controller.postLoginInfo);

router.post('/hodnoceni',controller.hodnoceni);

module.exports = router;
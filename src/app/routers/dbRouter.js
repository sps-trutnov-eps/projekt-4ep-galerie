const path = require('path');
const express = require('express');
const controller = require(path.join(__dirname, '..', 'controllers', 'dbController'));
const router = express.Router();
const verify = require('../middleware/admin-auth')

router.get('/admin/upload', verify, controller.upload);
router.get('/admin',controller.admin);
router.get('/admin/getArticleNames', verify, controller.getArticleNames);
router.get('/admin/edit/:article',verify, controller.getArticleData)
router.get('/admin/edit', verify, controller.adminEdit);
router.get('/admin/getArticleTitles', verify, controller.getArticleTitles);
router.get('/admin/compare', controller.compareAdmin);
router.get('/projekty/detail/:id', controller.detail);

router.post('/newArticle', verify, controller.uploadArticle);
router.post('/admin/sendImg',controller.pre_upload ,controller.uploadImg, controller.uploadArticle);
router.post('/admin/editArticle', verify, controller.editArticle);
router.post('/admin/deleteArticle', verify, controller.deleteArticle);

router.post('/admin/loginInfo', controller.postLoginInfo);
router.post('/admin/logout', controller.logout)

router.post('/hodnoceni',controller.hodnoceni);

module.exports = router;
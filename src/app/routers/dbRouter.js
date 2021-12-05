const path = require('path');
const express = require('express');
const controller = require(path.join(__dirname, '..', 'controllers', 'dbController'));
const router = express.Router();

router.get('/', controller.main);
router.get('/upload', controller.upload);
router.get('/admin',controller.admin);
router.get('/admin/edit', controller.adminEdit);
router.get('/admin/edit/:article', controller.getArticleData)
router.get('/admin/getArticleNames', controller.getArticleNames);
router.get('/admin/getArticleTitles', controller.getArticleTitles);

router.post('/admin/editArticle', controller.editArticle);
router.post('/admin/deleteArticle', controller.deleteArticle);

module.exports = router;
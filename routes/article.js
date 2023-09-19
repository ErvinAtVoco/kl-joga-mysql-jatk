const express = require('express');
//get using express router
const router = express.Router();
//define article controller and import it into this file
const articleController = require('../controllers/article');

//use controller functions according to the route
router.get('/', articleController.getAllArticles);
router.get('/article/:slug', articleController.getArticlesBySlug);
router.get('/:author', articleController.getArticlesByAuthor);
router.get('/article/create', articleController.showNewArticleForm);
router.post('/create', articleController.createNewArticle);

//export article router
module.exports = router;
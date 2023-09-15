//import database connection
const con = require('../utils/db');
//import article model
const Article = require('../models/article.model');

//get all articles
const getAllArticles = (req, res) => {
    Article.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message : err.message || 'Some error occurred retrieving articles data'
            })
        } else {
            console.log(data)
            res.render('index', {
                articles: data
            })
        }
    })
};

//get articles by slug
const getArticlesBySlug = (req, res) => {
    Article.getBySlug(req.params.slug, (err, data) => {
        if (err) {
            res.status(500).send({
                message : err.message || 'Some error occurred retrieving articles data'
            })
        } else {
            console.log(data)
            res.render('article', {
                article: data
            })
        }
    })
}

//get articles by author
const getArticlesByAuthor = (req, res) => {
    Article.getByAuthor(req.params.author, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error occurred retrieving articles data'
            })
        } else {
            console.log(data)
            res.render('author', {
                article: data,
                authorName: data[0].name
            })
        }
    })
}

module.exports = {
    getAllArticles,
    getArticlesBySlug,
    getArticlesByAuthor
}
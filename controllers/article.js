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
                authors: data,
                authorName: data[0].name
            })
        }
    })
}

//Create a new article
const createNewArticle = (req, res) => {
    //New article from post data
    console.log("new article")

    const newArticle = new Article({
        name: req.body.name,
        slug: req.body.slug,
        image: req.body.image,
        body: req.body.body,
        published: new Date().toISOString().slice(0, 19).replace('T', ' '),
        author_id: req.body.author_id
    })

    Article.createNew(newArticle, (err, data) => {
        if(err){
            res.status(500).send({
                message: err.message || 'Some error occurred sending articles data'
            })
        } else {
            console.log(data)
            res.redirect('/')
        }
    })
}

const showNewArticleForm = (req, res) => {
    Article.getAuthorsForCreate((err, data) => {
        if (err) {
            res.status(500).send({
                message : err.message || 'Some error occurred retrieving authors data'
            })
        } else {
            console.log(data)
            res.render('create_article', {
                authors: data.name
            })
        }
    })
}

const showEditArticleForm = (req, res) => {
    Article.getForEditing(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                message : err.message || 'Some error occurred retrieving article data'
            })
        } else {
            console.log(data)
            res.render('edit_article', {
                authors: data.name,
                article: data
            })
        }
    })
}

const editArticle = (req, res) => {

    const editedArticle = {
        name: req.body.name,
        slug: req.body.slug,
        image: req.body.image,
        body: req.body.body,
        author_id: req.body.author_id
    }

    Article.editArticle(editedArticle, (err, data) => {
        if(err){
            res.status(500).send({
                message: err.message || 'Some error occurred sending articles data'
            })
        } else {
            console.log(data)
            res.redirect('/')
        }
    })
}

const deleteArticle = (req, res) => {
    Article.deleteArticle((err, data) => {
        if(err){
            res.status(500).send({
                message: err.message || 'Some error occurred deleting articles data'
            })
        } else {
            console.log(data)
            res.redirect('/')
        }
    })
}


module.exports = {
    getAllArticles,
    getArticlesBySlug,
    getArticlesByAuthor,
    createNewArticle,
    showNewArticleForm,
    showEditArticleForm,
    editArticle,
    deleteArticle
}
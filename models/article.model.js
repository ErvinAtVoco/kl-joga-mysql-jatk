//import database connection
const con = require('../utils/db');

//constructor
const Article = function(Article){
    this.name = article.name
    this.slug = article.slug
    this.image = article.image
    this.body = article.body
    this.published = article.published
    this.author_id = article.author_id
};

//get all articles
Article.getAll = (result) => {
    let query = `SELECT * FROM article`;
    let articles = []
    con.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        articles = res
        console.log("articles: ", articles)
        result(null, articles);
    })

};

Article.getBySlug = (slug, result) => {
    let query = `SELECT article.name as title, article.slug, article.image, article.body, article.published, author.name AS name 
                FROM article 
                LEFT JOIN author 
                ON article.author_id = author.id 
                WHERE article.slug = "${slug}"`
    con.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found article", res[0]);
            result(null, res[0]);
        }
    })

}

Article.getByAuthor = (author, result) => {
    let query = `SELECT article.name as title, article.image, article.slug, author.name as name 
                FROM article 
                INNER JOIN author 
                ON article.author_id=author.id 
                WHERE article.author_id = (SELECT id FROM author WHERE name = "${author}")`
    con.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found articles", res);
            result(null, res);
        }
    })

}

Article.createNew = (newArticle, result) => {
    let query = `INSERT INTO article SET
                name = "${newArticle.name}",
                slug = "${newArticle.slug}",
                image = "${newArticle.image}",
                body = "${newArticle.body}",
                published= "${newArticle.published}",
                author_id = "${newArticle.author_id}"`
    con.query(query, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Created new article: ", {id: res.insertId, ...newArticle});
        result(null, {id: res.insertId, ...newArticle})
    })
}

//export
module.exports = Article;
//import users model
const Users = require('../models/article.model');

const showRegistrationForm = (req, res) => {
    res.render('registration');
};

module.exports = {
    showRegistrationForm
};
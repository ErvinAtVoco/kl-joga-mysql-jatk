//import express and get express router
const express = require('express');
const router = express.Router();
//define users controller and import into this file
const usersController = require ('../controllers/users');

//user controller functions according to the route
router.get('/', usersController.showRegistrationForm);

module.exports = router;
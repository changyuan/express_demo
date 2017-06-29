var express = require('express');
var router = express.Router();

// var router = require('express-promise-router')();

var UsersController =  require('../controllers/user');


router.route('/').get(UsersController.index).post(UsersController.addUser);


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;

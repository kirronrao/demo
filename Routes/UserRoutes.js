var express    = require("express");
var router = express.Router();



var userController = require('../Controllers/UserController');

 router.get('/login', function(req, res) {

     res.render('pages/login');
 });

 router.get('/register', function(req, res) {

     res.render('pages/register');
 });

 router.get('/dashboard', function(req, res) {

     res.render('pages/dashboard');
 });


router.post('/register',userController.register);
router.post('/login',userController.login);

module.exports = router;
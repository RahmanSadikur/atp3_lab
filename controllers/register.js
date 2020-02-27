var express = require('express');

var router = express.Router();
var userModel = require.main.require('./models/user-model');

router.get('/', function(req, res){
	res.render('login/register');
});

router.post('/', function(req, res){

	var user = {
		uid: req.body.uid,
		name: req.body.name,
		phone: req.body.phone,
		email: req.body.email,
		gender: req.body.gender,
		username: req.body.username,
		password: req.body.password,
		
		
	};
	userModel.insert(user, function(status){
	
			if(status){
				res.redirect('/login');
			}else{
				res.redirect('/register');
			}
		});
});

module.exports = router;
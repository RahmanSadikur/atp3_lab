var express = require('express');

var router = express.Router();
var userModel = require.main.require('./models/user-model');

router.get('/', function(req, res){
	res.render('login/index');
});

router.post('/', function(req, res){

	var user ={
		username: req.body.uname,
		password: req.body.password,
		
	};

	userModel.validate(user, function(results){
	 	if(results.utid==1){
			res.cookie('username', req.body.uname);
			res.redirect('/admin');
		 }
			else if(results.utid==1)
			{
				res.cookie('username', req.body.uname);
				res.cookie('username',results.utid);
			res.redirect('/customer');
			}
			else{
				res.send('invalid username/password');
			}
			
		
	});
});

module.exports = router;
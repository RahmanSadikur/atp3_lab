var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');


router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', function(req, res){
	userModel.getByUname(req.cookies['username'], function(result){
		res.render('homeadmin/index', {user: result});
	});
});

router.get('/view_products', function(req, res){
	
		userModel.getAllproduct(function(results){
			if(results.length > 0){
				res.render('homeadmin/view_products', {userlist: results});
			}else{
				res.redirect('/admin');
			}
		});
});
router.get('/view_users', function(req, res){
	
	userModel.getAll(function(results){
		if(results.length > 0){
			res.render('homeadmin/view_users', {userlist: results});
		}else{
			res.redirect('/admin');
		}
	});
});
router.get('/edit/:id', function(req, res){
	userModel.getById(req.params.id, function(result){
		res.render('homeadmin/edit', {user: result});
	});
});

router.get('/delete/:id', function(req, res){
	userModel.delete(req.params.id, function(result){
		res.render('homeadmin/view_users', {user: result});
	});
});


router.get('/adduser', function(req, res){
	
		res.render('homeadmin/new');
	
});
router.post('/adduser', function(req, res){
	var user = {
		uid: req.body.uid,
		name: req.body.name,
		phone: req.body.phone,
		email: req.body.email,
		gender: req.body.gender,
		username: req.body.username,
		password: req.body.password,
		Utid: req.body.utid,
		
	};
	userModel.insert(user, function(status){
	
			if(status){
				res.redirect('/admin/view_users');
			}else{
				res.redirect('/admin');
			}
		});

	});	



router.post('/edit/:id', function(req, res){
	
	var user = {
		uid: req.body.uid,
		name: req.body.name,
		phone: req.body.phone,
		email: req.body.email,
		gender: req.body.gender,
		username: req.body.username,
		password: req.body.password,
		Utid: req.body.utid,
		
	};

		userModel.update(user, function(status){
			if(status){
				res.redirect('/admin/view_users');
			}else{
				res.redirect('/admin/edit/'+req.params.id);
			}
		});
});
router.post('/:id', function(req, res){
	
	var user = {
		uid: req.body.uid,
		name: req.body.name,
		phone: req.body.phone,
		email: req.body.email,
		gender: req.body.gender,
		username: req.body.username,
		password: req.body.password,
		Utid: req.body.utid,
		
	};

		userModel.update(user, function(status){
			if(status){
				res.redirect('/admin');
			}else{
				res.send('error');
			}
		});
});

module.exports = router;
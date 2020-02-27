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
		
		Ename: req.body.Ename,
		Cname: req.body.Cname,
		ContactNo: req.body.ContactNo,
		username: req.body.username,
		password: req.body.password,
		Utid: req.body.Utid,
		jid:req.body.jid
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
		Eid: req.body.Eid,
		Ename: req.body.Ename,
		Cname: req.body.Cname,
		ContactNo: req.body.ContactNo,
		username: req.body.username,
		password: req.body.password,
		Utid: req.body.Utid,
		jid:req.body.jid
	};

		userModel.update(user, function(status){
			if(status){
				res.redirect('/admin/view_users');
			}else{
				res.redirect('/admin/edit/'+req.params.id);
			}
		});
});

module.exports = router;
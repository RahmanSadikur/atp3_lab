var db = require('./db');

module.exports= {
	getById : function(uid, callback){
		var sql = "select * from users where uid=?";
		db.getResults(sql, [uid], function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback(null);
			}
		});
	},
	getAll : function(callback){
		var sql = "select * from users where utid=?";
		db.getResults(sql,[2], function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	getAllproduct : function(callback){
		var sql = "select * from product";
		db.getResults(sql,function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	validate: function(user, callback){
		var sql ="SELECT * FROM users where username=? and password=?";
		db.getResults(sql, [user.username, user.password], function(results){

			if(results.length > 0){
				console.log(results[0].utid);
				
				callback(results[0]);
			}else{
				callback(null);
			}
		});
	},
	getBypname: function(username, callback){
		var sql = "select * from product where pname=?";
		db.getResults(sql, [username], function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback(null);
			}
		});
	},
	getByUname: function(username, callback){
		var sql = "select * from users where username=?";
		db.getResults(sql, [username], function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback(null);
			}
		});
	},
	insert: function(user, callback){
		console.log(user.name+user.phone+ user.email+user.gender+user.username+user.password+user.utid);
		var sql = "insert into users values(?,?,?,?,?,?,?,?)";
		db.execute(sql, [null,user.name,user.phone,user.email,user.gender,user.username,user.password,2], function(status){
			if(status){
				console.log(status);
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	insertproduct: function(user, callback){
		//console.log(user.name+user.phone+ user.email+user.gender+user.username+user.password+user.utid);
		var sql = "insert into product values(?,?,?,?,?,?,?,?)";
		db.execute(sql, [null,user.pname,user.psize,user.pquantity,user.image,user.pdescription,user.price,user.catagory], function(status){
			if(status){
				console.log(status);
				callback(true);
			}else{
				callback(false);
			}
		});
	},


	update : function(user, callback){
		var sql = "update users set name=?,phone=?,email=?,gender=?,username=?, password=? where uid=?";
		db.execute(sql, [user.name,user.phone,user.email,user.gender,user.username,user.password,user.uid], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	updateproduct : function(user, callback){
		var sql = "update product set pname=?,psize=?,pquantity=?,image=?,pdescription=?, price=?,catagory=? where pid=?";
		db.execute(sql, [user.pname,user.psize,user.pquantity,user.image,user.pdescription,user.price,user.catagory,user.pid], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},


	delete: function(id, callback){
		var sql = "delete from users where uid=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}
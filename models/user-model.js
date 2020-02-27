var db = require('./db');

module.exports= {
	getById : function(id, callback){
		var sql = "select * from users where id=?";
		db.getResults(sql, [id], function(results){
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
	validate: function(user, callback){
		var sql ="SELECT * FROM users where username=? and password=?";
		db.getResults(sql, [user.username, user.password], function(results){

			if(results.length > 0){
				callback(results);
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
	insert: function(user, callback){
		console.log(user.name+user.phone+ user.email+user.gender+user.username+user.password+user.utid);
		var sql = "insert into users values(?,?,?,?,?,?,?)";
		db.execute(sql, [user.name,user.phone,user.email,user.gender,user.username,user.password,user.utid], function(status){
			if(status){
				console.log(status);
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	update : function(user, callback){
		var sql = "update users set name=?,phone=?,email=?,gender=? username=?, password=? where uid=?";
		db.execute(sql, [user.name,user.phone,user.email,user.gender,user.username,user.password,user.uid], function(status){
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
var express = require('express');
var router = express.Router();

/* GET home page. */

module.exports = function(app){
	app.get("/",function(req,res){
		res.render('index',{ title: 'index'});
	});

	app.get('/login',function(req,res){
		res.render('login',{ title:'user login!'});
	});

	app.post("/doLogin",function(req,res){
		var user = {
			username:'admin',
			password:'admin'
		}
		console.log("username:"+req.body.username);
		console.log("username:"+req.body.password);
		if(req.body.username==user.username && req.body.password == user.password){
			res.redirect('/home');
		}
		res.redirect('/login');
	})

	app.get('/logout',function(req,res){
		res.redirect("/");
	});

	app.get('/home',function(req,res){
		var user = {
			username:'admin',
			password:'admin'
		}
		res.render('home',{
			title:'home',
			user:user
		});
	});
};

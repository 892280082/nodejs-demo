var express = require('express');
var router = express.Router();

/* GET home page. */

module.exports = function(app){

	//catch session
	app.use(function(req, res, next){
		var user = req.session.user;
		if(user != null){
			res.locals.user = user;
		}
  		next();
	});

	app.use(function(req,res,next){
		res.locals.user = req.session.user;
		var err = req.session.error;
		delete req.session.error;
		res.locals.message = '';
		if(err) res.locals.message = "<div class='alert alert alert-danger'>"+err+"</div>";
		next();
	})

	//goto indexpage
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
		if(req.body.username==user.username && req.body.password == user.password){
			req.session.user = user;
			return res.redirect('/home');
		}else{
			return res.redirect('/login');
		}
	})

	app.get('/logout',function(req,res){
		req.session.user = null;
		res.redirect("/");
	});

	app.get('/home',function(req,res){
		res.render('home',{
			title:'home',
		});
	});
};


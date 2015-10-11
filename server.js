var express = require('express'),
	PORT	= process.env.PORT || 5432,
	server	= express(),
	MONGOURI = process.env.MONGOLAB_URI || "mongodb://localhost:27017",
	dbname	= "baubleBarForum",
	mongoose = require('mongoose');

var ejs = require('ejs'),
	bodyParser = require('body-parser'),
	expressLayouts = require('express-ejs-layouts'),
	session = require('express-session'),
	methodOverride = require('method-override'),
	morgan=require('morgan'),
	Schema = mongoose.Schema;


server.use(express.static("./public"));
server.use(morgan('dev'));
server.use(expressLayouts);
server.use(methodOverride('_method'));

server.set('views', './views');
server.set('view engine', 'ejs'); 

server.use(bodyParser.urlencoded({
	extended:true
}));

server.use(session({
	secret: "bleepbloopbleep",
	resave: false,
	saveUninitialized: true
}))

//utility routes

server.use(function(req,res,next){
	console.log("req dot body", req.body);
	console.log("req dot params", req.params);
	console.log("req dot sesion", req.session);
	next(); //remember to continue on to the next part of sesion setting
})
// server.use(function(req,res,next){

// })

//routes
var userController = require('./controllers/users.js');
server.use('/users', userController);
//this is importing the userController, telling everything inside it to be a sub route to /users


//defined routes
server.get('/users', function(req,res) {
	res.render('users/new');
})

server.get('/test', function(req,res) {
	res.write("Welcome to my amazing app");
	res.end();
});

//catchall routes, as last resort
server.use(function(req,res,next){
	res.send("Sorry, no more pages, continue coding!!");
	res.end();
})

// mongoose.connect(MONGOURI + "/" + baubleBarForum);
server.listen(PORT, function() {
	console.log("SERVER IS UP ON PORT:", PORT);
});

mongoose.set('debug', false);

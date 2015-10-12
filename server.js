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

server.use(session({
	secret: "bleepbloopbleep",
	resave: false,
	saveUninitialized: true
}))

server.use(bodyParser.urlencoded({
	extended:true
}));

//defined routes

server.get('/test', function(req,res) {
	res.write("Welcome to my amazing app");
	res.end();
});

server.get('/', function(req,res) {
	res.render('welcome');
	res.end();
});
//utility routes

server.use(function(req,res,next){
	console.log("req dot body", req.body);
	console.log("req dot params", req.params);
	console.log("req dot sesion", req.session);
	next(); //remember to continue on to the next part of sesion setting
})
server.use(function(req,res,next){
	req.session.viewCount = req.session.viewCount || 0;
	req.session.viewCount++;
	console.log("Number of views", req.session.viewCount);
})

//routes
var userController = require('./controllers/users.js');
server.use('/users', userController);

// var postsController = require('./controllers/posts.js');
// server.use('/posts', postsController);
//anytime i go to anything inside posts, use my post controller





//catchall routes, as last resort
server.use(function(req,res,next){
	res.send("Sorry, no more pages, continue coding!!");
	res.end();
})

//Mongoose starts
mongoose.set('debug', false);
// mongoose.connect(MONGOURI + "/" + dbname);
//mongoose.connect(mongodb://localhost:27017/baubleBarForum)
server.listen(PORT, function() {
	console.log("SERVER IS UP ON PORT:", PORT);
});

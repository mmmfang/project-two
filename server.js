var express = require('express'),
	PORT	= process.env.PORT || 5432,
	server	= express(),
	MONGOURI = process.env.MONGOLAB_URI || "mongodb://localhost:27017/baubleBarForum",
	dbname	= "baubleBarForum",
	mongoose = require('mongoose');

var ejs = require('ejs'),
	bodyParser = require('body-parser'),
	expressLayouts = require('express-ejs-layouts'),
	session = require('express-session'),
	methodOverride = require('method-override'),
	morgan=require('morgan'),
	Schema = mongoose.Schema;

//server needs to Use...
server.set('views', './views');
server.set('view engine', 'ejs'); 

server.use(session({
	secret: "whyohwhyarentyousaving",
	resave: true,
	saveUninitialized: false
}));

server.use(express.static("./public"));
server.use(morgan('dev'));
server.use(expressLayouts);


server.use(bodyParser.urlencoded({
	extended:true
}));

server.use(methodOverride('_method'));

//routes to Controllers
var usersController = require('./controllers/users.js');
server.use('/users', usersController);

var postsController = require('./controllers/posts.js');
server.use('/posts', postsController);
//anytime i go to anything inside posts, use my post controller


//defined routes

server.get('/', function(req,res) {
	res.render('homepage');
});

// server.use(function(req,res,next){
// 	if req.session.username == undefined {
// 		res.redirect(302,'/')
// 	} else {
// 		res.locals.user = req.session.username;
// 		next();
// 	}
// });

server.use('/welcome', function(req, res) {
	if (req.session.currentUser) {
		res.render('welcome', {
			currentUser: req.session.currentUser
		});
	} else {
		res.redirect(301, '/users/login');
	}
});

 // server.use(function (req, res, next) {
 //    res.locals.flash  = req.session.flash || {};
 //    req.session.flash = {};
 //    next();
 //  });

server.get('/test', function(req,res) {
	res.write("Welcome to my fantastico app");
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
	next();
})

//catchall routes, as last resort
server.use(function(req,res,next){
	res.send("Sorry, no more pages, continue coding!!");
	res.end();
})

//Mongoose starts
mongoose.set('debug', false);
mongoose.connect(MONGOURI + "/" + dbname);
// mongoose.connect('mongodb://localhost:27017/baubleBarForum', function(){
// 	console.log("connected to local mongodb");
// });
var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function callback() {
            console.log('db connection open');
        });
        
server.listen(PORT, function() {
	console.log("SERVER IS UP ON PORT:", PORT);
});



var express = require('express'),
	PORT	= process.env.PORT || 5432,
	server	= express(),
	MONGOURI = process.env.MONGOLAB_URI || "mongodb://localhost:27017",
	dbname	= "some_useful_name",
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

server.get('/test', function(req,res) {
	res.write("Welcome to my amazing app");
	res.end();
});

// mongoose.connect(MONGOURI + "/" + baubleBarForum);
server.listen(PORT, function() {
	console.log("SERVER IS UP ON PORT:", PORT);
});

mongoose.set('debug', false);

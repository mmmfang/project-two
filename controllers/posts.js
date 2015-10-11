var express = require('express'),
	router = express.Router(),
	User = require('../models/posts.js');

// //index
// router.get('/', function(req, res) {
// 	User.find({}, function(err, allUsers){
// 	res.render('users/index', {
// 		user: allUsers
// 	});
//  });
// }); 

// //new
// router.get('/new', function(req, res) {
// 	User.find({}, function(err, allUsers){
// 	res.render('users/index', {
// 		user: allUsers
// 	});
//  });
// }); 

// //create
// router.post('/', function(req, res) {

// }); 
// //show
// router.get('/:id', function(req, res) {
// 	User.find({}, function(err, allUsers){
// 	res.render('users/index', {
// 		user: allUsers
// 	});
//  });
// }); 

// //edit
// router.get('/id:edit', function(req, res) {
// 	User.find({}, function(err, allUsers){
// 	res.render('users/index', {
// 		user: allUsers
// 	});
//  });
// }); 

// //edit
// router.get('/id:edit', function(req, res) {
// 	User.find({}, function(err, allUsers){
// 	res.render('users/index', {
// 		user: allUsers
// 	});
//  });
// }); 

// //edit
// router.get('/id:edit', function(req, res) {
// 	User.find({}, function(err, allUsers){
// 	res.render('users/index', {
// 		user: allUsers
// 	});
//  });
// }); 
module.exports = router;
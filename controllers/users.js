// var express = require('express'),
// 	router = express.Router(),
// 	User = require('../models/user.js');

// // router.get('/', function(req, res) {
// // 	User.find({}, function(err, allUsers){
// // 	res.render('users/index', {
// // 		user: allUsers
// // 	});
// //  });
// // }); 

// router.get('/', function(req,res) {
// 	res.render('welcome');
// });

// //define routes for sign in router
// router.get('/new', function(req, res) {
// 	res.render('users/new');
// }); //works

// router.post('/new', function(req,res) {
// 	var newUser = User(req.body.user);
// 	console.log(newUser); //works here but then redirect dont
// 	//req.param is the user ID? if so get that and render it's name in welcome page, and redirect to its number
// 	myCurrentUser = req.session.newUser;
// 	res.redirect(301,'/welcome')
	
// })

//  router.get('/:id', function(req,res){
//  	User.findById(req.params.id, function(err,user){
// -		console.log(user);
// +		console.log(err, user);
//  	})
//  })
// //route for login router
// router.get('/login', function(req,res){
// 	res.render('users/login');
// }) //works

// router.post('/login', function(req,res){
// 	var attempt = req.body.user;
// 	User.findOne({username: attempt.username}, function(err, user) {
// 		console.log(user);
// 		if (user && user.password=== attempt.password) {
// 			req.session.currentUser = user.username;

// 			res.redirect(301,"/welcome");
// 		} else {
// 			console.log("no user w that name");
// 			res.redirect(301, "/users/login")
// 		}
// 	});
// });

// router.get('/welcome', function(req, res) {
// 	if (req.session.currentUser) {
// 	res.render('welcome', {
// 		currentUser: req.session.currentUser
// 	});
// 	} else {
// 		res.redirect(301, '/users/login');
// 	}
// });


// //To show all users
// router.get('/:id', function(req,res){
// 	User.findById(req.params.id, function(err,user){
// 		console.log(err, user);
// 	})
// })
// // })
// // //To edit
// // router.get('/:id/edit', function(req,res){
// // 	})
// // })

// // router.patch('/:id', function(req,res){
// // 	})
// // })

// // router.delete('/:id', function(req,res){
// // 	})
// // })

// //export router object
// module.exports = router;

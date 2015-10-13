var express = require('express'),
	router = express.Router(),
	User = require('../models/user.js');


router.get('/', function(req, res) {
	User.find({}, function(err, allUsers){
	res.render('users/index', {
		user: allUsers
	});
 });
}); 


//////// SIGN IN ROUTE /////////
router.get('/new', function(req, res) {
	res.render('users/new');
}); //works again hallelujah

router.post('/', function(req,res) {
	var newUser = User(req.body.user);
	console.log("new user is", newUser);
//	console.log("id is", newUser._id); not needed, is grabbing ID

	newUser.save(function(err,user){
		if (err) {
			console.log("new user not added, error");
		} else {
			res.redirect(301, "/users/" + newUser._id);
		}
	})
});

///////	LOGIN ROUTE ////
router.get('/login', function(req,res){
	res.render('users/login');
}) //works

router.post('/login', function(req,res){
	var attempt = req.body.user;
	console.log(attempt);
	User.findOne({username: attempt.username}, function(err, user) {
		console.log(user);
		if (user && user.password=== attempt.password) {
			req.session.currentUser = user.username;

			res.redirect(301,"/welcome");
		} else {
			console.log("no user w that name");
			res.redirect(301, "/users/login")
		}
	});
});

// router.get('/welcome', function(req, res) {
// 	if (req.session.currentUser) {
// 	res.render('welcome', {
// 		currentUser: req.session.currentUser
// 	});
// 	} else {
// 		res.redirect(301, '/users/login');
// 	}
// });

router.get('/:id', function(req,res){
 	User.findById(req.params.id, function(err,user){
		console.log(user);
 	})
 })


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


//export router object
module.exports = router;

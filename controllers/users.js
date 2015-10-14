var express = require('express'),
	router = express.Router(),
	User = require('../models/user.js');



//////// SIGN UP ROUTE /////////
router.get('/new', function(req, res) {
	res.render('users/new');
}); //works 


router.post('/', function(req,res) {
	var newUser = User(req.body.user);
	console.log("new user is", newUser);

	req.session.currentUser = newUser.username; //works til here,not sure if saving

	newUser.save(function(err, user){
		if (err) {
			console.log("new user not added");
		} else {
			// res.redirect(301, "users/" + user._id);
			res.redirect(301, 'welcome');
		}
	}) 
});

///////	LOGIN ROUTE ////
router.get('/login', function(req,res){
	res.render('users/login');
}) //works

router.post('/', function(req,res){
	var attempt = req.body.user;
	console.log(attempt);
	User.findOne({username: attempt.username}, function(err, user) {
		console.log(user);
		if (user && user.password=== attempt.password) {
			req.session.currentUser = user.username;
			res.redirect(301,"welcome");
		} else {
			console.log("no user w that name");
			res.redirect(301, "users/login")
		}
	});
});

// for singup
router.get('/:id', function(req,res){
 	User.findById(req.params.id, function(err,user){
		console.log(user);
 	})
 })

// '/edit/:id'  User.findByreq.params.id

// //To show all users
// router.get('/:id', function(req,res){
// 	User.findById(req.params.id, function(err,user){
// 		console.log(err, user);
// 	})
// })
// // })

//SHOW ALL USERS

router.get('/', function(req, res) {
	User.find({}, function(err, allUsers){
		if (err) {
			console.log("error creating index w all users");
		} else {
			res.render('/users/index',{
				users:allUsers
			});
		}
	})
});
	

// router.get('/welcome', function(req,res){
// 	if(req.session.currentUser) {
// 		res.render('welcome', {
// 			currentUser: req.session.currentUser
// 		});
// 	} else {
// 		res.redirect(301, '/users/login')
// 	}
// });

// router.get('/welcome', function(req,res){
// 	res.render('welcome');
// })


//To edit
router.get('/:id/edit', function(req,res){
	User.findOne({_id: req.session.currentUser._id}, function(err,currentUser){
		if (err) { 
			console.log("can't edit, u not logged in")
		} else if (currentUser) {
			if (currentUser._id === req.params.id) {
				res.render('/edit', {user:currentUser});
			} else {
				res.redirect(302,'/users/' + currentUser._id + '/edit');	
			}
		} else {
		  	delete res.session.currentUser;
		  	res.redirect(302, '/session/new');
		  }
		
	})
});

// // router.patch('/:id', function(req,res){
// // 	})
// // })

// // router.delete('/:id', function(req,res){
// // 	})
// // })


//export router object
module.exports = router;

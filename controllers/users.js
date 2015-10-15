var express = require('express'),
	router = express.Router(),
	User = require('../models/user.js');


//////// SIGN UP ROUTE /////////
router.get('/new', function(req, res) {
	res.render('users/new');
}); //works 

///AFTER GOING THRU SIGNUP PAGE
router.post('/', function(req,res) {
	var newUser = User(req.body.user);
	console.log("new user is", newUser);

	req.session.currentUser = newUser.username; 

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
	res.render('session/login');
}) //works


///AFTER GOING THRU LOGIN PAGE

router.post('/', function(req,res){
	var attempt = req.body.user;
	console.log("attempt is ", attempt);
	User.findOne({username: attempt.username}, function(err, user) {
		console.log(user);
		if (user && user.password=== attempt.password) {
			req.session.currentUser = user.username;
			res.redirect(301,"welcome");
		} else {
			console.log("no user w that name");
			res.redirect(301, "users/new")
		}
	});
});

//BELOW IS CONFUSINGGG


// //To show all users and their posts
// router.get('/:id', function(req,res){
// 	var user= req.params.username;

// 	Post.find({
// 		user: authorName
// 	}, function(err, authorPosts) {
// 		if (err) {
// 			console.log("err getting all author posts")
// 		} else {
// 			res.render('/posts', {
// 				user: authorName,
// 				posts: authorPosts
// 			})
// 		}
// 	})
// })

//SHOW ALL USERS

router.get('/index', function(req, res) {
	User.find({}, function(err, allUsers){
		if (err) {
			console.log("error creating index w all users");
		} else {
			res.render('/users/index',{
				users: allUsers
			});
		}
	})
});


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



//export router object
module.exports = router;

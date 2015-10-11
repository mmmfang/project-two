var express = require('express'),
	router = express.Router(),
	User = require('../models/user.js');

//define routes for this router
router.get('/new', function(req, res) {
	res.render('users/new');
})

router.post('/', function(req,res) {
	var newUser = User(req.body.user);
	console.log(newUser); 
	newUser.save(function(err, user){
		res.redirect(301,'/users/' + user._id)
	})
})

router.get('/login', function(req,res){
	res.render('users/login');
})

router.post('/login', function(req,res){
	var attempt = req.body.user;
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

router.get('/:id', function(req,res){
	User.findById(req.params.id, function(err,user){
		console.log(err, user);
	})
})

//export router object
module.exports = router;


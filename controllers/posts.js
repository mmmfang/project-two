var express = require('express'),
	router = express.Router(),
	Post = require('../models/post.js');

//index
router.get('/', function(req, res) { 
	Post.find({}, function (err, allPosts){
		if (err) {
			console.log("error creating index w all posts");
		} else {
			res.render('posts/index', {
				posts: allPosts
			});
		}
	})
}); 

// new - form is here
router.get('/new', function(req, res) {
	res.render('posts/new');
//works   
});

var postArray = [];

// //CREATE - submitting the form to server
router.post('/', function(req,res){
	var newPost = new Post(req.body.post);
	console.log("new post is:", newPost);

	postArray.push(req.body.post);

	newPost.save(function(err,posts){
		if (err) {
			console.log("new post not added, try again");
		} else {
			res.redirect(301,'posts');
		}
	})
});


//METHOD TO DO IF STORING IN LOCAL MEMORY
// router.post('/new', function(req,res){
// 	users.push(req.body.user);
// 	res.redirect(302,'new')
// })

// router.get('/new', function(req,res) {
// 	res.render('/user??', function(req,res){
// 		res.render('users', {
// 			allUsers: users
// 		})
// 	}
// }

 
// //show - READ
router.get('/:id', function(req, res) {
// 	Post.find({}, function(err, allPosts){
// 	res.render('posts/index', { 
//		posts: allPosts
// 	});
//  });
}); 

// //edit
router.get('/:id/edit', function(req, res) {
// 	Post.findbyId(req.params.id, function(err, specifiedPost){
// 		if (err) {
// 			console.log("error editing post");
// 		} else {
// 			res.render('posts/edit', {
// 				post: specifiedPost
// 			});
// 		}
// 	}) 
});

// //patch - UPDATE

router.patch('/:id', function(req, res) {
// 	var updatedPost = req.body.post;
// 	Post.findByIdandUpdate(req.params.id, updatedPost, function(err, updatedPost){
// 		if (err) {
// 			console.log("error patching post");
// 		} else {
// 			res.redirect(301, '/')
// 		}
// 	})

// 	User.find({}, function(err, allUsers){
// 	res.render('users/index', {
// 		user: allUsers
// 	});
//  });
}); 

// //delete - DELETE
router.delete('/:id', function(req, res) {
// 	Post.findByIdAndRemove(req.params.id, function(err){
// 		if(err) {
// 			console.log("can't delete post, try again");
// 		} else {
// 			res.redirect(302, '/');
// 		}
// 	}) 
});

module.exports = router;
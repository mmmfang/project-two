var express = require('express'),
	router = express.Router(),
	User = require('../models/posts.js');

//index
router.get('/index', function(req, res) { 
// 	User.find({}, function(err, allPosts){
// 	if (err){ 
// 		console.log("error showing all the posts");
// 	} else {
// 	res.render('posts/index', {
// 		posts: allPosts
// 	});
//  };
// });
}); 

// new - form is here
router.get('/new', function(req, res) {
	res.render('posts/new');

	// var newPost = new Post(req.body.post);

	// newPost.save(function(err, allPosts) {
 //    if (err) {
 //      console.log("New post not added");
 //    } else {
 //      res.redirect(302, '/');
 //    }
 //  })
});

// //define routes for sign in router
// router.get('/new', function(req, res) {
// 	res.render('users/new');
// }); //works
// // //CREATE - submitting the form to server
// router.post('/', function(req,res){

// });
 
// // //show - READ
// router.get('/:id', function(req, res) {
// // 	Post.find({}, function(err, allPosts){
// // 	res.render('posts/index', {
// // 		user: allUsers
// // 	});
// //  });
// }); 

// // //edit
// router.get('/:id/edit', function(req, res) {
// // 	Post.findbyId(req.params.id, function(err, aSpecificPost){
// // 		if (err) {
// // 			console.log("edit post error");
// // 		} else {
// // 			res.render('posts/edit', {
// // 				post: aSpecificPost
// // 			});
// // 		}
// // 	}) 
// });

// // //patch - UPDATE

// router.patch('/:id', function(req, res) {
// // 	var updatedPost = req.body.post;
// // 	Post.findByIdandUpdate(req.params.id, updatedPost, function(err, updatedPost){
// // 		if (err) {
// // 			console.log("error patching post");
// // 		} else {
// // 			res.redirect(301, '/')
// // 		}
// // 	})

// // 	User.find({}, function(err, allUsers){
// // 	res.render('users/index', {
// // 		user: allUsers
// // 	});
// //  });
// }); 

// // //delete - DELETE
// router.delete('/:id', function(req, res) {
// // 	Post.findByIdAndRemove(req.params.id, function(err){
// // 		if(err) {
// // 			console.log("can't delete post, try again");
// // 		} else {
// // 			res.redirect(302, '/');
// // 		}
// // 	}) 
// });

module.exports = router;
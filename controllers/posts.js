var express = require('express'),
	router = express.Router(),
	Post = require('../models/post.js');

//index
router.get('/', function(req, res) { 
	Post.find({}, function (err, postsArray){
		if (err) {
			console.log(err);
		} else {
			res.render('posts/index', {posts: postsArray});
		}
	})
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
	console.log("posts new is working,hopefully rendering too");
	res.render('posts/new');
  
});


// //CREATE - submitting the form to server
router.post('/', function(req,res){
	var newPost = new Post(req.body.post);
	console.log("new post is:", newPost);

	newPost.save(function(err,posts){
		if (err) {
			console.log("new post not added, try again");
		} else {
			res.redirect(301,'/')
		}
	})
});
	// newPost.save(function(err, allPosts) {
 //    if (err) {
 //      console.log("New post not added");
 //    } else {
 //      res.redirect(302, '/');
 //    }
 //  })
// });
 
// // //show - READ
// router.get('/:id', function(req, res) {
// // 	Post.find({}, function(err, allPosts){
// // 	res.render('posts/index', {
// // 		user: allUsers, 
// //		posts: allPosts
// // 	});
// //  });
// }); 

// // //edit
// router.get('/:id/edit', function(req, res) {
// // 	Post.findbyId(req.params.id, function(err, specifiedPost){
// // 		if (err) {
// // 			console.log("error editing post");
// // 		} else {
// // 			res.render('posts/edit', {
// // 				post: specifiedPost
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
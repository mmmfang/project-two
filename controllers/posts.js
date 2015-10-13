var express = require('express'),
	router = express.Router(),
	Post = require('../models/post.js');

////////////////////////////////////////////////////////////////
////////////////ROUTES FOR POSTS ///////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

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

////// NEW POST - new post form is here - this works
router.get('/new', function(req, res) {
	res.render('posts/new');
});

////// CREATE POST- submitting the form to server - this works
router.post('/', function(req,res){
	var newPost = new Post(req.body.post);
	console.log("new post is:", newPost);

	newPost.save(function(err,posts){
		if (err) {
			console.log("new post not added, try again");
		} else {
			res.redirect(301,'posts');
		}
	})
});

/////INDEX - SHOW ALL POSTS - works

///CURRENTLY TESTING COMMENTS SECTION

///// NEW COMMENT (which goes under posts)
router.get('/comment', function(req, res) {
	res.render('posts/comment');  
});

//////CREATE NEW COMMENT - submitting the comment form to server
// router.post('/comment', function(req,res){
// 	var newComment = new Comment(req.body.post.comment);
// 	console.log("new comment on that post is:", newComment);

// 	newComment.save(function(err,comments){
// 		if (err) {
// 			console.log("new comment not added, try again");
// 		} else {
// 			res.redirect(301,'index');
// 		}
// 	})
// });

// router.get('/', function(req, res) { 
// 	Post.find({}, function (err, allPosts){
// 		if (err) {
// 			console.log("error creating index w all posts and comments");
// 		} else {
// 			res.render('posts/index', {
// 				posts: allPosts,
// 			});
// 		}
// 	})
// });

///END COMMENTS SECTION


// //show - READ - can this work for each indiv user???
router.get('/:id', function(req, res) {
// 	Post.find({}, function(err, allPosts){
// 	res.render('posts/index', { 
//		posts: allPosts
// 	});
//  });
}); 
// //edit
router.get('/:id/', function(req, res) {
// 	Post.findbyId(req.params.id, function(err, specifiedPost){
// 		if (err) {
// 			console.log("error editing post");
// 		} else {
// 			res.render('posts/', {
// 				post: specifiedPost
// 			});
// 		}
// 	}) 
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
// 			res.redirect(301, '/posts/'+ updatedPost._id)
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
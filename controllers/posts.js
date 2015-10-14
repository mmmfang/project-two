var express = require('express'),
	router = express.Router(),
	Post = require('../models/post.js');

////////////////////////////////////////////////////////////////
////////////////ROUTES FOR POSTS ///////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////


////// NEW POST - new post form is here - this works
router.get('/new', function(req, res) {
	res.render('posts/new');
});

////// CREATE POST- submitting the form to server - this works
router.post('/', function(req,res){
	var newPost = new Post(req.body.post);
	console.log("new post is:", newPost);

	newPost.save(function(err,post){
		if (err) {
			console.log("new post not added, try again");
		} else {
			res.redirect(301,'posts');
		}
	})
});

///// INDEX - SHOW ALL POSTS - works
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

//DELETE //works
router.delete('/:id', function(req, res) {
	Post.findByIdAndRemove(req.params.id, function(err){
		if(err) {
			console.log("can't delete post, try again");
		} else {
			res.redirect(302, 'posts/index');
		}
	}) 
});

///NEEDS MUCHO TESTING - COMMENTS SECTION

///// NEW COMMENT (which goes under posts)
router.get('/comment', function(req, res) {
	res.render('posts/comment');  
}); //the comment page loads but its not connected to anything

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
// END COMMENTS TESTING SECTION


//edit - first I am getting its ID - do i need this???
// router.get('/:id/', function(req, res) {
// 	Post.findbyId(req.params.id, function(err, specifiedPost){
// 		if (err) {
// 			console.log("error getting id I think??");
// 		} else {
// 			res.render('posts', {
// 				post: specifiedPost
// 			});
// 		}
// 	}) 
// });

//edit
router.get('/:id/edit', function(req, res) {
	Post.findById(req.params.id, function(err, specifiedPost){
		if (err) {
			console.log("error editing post");
		} else {
			res.render('posts/edit', {
				post: specifiedPost
			});
		}
	}) 
});

// //patch - UPDATE

router.patch('/:id', function(req, res) {
	var changedPost = req.body.post;
	Post.findByIdandUpdate(req.params.id, changedPost, function(err, updatedPost){
		if (err) {
			console.log("error patching post");
		} else {
			res.redirect(301, 'posts')
			// res.redirect(301, '/posts/'+ updatedPost._id)
		}
	})
}); 

router.post('/', function (req, res) {
 var changedPost = req.body.post;
 var newPost = new Post(changedPost);
 newPost.save(function (err, useAfter) {
   if (err) {
     console.log(err);
   } else {
     res.redirect(301, "/");
   }
 });
});



module.exports = router;
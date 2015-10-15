var express = require('express'),
	router = express.Router(),
	Post = require('../models/post.js');

////////////////////////////////////////////////////////////////
////////////////ROUTES FOR POSTS ///////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////


////// NEW POST - new post form is here - this works
router.get('/new', function(req, res) {
	res.render('posts/new', {
	});
});


////// CREATE POST- submitting the form to server - this works
router.post('/', function(req,res){
	var newPost = new Post(req.body.post);
	var postAuthor =req.session.currentUser; 
	console.log("req.session.currentUser is ", postAuthor);
		// user: req.session.username;
		// body: req.body.body;
	console.log("new post is:", newPost);		//at this moment, works till here
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
				posts: allPosts,
				currentUser: req.session.currentUser
			});
		}
	})
}); 

//SHOW EACH POST - works thank f---ing goodness
router.get('/:id', function(req, res) {
	Post.findById(req.params.id, function(err, specifiedPost){
		if (err) {
			console.log("error getting id I think??");
		} else {
			res.render('posts/show', {
				post: specifiedPost
			});
		}
	}) 
});

//EDIT (GET PART) - THIS WORKS
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

//UPDATE POST (PATCH Part) - at long last, you work. Thank you 30 year old Jesus

router.patch('/:id', function(req, res) {
	console.log("shits workinnnnnn!")
	var postOptions = req.body.post;
	Post.findByIdAndUpdate(req.params.id, postOptions, function(err, specifiedPost){
		if (err) {
			console.log("error patching post");
		} else {
			res.redirect(301, '/posts');
			console.log("updated!!!");
			// res.redirect(302, '/'+ specifiedPost._id)
		}
	})
}); 

//TESTING COMMENTS

router.get('/:id/comment', function (req, res) {
	res.render('posts/comment');
	});


// router.post('/:id/comment', function (req, res) {
//   var newComment = req.body.post;

//   newComment.comment.username = req.session.currentUser;
//   newComment.comment.date = Date.now();

//   Post.update(
//     { _id: req.params.id },
//     { $push: newComment },
//     function (){
//     (res.redirect('/:id')
//     );
//   });
// });

///NEEDS MUCHO TESTING - COMMENTS SECTION

///// NEW COMMENT (which goes under posts)
// router.get('/comment', function(req, res) {
// 	res.render('posts/comment');  
// }); //the comment page loads but its not connected to anything

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



//DELETE //works
router.delete('/:id', function(req, res) {
	Post.findByIdAndRemove(req.params.id, function(err){
		if(err) {
			console.log("can't delete post, try again");
		} else {
			res.redirect(302, '/posts');
		}
	}) 
});


router.post('/', function (req, res) {
	var postOptions = req.body.post;
	 	console.log("postOptions is ", postOptions);
 	var newPost = new Post(postOptions);
 		console.log("newPost is ", newPost);
 	
 	newPost.save(function(err, postafterDB) {
   	if (err) {
     console.log("updated post not added");
    } else {
     res.redirect(301, "/");
   }
 });
});


module.exports = router;
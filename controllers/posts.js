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
		author: req.session.currentUser
	});
});

////// CREATE POST- submitting the form to server - this works
router.post('/', function(req,res){
	var newPost = new Post(req.body.post);
	newPost.author =req.session.currentUser; 
	console.log("newPost.author is ", req.session.currentUser);
		// user: req.session.username;
		// body: req.body.body;
	console.log("new post is:", newPost);		//at this moment, works till here
	newPost.save(function(err,post){
		if (err) {
			console.log("new post not added, try again");
		} else {
			res.redirect(301,'posts')
			// author: req.session.currentUser;
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
				author: req.session.currentUser
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

//TESTING COMMENTS : findByIdAndUpdate(id, update, callback)

router.patch('/comment/:id', function(req, res) {
	var addComment = {$push: {comment: {content: req.body.post.comment, user: req.session.currentUser}}};
	console.log("new comment is: ", addComment);
	Post.findByIdAndUpdate(req.params.id, addComment, function (err, callback) {
		if (err) {
			console.log("error adding commment SOB SOB");
		} else {
			res.redirect(301, '/posts/:id');
			console.log("comments be posting...yeahhh");
		}
	})
}); 



///NEEDS MUCHO TESTING - COMMENTS SECTION


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
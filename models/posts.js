var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


var postSchema = Schema({
	topic: {type: String, required: true},
	author: {type: String, required: true},
	content: {type: String, required: true},
	upvotes: {type: Number}
}, {collection: 'posts', strict:false});


var Post = mongoose.model("Post", postSchema);

module.exports = Post;
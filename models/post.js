var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


var postSchema = Schema({
	topic: {type: String, required: true},
	author: {type: String, required: true},
	body: {type: String, required: true}
}, {collection: 'posts', strict:false});


var Post = mongoose.model("Post", postSchema);

module.exports = Post;
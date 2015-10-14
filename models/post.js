var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var postSchema = Schema({
	topic: {type: String, required: true},
	author: {type: String, required: true},
	date: { type: Date, default: Date.now },
	body: {type: String, required: true},
	comment: [String]
}, {collection: 'posts', strict:false});


var Post = mongoose.model("Post", postSchema);

module.exports = Post;
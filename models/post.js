var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var postSchema = new Schema({
	topic: {type: String, required: true},
	author: {type: String, required: true},
	date: { type: Date, default: Date.now },
	body: {type: String, required: true},
	comment: [ {
    		content: String,
    		user: String
  			} ],
	votes: {type: Number, default: 0}
});


var Post = mongoose.model("Post", postSchema);

module.exports = Post;


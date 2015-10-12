var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


var userSchema = Schema({
	username: {type: String, required: true},
	password: {type: String, required: true}
}, {collections: 'users', strict:false});


var User = mongoose.model("User", userSchema);
//storing user documents in a collection called users
module.exports = User;
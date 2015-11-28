var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var userSchema = new Schema({
	username: {type: String, required: true, unique: true},
	password: {type: String, required: true}
});


var User = mongoose.model("User", userSchema);
//storing user documents in a collection called users
module.exports = User;
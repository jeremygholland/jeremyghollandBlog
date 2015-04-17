var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
	title: String,
	text: String,
	user: String
})

var Post = mongoose.model('Post', postSchema);

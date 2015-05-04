var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	title: String,
	body: String,
	author: String
});

mongoose.model('Post', PostSchema);
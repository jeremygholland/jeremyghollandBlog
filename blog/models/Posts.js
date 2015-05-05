var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	title: String,
	body: String,
	author: String,
	comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

mongoose.model('Post', PostSchema);
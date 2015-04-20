var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var postSchema = new Schema ({
	title: {type: String},
	body: {type: String},
	author: {type: String}

});

module.exports = db.model('Post', postSchema);
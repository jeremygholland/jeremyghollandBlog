var express = require('express');
var router = express.Router();


var mongoose = require('mongoose');
var Post = mongoose.model('Post');

/* GET home page. */
router.get('/blogPosts', function(req, res, next) {
  Post.find(function(err, blogPosts){
    if(err){ return next(err); }

    res.json(blogPosts);
  });
});

router.post('/blogPosts', function(req, res, next) {
  var post = new Post(req.body);

  post.save(function(err, post){
    if(err){ return next(err); }

    res.json(post);
  });
});

router.param('post', function(req, res, next, id){
	var query = Post.findById(id);

	query.exec(function (err, post){
		if (err) {return next(err);}
		if (!post) {return next(new Error('can\'t find post'));}

		req.post = post;
		return next();
	});
});


router.get('/blogPosts/:post', function(req, res){
	res.json(req.post);
});



module.exports = router;
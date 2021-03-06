var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});


var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');

/* GET home page. */
router.get('/blogPosts', function(req, res, next) {
  Post.find(function(err, blogPosts){
    if(err){ return next(err); }

    res.json(blogPosts);
  });
});

router.post('/blogPosts', auth,  function(req, res, next) {
  var post = new Post(req.body);
  post.author = req.payload.username;

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
	req.post.populate('comments', function(err, post){
		if (err) {return next(err); }

		res.json(post);
	});
});

router.param('comment', function(req, res, next, id) {
  var query = Post.findById(id);

  query.exec(function (err, post){
    if (err) { return next(err); }
    if (!post) { return next(new Error('can\'t find post')); }

    req.comment = comment;
    return next();
  });
});


router.post('/blogPosts/:post/comments', auth, function(req, res, next) {
  var comment = new Comment(req.body);
  comment.post = req.post;

  comment.save(function(err, comment){
    if(err){ return next(err); }

    req.post.comments.push(comment);
    req.post.save(function(err, post) {
      if(err){ return next(err); }

      res.json(comment);
    });
  });
});

router.post('/register', function(req, res, next){
	if(!req.body.username || !req.body.password){
		return res.status(400).json({message: 'Please fill out all fields'});
	}

	var user = new User();
	user.username = req.body.username;

	user.setPassword(req.body.password)

	user.save(function (err){
		if(err){ return next (err);}

		return res.json({token: user.generateJWT()})
	});
});

router.post('/login', function(req, res, next){
	if(!req.body.username || !req.body.password){
		return res.status(400).json({message: 'Please fill out all fields'});
	}

	passport.authenticate('local', function(err, user, info){
		if(err) {return next(err); }

		if(user){
			return res.json({token: user.generateJWT()});
		} else{
			return res.status(401).json(info);
		}
	})(req, res, next);
});


module.exports = router;
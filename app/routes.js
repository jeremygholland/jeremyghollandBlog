var Post = require('./models/user');

function getPosts(res){
	Post.find(function(err, posts) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(posts); // return all todos in JSON format
		});
};

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all todos
	app.get('/api/posts', function(req, res) {

		// use mongoose to get all todos in the database
		getPosts(res);
	});

	// create todo and send back all todos after creation
	app.post('/api/posts', function(req, res) {

		// create a todo, information comes from AJAX request from Angular
		Post.create({
			text : req.body.text,
			done : false
		}, function(err, post) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			getPosts(res);
		});

	});

	// delete a todo

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};
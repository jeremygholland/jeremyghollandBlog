 	var express  = require('express');
    var app1      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var port     = process.env.PORT || 8070;                // set the port
    var morgan = require('morgan');
    var database = require('./config/database');                 // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
    var passport = require('passport');


	var db = mongoose.connect('mongodb://127.0.0.1:27017/blog');      // connect to mongoDB database on modulus.io

    app1.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app1.use(morgan('dev'));                                         // log every request to the console
    app1.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app1.use(bodyParser.json());                                     // parse application/json
    app1.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app1.use(methodOverride());

    require('./app/routes.js')(app1);

    // listen (start app with node server.js) ======================================
    app1.listen(port);
    console.log("App listening on port "+port);


    
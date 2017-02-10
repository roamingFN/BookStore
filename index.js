//create server
var express = require('express');
var bodyParser = require('body-parser');
var server = express();

//body parser
server.use(bodyParser.json()); // support json encoded bodies
server.use(bodyParser.urlencoded({ 
	extended: true 
}));

//db
var mongoose = require('mongoose');
var book = require('./app/database/book');
mongoose.connect('mongodb://localhost/booklist');

//routes
var router = require('./app/routes/routes.js');
server.use('/', express.static(__dirname + '/public'));
server.use(router);

//server listen
server.listen(3000, function() {
	console.log("Running on port 3000");
});

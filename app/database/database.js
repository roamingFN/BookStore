var mongoose = require('mongoose');
var book = require('./book.js');

//connect
mongoose.connect('mongodb://localhost/booklist');

//check connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('database connected');
});

var models = {
	book: book
};

module.exports = models;
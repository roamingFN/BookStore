var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
	title: {
		type: String,
		require: true
	},
	author: {
		type: String,
		require: true
	},
	cover: {
		type: String,
		require: false
	}
});
var book = mongoose.model('book', bookSchema);

module.exports = book;

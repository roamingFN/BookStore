var express = require('express');
var router = express.Router();

//db
var mongoose = require('mongoose');
var book = require('../database/book');
mongoose.createConnection('mongodb://localhost/booklist');

//first load
router.get('/booklist', function (req, res) {
	book.find({}).exec(function (err, book) {
		if(err){
   				console.log(err);
			}else{
					//console.log(book);
   				res.json(book);
			}
	});
});

//find book
router.get('/findbook/:id', function (req, res) {
	console.log('find book');
	book.find({title: req.params.id}).exec(function (err, book) {
		if (err) {
   				console.log(err);
			}
			else {
					//console.log(book);
   				res.json(book);
			}
	});
});

//get book
router.get('/:id', function (req, res) {
	console.log('get book');
	book.find({_id: req.params.id}).limit(1).exec(function (err, book) {
		if (err) {
   				console.log(err);
			}
			else {
					//console.log(book);
   				res.json(book);
			}
	});
});

//add book
router.post('/add', function (req, res) {
	console.log('add book');
	var aBook = req.body.data;
	var newBook = new book ({
		title: aBook.title,
		author: aBook.author,
		cover: aBook.cover,
	});
	
	newBook.save( function (err, newx) {
		if (err) {
			console.log(err);
			res.end();
		}
		else {
			console.log('add success');
			res.send();
		}
	});
});

//update book
router.put('/:id', function (req,res) {
	console.log('update book');
	var aBook = req.body.data;
	book.findOneAndUpdate({_id: aBook._id}, aBook).exec(function (err, doc) {
		if (err) {
			console.log(err);
			res.end();
		}
		else {
			console.log('update success');
			res.send();
		}
	});
});

//delete book
router.delete('/:id', function (req, res) {
	console.log('delete book');
	book.findOneAndRemove({_id: req.params.id}).exec(function (err, doc) {
		if (err) {
			console.log(err);
			res.end();
		}
		else {
			console.log('delete success');
			res.send();
		}
	});
});

module.exports = router;
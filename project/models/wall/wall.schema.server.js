var mongoose = require('mongoose');

var wallSchema = mongoose.Schema({
	text: String,
	hashtags: [],
	team: String,
	userId: String,
	userImage: String,
	edited: String,
	image: String,
	time: Date,
	like: Number,
	likesBy: [],
	comments: [],
	name: String
}, {collection: 'projectWall'});

module.exports = wallSchema;
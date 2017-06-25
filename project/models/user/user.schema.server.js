var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	username: {type: String, unique: true},
	password: String,
	first_name: String,
	last_name: String,
	email: String,
	phone: Number,
	gender: String,
	birthday: String,
	bio: String,
	image: String,
	location: String,
	team: String,
	following: [],
	followers: [],
	google: {id: String, token: String},
	facebook: {id: String, token: String},
	github: {id: String, token: String},
	dateCreated: {type: Date, default: Date.now()}
}, {collection: 'projectUsers'});

module.exports = userSchema;
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	username: {type: String, unique: true},
	password: String,
	firstName: String,
	lastName: String,
	email: String,
	phone: String,
	websites: [{type: mongoose.Schema.ObjectId, ref: 'WebsiteModel'}],
	dateCreated: {type: Date, default: Date.now()}
}, {collection: 'users'});

module.exports = userSchema;
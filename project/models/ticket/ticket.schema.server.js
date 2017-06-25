var mongoose = require('mongoose');

var ticketSchema = mongoose.Schema({
	type: {type: String, unique: true},
	name: String,
	date: Date,
	time: String,
	venue: String,
	address: String,
	city: String,
	return: String,
	class: String,
	price: String,
	airline: String,
	userId: String,
	slices: [],
	phone: String,
	roomType: String,
	beds: String,
	company: String,
	transmission: String,
	category: String,
}, {collection: 'projectTickets'});

module.exports = ticketSchema;
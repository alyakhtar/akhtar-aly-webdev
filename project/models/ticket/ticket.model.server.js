var mongoose = require('mongoose');
var ticketSchema = require('./ticket.schema.server.js');
var ticketModel = mongoose.model('TicketProjectModel', ticketSchema);


ticketModel.bookTicket = bookTicket;
ticketModel.getTicketsByUserId = getTicketsByUserId;
ticketModel.cancelBookingById =cancelBookingById;

module.exports = ticketModel;

function bookTicket(ticket){
	return ticketModel.create(ticket);
}

function getTicketsByUserId(userId){
	return ticketModel.find({userId:userId});
}

function cancelBookingById(bookingId){
	return ticketModel.remove({_id:bookingId})
}


var app = require('../../express.js');
const https = require('https');
var TicketModel = require('../models/ticket/ticket.model.server.js');


app.post('/api/project/bookTicket', bookTicket);
app.get('/api/project/user/:userId/getTickets', getTicketsByUserId);
app.delete('/api/project/user/:userId/cancelTicket/:bookingId', cancelBookingById);


function bookTicket(req, res){
	var ticket = req.body;
	// console.log(ticket)
	TicketModel
		.bookTicket(ticket)
		.then(function(){
			res.sendStatus(200);
			return;
		}, function(){
			res.sendStatus(404);
			return;
		});
}


function getTicketsByUserId(req, res){
	var userId = req.params['userId'];

	TicketModel
		.getTicketsByUserId(userId)
		.then(function(tickets){
			res.json(tickets);
			return;
		}, function(){
			res.sendStatus(404);
			return;
		});
}


function cancelBookingById(req, res){
	var userId = req.params['userId'];
	var bookingId = req.params['bookingId'];

	TicketModel
			.cancelBookingById(bookingId)
			.then(function(tickets){
				TicketModel
					.getTicketsByUserId(userId)
					.then(function(tickets){
						res.json(tickets);
						return;
					}, function(){
						res.sendStatus(404);
						return;
					});
			});
}

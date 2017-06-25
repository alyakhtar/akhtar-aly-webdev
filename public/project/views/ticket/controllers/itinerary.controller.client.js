(function() {
    angular
        .module('Project')
        .controller('itineraryController', itineraryController)

    function itineraryController($location, $routeParams, ticketService, userService) {

        var model = this;

        model.userId = $routeParams['userId'];

        model.cancelBooking = cancelBooking;

        function init(){
            userService
                .findUserById(model.userId)
                .then(function(user){
                    model.user = user;
                });

        	ticketService
        		.findTicketByUserId(model.userId)
        		.then(function(tickets){
        			model.tickets = tickets;
        		})
        }
        init();


        function cancelBooking(bookingId){
            ticketService
                .cancelBooking(bookingId, model.userId)
                .then(function(tickets){
                    model.tickets = tickets;
                })
        }

    }
})();

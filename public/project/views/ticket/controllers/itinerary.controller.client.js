(function() {
    angular
        .module('Project')
        .controller('itineraryController', itineraryController)

    function itineraryController($location, $routeParams, ticketService, userService, currentUser) {

        var model = this;

        model.userId = currentUser._id;

        model.cancelBooking = cancelBooking;
        model.logout = logout;

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

        function logout(){
            userService
                .logout()
                .then(function(){
                    $location.url('/login');
                });
        }

        function cancelBooking(bookingId){
            ticketService
                .cancelBooking(bookingId, model.userId)
                .then(function(tickets){
                    model.tickets = tickets;
                })
        }

    }
})();

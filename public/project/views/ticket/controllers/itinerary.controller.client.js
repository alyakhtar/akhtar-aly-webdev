(function() {
    angular
        .module('Project')
        .controller('itineraryController', itineraryController)

    function itineraryController($location, $routeParams, ticketService, userService) {

        var model = this;

        model.userId = $routeParams['userId'];

    }
})();

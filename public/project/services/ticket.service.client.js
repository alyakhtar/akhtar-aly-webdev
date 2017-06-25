(function() {
    angular
        .module('Project')
        .factory('ticketService', ticketService);

    function ticketService($http) {

        var api = {
            getMatchTicket: getMatchTicket,
            getFlights: getFlights,
            getHotels: getHotels,
            getCars: getCars,
            bookTicket: bookTicket,
            findTicketByUserId: findTicketByUserId,
            cancelBooking: cancelBooking
        };
        return api;

        function getMatchTicket(){
            var key = 'Y8CUMTdtH8ryvRTDvpGWNFhFQ6WyDOHF';
            var url = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey='+ key + '&keyword=international champions cup';
            return $http
                .get(url)
                .then(function(response){
                    return response.data._embedded.events[0];
                }, function(err) {
                    console.log(err);
                });
        }


        function getFlights(trip, flag, size) {
            if (flag === 1 || flag === '1') {
                count = size + 20;
            } else {
                count = 20;
            }

            var flight = {
                "request": {
                    "passengers": {
                        "adultCount": trip.passengers
                    },
                    "slice": [{
                        "origin": trip.source,
                        "destination": trip.destination,
                        "date": trip.date,
                        "preferredCabin": trip.cabin
                    }, {
                        "origin": trip.destination,
                        "destination": trip.source,
                        "date": trip.return,
                        "preferredCabin": trip.cabin
                    }],
                    "solutions": count,
                    "refundable": false
                }
            }

            var api = 'AIzaSyBJoisTMUjUlY6JRMmr0EJjmaZnM1WduJs';
            var url = 'https://www.googleapis.com/qpxExpress/v1/trips/search?key=' + api;
            return $http
                .post(url, flight)
                .then(function(response) {
                    return response.data.trips.tripOption;
                }, function(err) {
                    console.log(err);
                });
        }

        function getHotels(flag, size, trip) {
            if (flag === 0 || flag === '0') {
                count = 20;
            } else {
                count = size + 20;
            }
            var key = 'PsCw2ApzCs1YyuyiQmGyAh39fFTGzhMU';
            var url = 'https://api.sandbox.amadeus.com/v1.2/hotels/search-airport?apikey=' + key + '&location=' + trip.destination + '&check_in=' + trip.date + '&check_out=' + trip.return +'&radius=50&number_of_results=' + count;

            return $http
                .get(url)
                .then(function(response) {
                    return response.data.results;
                }, function(err) {
                    console.log(err);
                });

        }

        function getCars(trip) {
            var key = 'PsCw2ApzCs1YyuyiQmGyAh39fFTGzhMU';
            var url = 'https://api.sandbox.amadeus.com//v1.2/cars/search-airport?apikey=' + key + '&location=' + trip.destination + '&pick_up=' + trip.date + '&drop_off=' + trip.return;

            return $http
                .get(url)
                .then(function(response) {
                    return response.data.results;
                }, function(err) {
                    console.log(err);
                })
        }

        function bookTicket(ticket){
            var url = '/api/project/bookTicket';
            if(ticket.price){
                if(ticket.price.indexOf('USD') < 0){
                    ticket.price = '$'+ticket.price;
                }
            }
            return $http
                .post(url, ticket)
                .then(function(response) {
                    return response.data;
                }, function(err) {
                    console.log(err);
                })
        }

        function findTicketByUserId(userId){
            var url = '/api/project/user/'+userId+'/getTickets';

            return $http
                    .get(url)
                    .then(function(response){
                        return response.data;
                    });
        }

        function cancelBooking(bookingId, userId){
            var url = '/api/project/user/'+userId+'/cancelTicket/'+bookingId;

            return $http
                    .delete(url)
                    .then(function(response){
                        return response.data;
                    });
        }
        
    }
})();

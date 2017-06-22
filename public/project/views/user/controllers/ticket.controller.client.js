(function() {
    angular
        .module('Project')
        .controller('ticketController', ticketController)

    function ticketController($location, $routeParams, $window, $http) {

        var model = this;

        model.getTickets = getTickets;
        model.getFlights = getFlights;
        model.gotoAirlinesSite = gotoAirlinesSite;
        model.getMatchTicket = getMatchTicket;
        model.getHotels = getHotels;
        model.getCars = getCars;
        model.viewType = viewType;
        model.init = init;

        var flightHomePages = {
            'AS': {
                'website': 'https://www.alaskaair.com/',
                'name': 'Alaska Air'
            },
            'AQ': {
                'website': 'https://www.hawaiianairlines.com/',
                'name': 'Hawaii Airlines'
            },
            'AA': {
                'website': 'https://www.aa.com/homePage.do',
                'name': 'American Airlines'
            },
            'DL': {
                'website': 'https://www.delta.com/',
                'name': 'Delta'
            },
            'HA': {
                'website': 'https://www.hawaiianairlines.com/',
                'name': 'Hawaii Airlines'
            },
            'NW': {
                'website': 'https://www.delta.com/',
                'name': 'Delta'
            },
            'WN': {
                'website': 'https://www.southwest.com/',
                'name': 'Southwest Airlines'
            },
            'UA': {
                'website': 'https://www.united.com/ual/en/us/',
                'name': 'United Airlines'
            },
            'B6': {
                'website': 'https://www.jetblue.com/',
                'name': 'JetBlue'
            },
            'SY': {
                'website': 'https://www.suncountry.com/booking/search.html',
                'name': 'Sun Country Airlines'
            },
            'VX': {
                'website': 'https://www.virginamerica.com/',
                'name': 'Virgin America'
            },
            'NK': {
                'website': 'https://www.spirit.com/Default.aspx',
                'name': 'Spirit Airlines'
            },
            'G4': {
                'website': 'https://www.allegiantair.com/',
                'name': 'Allegiant Airlines'
            },
            'F9': {
                'website': 'https://www.flyfrontier.com/',
                'name': 'frontier Airlines'
            }
        }

        var carHomePags = {
            'ALAMO': 'https://www.alamo.com/en_US/car-rental/home.html',
            'ENTERPRISE': 'https://www.enterprise.com/en/home.html',
            'BUDGET': 'https://www.budget.com/en/home',
            'DOLLAR': 'https://www.dollar.com/',
            'THRIFTY': 'https://www.thrifty.com/',
            'HERTZ': 'https://www.hertz.com/rentacar/reservation/',
            'NATIONAL': 'https://www.nationalcar.com/en_US/car-rental/home.html',
            'ACE': 'https://www.acerentacar.com/',
            'ADVANTAGE': 'https://www.advantage.com/',
            'PAYLESS': 'https://www.paylesscar.com/',
            'AVIS': 'https://www.avis.com/en/home',
            'EUROPCAR': 'https://www.europcar.com/'
        }

        function init() {
            model.flights = [];
            getAirports();
            model.TicketType = 'views/user/templates/ticket-details.view.client.html';
            var ft = angular.element(document.querySelector('#flightBut'));
            var mt = angular.element(document.querySelector('#matchBut'));
            var ht = angular.element(document.querySelector('#hotelBut'));
            var cr = angular.element(document.querySelector('#carBut'));
            ft.removeClass('active');
            mt.removeClass('active');
            ht.removeClass('active');
            cr.removeClass('active');
        }
        init();

        function viewType(vw){
        	 var mt = angular.element(document.querySelector('#matchBut'));
    		var ft = angular.element(document.querySelector('#flightBut'));
            var ht = angular.element(document.querySelector('#hotelBut'));
            var cr = angular.element(document.querySelector('#carBut'));
        	if(vw === 'match'){
        		model.TicketType = 'views/user/templates/match-tickets.view.client.html';
	            mt.addClass('active');
	            ft.removeClass('active');
	            ht.removeClass('active');
	            cr.removeClass('active');
        	} else if(vw === 'flight'){
        		model.TicketType = 'views/user/templates/flight-tickets.view.client.html';
	            mt.removeClass('active');
	            ft.addClass('active');
	            ht.removeClass('active');
	            cr.removeClass('active');
        	} else if(vw === 'hotel'){
        		model.TicketType = 'views/user/templates/hotel-reservation.view.client.html';
	            mt.removeClass('active');
	            ft.removeClass('active');
	            ht.addClass('active');
	            cr.removeClass('active');
        	} else if(vw === 'car'){
        		model.TicketType = 'views/user/templates/car-reservation.view.client.html';
	            mt.removeClass('active');
	            ft.removeClass('active');
	            ht.removeClass('active');
	            cr.addClass('active');
        	}
        }


        function getTickets(trip) {
            if (!trip) {
                model.message = 'Please fill all details!';
                return;
            }

            if (!trip.source || !trip.destination || !trip.date || !trip.return || !trip.passengers) {
                model.message = 'Please fill all details!';
            } else {
                model.trip = trip;
                getFlights(trip, 0);
                getMatchTicket();
                getHotels(0);
                getCars();
            }
        }

        function getMatchTicket() {
            var key = 'Y8CUMTdtH8ryvRTDvpGWNFhFQ6WyDOHF';
            var url = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey='+ key + '&keyword=international champions cup';
            $http
                .get(url)
                .then(function(response) {
                    matchTicketDetails(response.data._embedded.events[0]);
                }, function(err) {
                    console.log(err);
                })
                .then(function(){
                	var mtb = angular.element(document.querySelector('#matchBut'));
	                mtb.removeAttr('disabled');
                });
        }

        function matchTicketDetails(event) {
            model.match = {}
            model.match.name = event.name;
            model.match.url = event.url;
            model.match.image = event.images[0].url;
            model.match.saleStart = event.sales.public.startDateTime;
            model.match.saleEnd = event.sales.public.endDateTime;
            model.match.date = event.dates.start.localDate;
            model.match.time = event.dates.start.localTime;
            model.match.priceMin = event.priceRanges[0].min;
            model.match.priceMax = event.priceRanges[0].max;
            model.match.seatmap = event.seatmap.staticUrl;
            model.match.venue = event._embedded.venues[0].name;
            model.match.city = event._embedded.venues[0].city.name;
            model.match.state = event._embedded.venues[0].state.name;
        }

        function getFlights(trip, flag) {
            model.trip = trip;
            if (flag === 1 || flag === '1') {
                count = model.flights.length + 20;
            } else {
                count = 20;
            }

            model.flights = [];
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
            $http
                .post(url, flight)
                .then(function(response) {
                    getData(response.data.trips.tripOption);
                }, function(err) {
                    console.log(err);
                })
                .then(function(){
                	var ftb = angular.element(document.querySelector('#flightBut'));
	                ftb.removeAttr('disabled');
                });
        }

        function getData(trips) {
            for (var t in trips) {
                flight = {};
                flight.price = trips[t].saleTotal;
                flight.slices = [];
                for (var s in trips[t].slice) {
                    trip = {};
                    trip.segments = [];
                    for (var sg in trips[t].slice[s].segment) {
                        current = {};
                        current.carrier = trips[t].slice[s].segment[sg].flight.carrier;
                        flight.carrier = trips[t].slice[s].segment[sg].flight.carrier;
                        current.number = trips[t].slice[s].segment[sg].flight.number;
                        current.legs = [];
                        for (var l in trips[t].slice[s].segment[sg].leg) {
                            info = {};
                            info.arrival = trips[t].slice[s].segment[sg].leg[l].arrivalTime;
                            info.departure = trips[t].slice[s].segment[sg].leg[l].departureTime;
                            info.origin = trips[t].slice[s].segment[sg].leg[l].origin;
                            info.destination = trips[t].slice[s].segment[sg].leg[l].destination;
                            current.legs.push(info)
                        }
                        trip.segments.push(current);
                    }
                    flight.slices.push(trip);
                }
                flight.airline = flightHomePages[flight.carrier].name;
                model.flights.push(flight);
            }
        }

        function gotoAirlinesSite(code) {
            airline = flightHomePages[code].website;
            $window.open(airline, '_blank');
        }

        function getAirports() {
            $http.get('assets/cities.json')
                .then(function(cities) {
                    model.cities = cities.data;
                });
        }

        function getHotels(flag) {
            if (flag === 0 || flag === '0') {
                count = 20;
            } else {
                count = model.hotels.length + 20;
            }
            var key = 'PsCw2ApzCs1YyuyiQmGyAh39fFTGzhMU';
            var url = 'https://api.sandbox.amadeus.com/v1.2/hotels/search-airport?apikey=' + key + '&location=' + model.trip.destination + '&check_in=' + model.trip.date + '&check_out=' + model.trip.return +'&radius=50&number_of_results=' + count;

            $http
                .get(url)
                .then(function(response) {
                    hotelDetails(response.data.results);
                }, function(err) {
                    console.log(err);
                })
                .then(function(){
                	var htb = angular.element(document.querySelector('#hotelBut'));
	                htb.removeAttr('disabled');
                });

        }

        function hotelDetails(hotels) {
            model.hotels = []
            for (var r in hotels) {
                hotel = {}
                hotel.name = hotels[r].property_name;
                hotel.price = hotels[r].total_price.amount;
                hotel.address = hotels[r].address.line1;
                hotel.city = hotels[r].address.city;
                hotel.region = hotels[r].address.region;
                hotel.phone = hotels[r].contacts[0].detail;
                hotel.amenities = [];
                for (var a in hotels[r].amenities) {
                    hotel.amenities.push(hotels[r].amenities[a].description);
                }
                if (hotels[r].awards[0]) {
                    hotel.rating = hotels[r].awards[0].rating;
                }
                hotel.roomType = hotels[r].rooms[0].room_type_info.room_type;
                hotel.bedType = hotels[r].rooms[0].room_type_info.bed_type;
                hotel.beds = hotels[r].rooms[0].room_type_info.number_of_beds;
                hotel.description = [];
                for (var d in hotels[r].rooms[0].descriptions) {
                    hotel.description.push(hotels[r].rooms[0].descriptions[d]);
                }
                model.hotels.push(hotel);
            }
        }

        function getCars() {
            var key = 'PsCw2ApzCs1YyuyiQmGyAh39fFTGzhMU';
            var url = 'https://api.sandbox.amadeus.com//v1.2/cars/search-airport?apikey=' + key + '&location=' + model.trip.destination + '&pick_up=' + model.trip.date + '&drop_off=' + model.trip.return;

            $http
                .get(url)
                .then(function(response) {
                    carDetails(response.data.results);
                }, function(err) {
                    console.log(err);
                })
                .then(function(){
                	var cb = angular.element(document.querySelector('#carBut'));
	                cb.removeAttr('disabled');
                });
        }

        function carDetails(cars) {
            model.cars = []
            for (var c in cars) {
                car = {}
                car.company = cars[c].provider.company_name;
                car.options = []
                for (var l in cars[c].cars) {
                    vehicle = {}
                    vehicle.transmission = cars[c].cars[l].vehicle_info.transmission;
                    vehicle.category = cars[c].cars[l].vehicle_info.category;
                    vehicle.type = cars[c].cars[l].vehicle_info.type;
                    vehicle.daily_rate = cars[c].cars[l].rates[0].price.amount;
                    vehicle.image = cars[c].cars[l].images[0].url;
                    vehicle.price = cars[c].cars[l].estimated_total.amount;
                    car.options.push(vehicle);
                }
                car.website = carHomePags[cars[c].provider.company_name];
                model.cars.push(car);
            }
        }
    }
})();

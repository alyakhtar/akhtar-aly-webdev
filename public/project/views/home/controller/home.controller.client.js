(function(){
	angular
		.module('Project')
		.controller('homeController', homeController)

		function homeController($location, $routeParams, userService, currentUser){

			var model = this;

			model.currentUser = currentUser;

			model.logout = logout;

			model.bookTickets = bookTickets;

	        function logout(){
	            userService
	                .logout()
	                .then(function(){
	                    $location.url('/');
	                    $route.reload();
	                });
	        }

	        function bookTickets(){
	        	if(model.currentUser._id){
	        		$location.url('/tickets');
	        	} else{
	        		$location.url('/login');
	        	}
	        }
		}
})();
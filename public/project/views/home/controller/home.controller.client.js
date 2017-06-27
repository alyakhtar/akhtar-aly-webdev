(function(){
	angular
		.module('Project')
		.controller('homeController', homeController)

		function homeController($location, $route, userService, currentUser, teamService){

			var model = this;

			model.currentUser = currentUser;

			model.logout = logout;
			model.bookTickets = bookTickets;
			model.getTeamDetails = getTeamDetails;

			function init(){
				teamService
	        		.getHomepageTeams()
	        		.then(function(teams){
	        			model.homeTeams = teams;
	        		})
			}
			init();

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

	        function getTeamDetails(teamId){
	            $location.url('/team/'+teamId);
	        }
		}
})();
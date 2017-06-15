(function(){
	angular
		.module('Project')
		.controller('profileController', profileController)

	function profileController($location, $routeParams, userService, teamService){

		var model = this;

		model.update = update;

		var userId = $routeParams['userId'];
		model.userId = userId;

		function init(){
			teamService
                .getTeams()
                .then(function(teams){
                    model.teams = teams;
                });

            userService
            	.findUserById(userId)
            	.then(function(user){
            		model.user = user;
            	});
		}
		init();

		function update(user, password, password2){
			if(password && password2){
				if(password === password2){
					user.password = password;
					userService
						.update(userId, user)
						.then(function(user){
							model.message = 'Profile Updated Successfully!!';
						});
				} else{
					model.error = 'Passwords do not match!';
				}
			} else{
				userService
					.update(userId, user)
					.then(function(user){
						model.message = 'Profile Updated Successfully!!';
					});
			}
		}
	}

})();
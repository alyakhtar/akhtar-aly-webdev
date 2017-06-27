(function(){
	angular
		.module('Project')
		.controller('profileController', profileController)

	function profileController($location, $routeParams, userService, teamService, currentUser){

		var model = this;

		model.update = update;

		var userId = currentUser._id;
		model.userId = userId;
		model.user = currentUser;
		model.currentUser = currentUser;

		model.unfollowUser = unfollowUser;
		model.deleteUser = deleteUser;
		model.logout = logout;

		function init(){
			teamService
                .getTeams()
                .then(function(teams){
                    model.teams = teams;
                });

            if(!model.user.teamSelected){
	            var pt = angular.element(document.querySelector('#profileTeam'));
	            pt.removeAttr('disabled');
            }
		}
		init();

		function logout(){
            userService
                .logout()
                .then(function(){
                    $location.url('/login');
                });
        }

		function update(user, password, password2){
			if(password && password2){
				if(password === password2){
					user.password = password;
					if(typeof user.team !== 'undefined' && user.team !== '1'){
						user.teamSelected = true;
					}
					userService
						.update(userId, user)
						.then(function(user){
							model.message = 'Profile Updated Successfully!!';
						});
				} else{
					model.error = 'Passwords do not match!';
				}
			} else{
				if(typeof user.team !== 'undefined' && user.team !== '1'){
					user.teamSelected = true;
				} 
				userService
					.update(userId, user)
					.then(function(user){
						model.message = 'Profile Updated Successfully!!';
					});
			}
		}

		function unfollowUser(userId, followId){
			userService
				.unfollow(userId, followId)
				.then(function(user){
					userService
	            	.findUserById(userId)
	            	.then(function(user){
	            		model.user = user;
	            	});
				});
		}

		function deleteUser(userId){
			userService
				.deleteUser(userId)
				.then(function(){
					$location.url('/');
				})
		}
	}

})();
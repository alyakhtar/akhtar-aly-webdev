(function(){
	angular
		.module('Project')
		.controller('userProfileController', userProfileController)

	function userProfileController($routeParams, userService, currentUser){

		var model = this;

		var userId = currentUser._id;
		var profileId = $routeParams['profileId'];
		model.userId = userId;
		model.profileId = profileId;
		model.logout = logout;

		model.followUser = followUser;

		function init(){

            userService
            	.findUserById(userId)
            	.then(function(user){
            		model.user = user;
            	});

            userService
            	.findUserById(profileId)
            	.then(function(user){
            		model.profile = user;
            	});
		}
		init();

		function logout(){
            userService
                .logout()
                .then(function(){
                    $location.url('/login');
                });
        }

		function followUser(){
			if(userId !== profileId){
				userService
					.follow(userId, model.profile)
					.then(function(){
						model.message = 'Started following user';
					}, function(){
						model.message = 'Started following user';
					});
			} else{
				model.message = 'You cannot follow yourself!';
			}
		}
	}

})();
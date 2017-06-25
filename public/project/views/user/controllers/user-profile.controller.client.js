(function(){
	angular
		.module('Project')
		.controller('userProfileController', userProfileController)

	function userProfileController($routeParams, userService){

		var model = this;

		var userId = $routeParams['userId'];
		var profileId = $routeParams['profileId'];
		model.userId = userId;
		model.profileId = profileId;

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
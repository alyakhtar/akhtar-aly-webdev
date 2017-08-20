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
		model.checkFollow = checkFollow;
		model.unfollowUser = unfollowUser;

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
            	})
            	.then(function(){
            		userService
            			.findPostsByUser(model.profile._id)
            			.then(function(posts){
            				model.posts = posts;
            			});
            	})
		}
		init();

		function checkFollow(){
			if(typeof model.user.following != 'undefined'){
				for(var u in model.user.following){
					if (model.user.following[u].id === model.profile._id){
						return true;
					}
				}
			}
			return false;
		}

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
						init();
					}, function(){
						model.message = 'Started following user';
						init();
					});
			} else{
				model.message = 'You cannot follow yourself!';
			}
		}

		function unfollowUser(){
			userService
				.unfollow(model.user._id, model.profile._id)
				.then(function(user){
					model.message = 'unfollowed the user';
					init()
				});
		}
	}

})();
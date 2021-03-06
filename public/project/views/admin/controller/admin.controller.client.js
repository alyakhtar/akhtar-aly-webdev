(function(){
	angular
		.module('Project')
		.controller('adminController', adminController)

		function adminController($location, $routeParams, userService, currentUser, teamService){

			var model = this;

			model.currentUser = currentUser;
			model.viewType = viewType;
			model.deleteUser = deleteUser;
			model.deletePost = deletePost;
			model.updatePost = deletePost;
			model.createUser = createUser;
			model.updateUser = updateUser;
			model.editUser = editUser;
			model.updateTeam = updateTeam;

			model.logout = logout;

			function init(){
				userService	
	        		.getAllUsers()
	        		.then(function(users){
	        			model.users = users;
	        		})

	        	userService	
	        		.getAllPosts()
	        		.then(function(posts){
	        			model.posts = posts;
	        		})

	        	teamService
	        		.getTeams()
	        		.then(function(teams){
	        			model.teams = teams;
	        		})

	        	teamService
	        		.getHomepageTeams()
	        		.then(function(teams){
	        			model.homeTeams = teams;
	        		})
			}
			init();

			function createUser(user){
				if(user.roles){
					roles = user.roles.split(',');
					user.roles = roles;
				}
				user.password = 'user';
				userService
					.createUser(user)
					.then(function(){
						init();
						model.user = '';
					})
			}

			function deleteUser(userId){
				userService
					.deleteUser(userId)
					.then(function(){
						init();
					});
			}

			function editUser(user){
				model.updateBut = true;
				model.user = user;
			}

			function updateUser(user){
				if(user.roles && typeof user.roles == 'string'){
					roles = user.roles.split(",");
					user.roles = roles;
				}

				userService
					.update(user._id, user)
					.then(function(){
						model.updateBut = false;
						model.user = '';
					});
			}

			function deletePost(postId){
				userService
					.deletePostByAdmin(postId)
					.then(function(){
						init();
					});
			}

	        function logout(){
	            userService
	                .logout()
	                .then(function(){
	                    $location.url('/');
	                    $route.reload();
	                });
	        }

	        function viewType(type){
	        	if(type === 'users'){
	        		model.View = 'views/admin/template/users.view.client.html';
	        	} else if(type === 'posts'){
	        		model.View = 'views/admin/template/posts.view.client.html';
	        	} else if(type === 'teams'){
	        		model.View = 'views/admin/template/team.view.client.html';
	        	}
	        }

	        function updateTeam(teamId, newTeam){
	        	if(typeof newTeam !== 'undefined'){
	        		teamDetails = newTeam.split(',');
	        		newTeam = {
	        			name: teamDetails[0],
	        			teamId: teamDetails[1],
	        			url: teamDetails[2]
	        		}
	        		
	        		teamService
	        			.updateHomepageTeams(teamId, newTeam)
	        			.then(function(){
	        				init();
	        				model.message = 'Team updated!';
	        				model.newTeam1 = '';
	        				model.newTeam2 = '';
	        			});
	        	}
	        }
		}
})();
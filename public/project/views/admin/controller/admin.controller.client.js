(function(){
	angular
		.module('Project')
		.controller('adminController', adminController)

		function adminController($location, $routeParams, userService, currentUser){

			var model = this;

			model.currentUser = currentUser;
			model.viewType = viewType;
			model.deleteUser = deleteUser;
			model.deletePost = deletePost;

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
			}
			init();

			function deleteUser(userId){
				userService
					.deleteUser(userId)
					.then(function(){
						init();
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
	        	}
	        }
		}
})();
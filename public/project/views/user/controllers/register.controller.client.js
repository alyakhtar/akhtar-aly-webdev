(function(){
	angular
		.module('Project')
		.controller('registerController', registerController)

	function registerController($location, $routeParams, userService){

		var model = this;

		model.register = register;

		function register(username, password, password2, fname, lname){
			if(!username || !password || !password2){
				model.message = 'All fields are required';
				return;
			}
			if(password === password2){
				userService
					.login(username,password)
					.then(function(response){
						model.message = 'User Already Exists!';
					}, function(err){
						var newUser = {
							"username": username,
							"password": password,
							"first_name": fname,
							"last_name": lname,
							"dateCreated": new Date()
						}

						userService
							.register(newUser)
							.then(function(user){
								$location.url('/user/' + user._id);
							});
					});
			} else{
				model.message = 'Passwords do not match!';
			}
		}
	}
})();
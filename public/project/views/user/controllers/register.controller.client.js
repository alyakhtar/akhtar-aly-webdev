(function(){
	angular
		.module('Project')
		.controller('registerController', registerController)

	function registerController($location, $routeParams, userService){

		var model = this;

		model.register = register;

		function register(username, password, password2){
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
							"created":(new Date()),
							"_id":345
						}

						userService
							.register(newUser)
							.then(function(user){
								// model.message = user.username+' User Created';
								$location.url('/user/' + user._id+'/wall');
							});
					});
			} else{
				model.message = 'Passwords do not match!';
			}
		}
	}
})();
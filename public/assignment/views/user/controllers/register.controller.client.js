(function (){
	angular
		.module('WebAppMaker')
		.controller('registerController', registerController);

	function registerController($location,userService){

		var model = this;
		model.register = register;

		function register(username, password, vpassword){
			if (!username || !password || !vpassword){
				model.message = 'Please enter username and password';
			} else{
				if (password === vpassword){
					userService
						.findUserByUsername(username)
						.then(
							function(){
								model.message = 'User Already Exists!!';
							},
							function(){
							var newUser = {
								username: username,
								password: password,
							}
							userService
								.createUser(newUser)
								.then(function(user){
									$location.url('/user/'+ user._id);
								});	
						});
				} else{
					model.message = 'Passwords do not match';
				}
			}
		}
	}
})();
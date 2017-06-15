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
							function(user){
								if(user === null){
									var newUser = {
										username: username,
										password: password,
									}
									userService
										.register(newUser)
										.then(function(user){
											$location.url('/profile');
										});	
								} else{
									model.message = 'User Already Exists!!';
								}
							},
							function(){
								model.message = 'User Already Exists!!';
						});
				} else{
					model.message = 'Passwords do not match';
				}
			}
		}
	}
})();
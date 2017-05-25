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
					var user = userService.findUserByUsername(username)
					if (user === null){
						var newUser = {
							username: username,
							password: password,
							_id: userService.getId()
						}

						userService.createUser(newUser);
						$location.url('/user/'+ newUser._id);
					} else{
						model.message = 'User Already Exists!!';
					}
				} else{
					model.message = 'Passwords do not match';
				}
			}
		}

	}
})();
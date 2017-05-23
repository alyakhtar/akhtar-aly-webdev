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
						// var found = userService.findUserByCredentials(username, password);
						// $location.url('/profile/' + found._id);
						model.message = "User Created"
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
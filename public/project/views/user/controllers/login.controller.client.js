(function(){
	angular
		.module('Project')
		.controller('loginController', loginController)

		function loginController($location, $routeParams, userService){

			var model = this;

			model.login = login
			model.register = register;

			function login(username, password){
				if(username && password){
	                userService
	                    .login(username, password)
	                    .then(renderData,handleError);
	            } else{
	                model.message = "Please enter username and password!";
	            }

	            function renderData(user){
	                if(user !== null){
	                	// model.message = "logged In!!"+user.username;
	                    $location.url('/user/' + user._id);
	                } else{
	                    model.message = "Incorrect username/password, please try again!";    
	                }
	            }

	            function handleError(error) {
	                model.message = "Incorrect username/password, please try again!";
	            }
			}

			function register(){
				$location.url('/register');
			}
		}
})();
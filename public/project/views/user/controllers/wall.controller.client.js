(function(){
	angular
		.module('Project')
		.controller('wallController', wallController)

		function wallController($location, $routeParams, userService){

			var model = this;

			// model.login = login
			// model.register = register;

			var userId = $routeParams['userId'];
			model.userId = userId;
		}
})();
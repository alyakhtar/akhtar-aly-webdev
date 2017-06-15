(function(){
	angular
		.module('WebAppMaker')
		.controller('homeController', homeController)

	function homeController($location, currentUser, userService, $route){

		var model = this;

        model.currentUser = currentUser;

        model.logout = logout;

        function logout(){
            userService
                .logout()
                .then(function(){
                    $location.url('/');
                    $route.reload();
                });
        }
	}
})();
(function() {
    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);

    function profileController($location, $routeParams, userService) {

        var model = this;

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        var userId = $routeParams['userId'];

        function init(){
            model.user = userService.findUserById(userId);
        }

        init();
        
        function updateUser(user){
        	userService.updateUser(userId,user);
            model.message = 'Profile Updated!';
        	$location.url('/user/'+userId);
        }

        function deleteUser(userId){
            userService.deleteUser(userId);
            $location.url('/');
        }
    }
})();

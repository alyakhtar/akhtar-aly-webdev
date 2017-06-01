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
            userService
                .findUserById(userId)
                .then(renderData, handleError);
        }
        init();
        
        function updateUser(user){
        	userService
                .updateUser(user._id,user)
                .then(function(){
                    model.message = 'Profile Updated!';
                });
        }

        function deleteUser(userId){
            userService
                .deleteUser(userId)
                .then(function(){
                    $location.url('/');
                }, function () {
                    model.error = "Unable to unregister you";
                });
        }

        function renderData(user){
            model.user = user;
        }

        function handleError(){
            model.message = 'User Profile not found';
        }
    }
})();

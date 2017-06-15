(function() {
    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);

    function profileController($location, userService, currentUser){

        var model = this;


        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;

        model.userId = currentUser._id;

        function init(){
            renderData(currentUser);
        }
        init();

        function logout(){
            userService
                .logout()
                .then(function(){
                    $location.url('/login');
                });
        }
        
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

(function() {
    angular
        .module('WebAppMaker')
        .controller('loginController', loginController);

    function loginController($location, userService) {
        var model = this;
        
        model.login = login;

        function login(username, password) {
            if(username && password){
                userService
                    .login(username, password)
                    .then(renderData,handleError);
            } else{
                model.message = "Please enter username and password!";
            }

            function renderData(user){
                if(user !== null){
                    $location.url('/profile');
                } else{
                    model.message = "Incorrect username/password, please try again!";    
                }
            }

            function handleError(error) {
                model.message = "Incorrect username/password, please try again!";
            }
        }
    }

})();

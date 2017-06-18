(function() {
    angular
        .module('WebAppMaker')
        .controller('loginController', loginController);

    function loginController($location, userService) {
        var model = this;
        
        model.login = login;

        function login(username, password){
            var un = angular.element(document.querySelector('#username'));
            var ps = angular.element(document.querySelector('#password'));
            if(username && password){
                userService
                    .login(username, password)
                    .then(renderData,handleError);
            } else{
                if(!username && !password){
                    model.message = "Please enter username and password!";
                    un.addClass('validate');
                    ps.addClass('validate');
                    model.messageUserName='';
                    model.messagePassword='';
                } else if(!username){
                    model.messageUserName = "Please enter username";
                    un.addClass('validate');
                    ps.removeClass('validate');
                    model.message='';
                    model.messagePassword='';
                } else{
                    model.messagePassword = "Please enter password!";
                    un.removeClass('validate');
                    ps.addClass('validate');
                    model.message='';
                    model.messageUserName='';

                }
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

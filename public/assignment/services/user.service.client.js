(function() {
    angular
        .module('WebAppMaker')
        .factory('userService', userService);

    function userService($http) {

        var api = {
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser,
            login: login,
            loggedin: loggedin,
            register: register,
            logout: logout
        };
        return api;

        function register(user){
            var url = "/api/register";
            return $http
                    .post(url, user)
                    .then(function(response){
                        return response.data;
                    });
        }

        function logout(){
            var url = "/api/logout";
            return $http
                    .post(url)
                    .then(function(response){
                        return response.data;
                    });
        }

        function loggedin(){
            var url = "/api/loggedin";
            return $http
                    .get(url)
                    .then(function(response){
                        return response.data;
                    });
        }

        function login(username, password){
            var url = '/api/login';
            var credentials = {
                username: username,
                password: password
            }
            return $http
                    .post(url, credentials)
                    .then(function(response){
                        var user = response.data;
                        return user;
                    });
        }

        function findUserByUsername(username){
            var url = '/api/user?username='+username;
            return $http
                    .get(url)
                    .then(function(response){
                        var user = response.data;
                        return user;
                    });
        }

        function updateUser(userId, userUp){
            var url = '/api/user/'+userId;
            return $http
                    .put(url,userUp)
                    .then(function(response){
                        var user = response.data;
                        return user;
                    });
        }

        function deleteUser(userId){
            var url = '/api/user/'+userId;
            return $http
                    .delete(url)
                    .then(function(response){
                        var user = response.data;
                        return user;
                    });
        }
    }
})();

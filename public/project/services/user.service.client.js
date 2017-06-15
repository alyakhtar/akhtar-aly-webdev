(function() {
    angular
        .module('Project')
        .factory('userService', userService);

    function userService($http) {

        var api = {
            login : login,
            register : register,
            update : update,
            findUserById : findUserById
        };
        return api;

        function login(username, password){
            var url = "/api/project/user?username="+username+"&password="+password;
            return $http
                    .get(url)
                    .then(function(response){
                        return response.data;
                    });
        }

        function register(user){
            var url = "/api/project/user";
            return $http
                    .post(url, user)
                    .then(function(response){
                        return response.data;
                    });
        }

        function update(userId, user){
            var url = "/api/project/user/"+userId;
            return $http
                    .put(url,user)
                    .then(function(response){
                        return response.data;
                    })

        }

        function findUserById(userId){
            url = '/api/project/user/'+userId;
            return $http
                    .get(url)
                    .then(function(response){
                        return response.data;
                    })
        }
    }
})();

(function() {
    angular
        .module('WebAppMaker')
        .factory('userService', userService);

    function userService($http) {

        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser,
        };
        return api;

        function findUserById(userId) {
            var url = '/api/user/'+userId;
            return $http
                    .get(url)
                    .then(function(response){
                        var user = response.data;
                        return user;
                    });
        }
        
        function findUserByCredentials(username, password) {
            var url = '/api/user?username='+username+'&password='+password;
            return $http
                    .get(url)
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

        function createUser(user){
            var url = '/api/user';
            return $http
                    .post(url,user)
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

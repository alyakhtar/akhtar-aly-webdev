(function() {
    angular
        .module('WebAppMaker')
        .factory('userService', userService);

    function userService() {

        var users = [
            { _id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", email:"" },
            { _id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley", email:"" },
            { _id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia", email:"" },
            { _id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi", email:"" }
        ];

        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser,
            getId: getId
        };
        return api;

        function getId(){
            id = users[users.length - 1]._id;
            return parseInt(id) + 111 + '';
        }

        function findUserById(userId) {
            for (var u in users) {
                if (users[u]._id === userId)
                    return users[u];
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for (var u in users) {
                var user = users[u];
                if (user.username === username &&
                    user.password === password) {
                    return user;
                }
            }
            return null;
        }

        function findUserByUsername(username){
            for (var u in users){
                var user = users[u];
                if (user.username === username){
                    return user;
                }
            }
            return null;
        }

        function createUser(user){
            users.push(user);
        }

        function updateUser(userId, userUp){
            for (var u in users){
                var user = users[u];
                if (user._id === userId){
                    users[u] = userUp;
                }
            }
        }

        function deleteUser(userId){
            
        }
    }
})();

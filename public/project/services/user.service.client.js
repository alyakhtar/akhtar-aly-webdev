(function() {
    angular
        .module('Project')
        .factory('userService', userService);

    function userService($http) {

        var api = {
            login : login,
            register : register,
            update : update,
            findUserById : findUserById,
            createNewPost: createNewPost,
            findAllPosts: findAllPosts,
            deletePost: deletePost,
            likePost: likePost,
            addComment: addComment,
            deleteComment: deleteComment,
            updatePost: updatePost,
            unfollow: unfollow,
            follow: follow,
            deleteUser: deleteUser,
            loggedin: loggedin,
            logout: logout,
            checkAdmin: checkAdmin,
            getAllUsers: getAllUsers,
            getAllPosts: getAllPosts, 
            deletePostByAdmin: deletePostByAdmin,
            createUser: createUser,
            findPostsByUser: findPostsByUser,
            searchUsers: searchUsers
        };
        return api;

        function searchUsers(username){
            url = '/api/project/search/user/'+username;

            return $http
                    .get(url)
                    .then(function(response){
                        return response.data;
                    });
        }

        function findPostsByUser(userId){
            url = '/api/project/profile/posts/'+userId;

            return $http
                    .get(url)
                    .then(function(response){
                        return response.data;
                    });
        }

        function deletePostByAdmin(postId){
            url='/api/project/admin/post/'+postId;
            
            return $http
                    .delete(url)
                    .then(function(response){
                        return response.data;
                    });
        }

        function getAllUsers(){
            var url = '/api/project/admin/users';

            return $http
                    .get(url)
                    .then(function(response){
                        return response.data;
                    });
        }

        function getAllPosts(){
            var url = '/api/project/admin/posts';

            return $http
                    .get(url)
                    .then(function(response){
                        return response.data;
                    });
        }

        function checkAdmin(){
            var url = '/api/project/checkAdmin';

            return $http
                    .get(url)
                    .then(function(response){
                        return response.data;
                    });
        }

        function createUser(user){
             var url = "/api/project/admin/createUser";
            return $http
                    .post(url, user)
                    .then(function(response){
                        return response.data;
                    });
        }

        function register(user){
            var url = "/api/project/register";
            return $http
                    .post(url, user)
                    .then(function(response){
                        return response.data;
                    });
        }

        function logout(){
            var url = "/api/project/logout";
            return $http
                    .post(url)
                    .then(function(response){
                        return response.data;
                    });
        }

        function loggedin(){
            var url = "/api/project/loggedin";
            return $http
                    .get(url)
                    .then(function(response){
                        return response.data;
                    });
        }

        function login(username, password){
            var url = '/api/project/login';
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

        function createNewPost(post){
            url= '/api/project/user/'+post.userId+'/newPost';
            return $http
                    .post(url,post)
                    .then(function(response){
                        return response.data;
                    });
        }

        function findAllPosts(team){
            url = '/api/project/posts/'+team;
            return $http
                    .get(url)
                    .then(function(response){
                        return response.data;
                    });
        }

        function deletePost(postId, userId){
            url='/api/project/user/'+userId+'/post/'+postId;
            return $http
                    .delete(url)
                    .then(function(response){
                        return response.data;
                    });
        }

        function updatePost(post){
            url = '/api/project/post/'+post._id;
            return $http
                    .put(url, post)
                    .then(function(response){
                        return response.data;
                    });
        }

        function likePost(postId, userId){
            url = '/api/project/user/'+userId+'/post/'+postId+'/like';
            return $http
                    .get(url)
                    .then(function(response){
                        return response.data;
                    })
        }

        function addComment(postId, comment){
            url = '/api/project/user/post/'+postId+'/comment';
            return $http
                    .post(url,comment)
                    .then(function(response){
                        return response.data;
                    });
        }

        function deleteComment(userId, postId, commentId){
            url = '/api/project/user/'+userId+'/post/'+postId+'/comment/'+commentId;
            return $http
                    .delete(url)
                    .then(function(response){
                        return response.data;
                    });
        }

        function unfollow(userId, followId){
            var url ='/api/project/user/'+userId+'/unfollow/'+followId;
            console.log(userId, followId)
            return $http
                    .get(url)
                    .then(function(response){
                        return response.data;
                    });
        }

        function follow(userId, follow){
            var url ='/api/project/user/'+userId+'/follow/'+follow._id;
            var name = follow.first_name + ' ' + follow.last_name;
            var user = {
                name:name,
                id: follow._id
            }
            return $http
                    .put(url,user)
                    .then(function(response){
                        return response.data;
                    });
        }

        function deleteUser(userId){
            var url = '/api/project/user/'+userId;
            return $http
                    .delete(url)
                    .then(function(response){
                        return response.data;
                    });
        }
    }
})();

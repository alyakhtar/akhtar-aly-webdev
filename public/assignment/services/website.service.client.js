(function() {
    angular
        .module('WebAppMaker')
        .factory('websiteService', websiteService);

    function websiteService($http) {
        
        var api = {
            createWebsite: createWebsite,
            findWebsiteById: findWebsiteById,
            findWebsitesByUser: findWebsitesByUser,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };
        return api;

        function findWebsiteById(websiteId) {
            var url = '/api/website/'+websiteId;
            return $http
                    .get(url)
                    .then(function(response){
                        var website = response.data;
                        return website;
                    }); 
        }

        function findWebsitesByUser(userId){
            var url = '/api/user/'+userId+'/website';
            return $http
                    .get(url)
                    .then(function(response){
                        var websites = response.data;
                        return websites;
                    });
        }

        function createWebsite(userId, website){
            var url = '/api/user/'+userId+'/website';
            return $http
                    .post(url,website)
                    .then(function(response){
                        var website = response.data;
                        return website;
                    });
        }

        function updateWebsite(websiteId, website){
            var url = '/api/website/'+websiteId;
            return $http
                    .put(url,website);
        }   

        function deleteWebsite(websiteId){
            var url = '/api/website/'+websiteId;
            return $http
                    .delete(url);
        }
    }
})();

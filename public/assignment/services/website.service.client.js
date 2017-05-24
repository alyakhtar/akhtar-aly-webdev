(function() {
    angular
        .module('WebAppMaker')
        .factory('websiteService', websiteService);

    function websiteService() {
        var websites = [
          { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
          { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
          { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
          { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
          { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
          { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
          { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];

        var api = {
            createWebsite: createWebsite,
            findWebsiteById: findWebsiteById,
            findWebsitesByUser: findWebsitesByUser,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };
        return api;

        function findWebsiteById(websiteId) {
            for (var u in websites) {
                if (websites[u]._id === websiteId)
                    return websites[u];
            }
        }

        function findWebsitesByUser(userId){
            var websiteList = [];
            for (var u in websites){
                var website = websites[u];
                if (website.developerId === userId){
                    websiteList.push(website)
                }
            }
            return websiteList;
        }

        function createWebsite(userId, website){

        }

        function updateWebsite(websiteId, website){

        }

        function deleteWebsite(websiteId){
            
        }
    }
})();

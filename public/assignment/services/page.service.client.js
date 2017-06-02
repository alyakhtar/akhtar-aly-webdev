(function() {
    angular
        .module('WebAppMaker')
        .factory('pageService', pageService);

    function pageService($http) {

        var api = {
            createPage: createPage,
            findPagesByWebsiteId: findPagesByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;

        function findPageById(pageId) {
            var url = '/api/page/'+pageId;
            return $http
                    .get(url)
                    .then(function(response){
                        var page = response.data;
                        return page;
                    })
        }

        function findPagesByWebsiteId(websiteId){
            var url = '/api/website/'+websiteId+'/page';
            return $http
                    .get(url)
                    .then(function(response){
                        var pages = response.data;
                        return pages;
                    })
        }

        function createPage(websiteId, page){
            var url = '/api/website/'+websiteId+'/page';
            return $http
                    .post(url,page)
                    .then(function(response){
                        var page = response.data;
                        return page;
                    })
        }

        function updatePage(pageId, page){
            var url = '/api/page/'+pageId;
            return $http
                    .put(url,page)
                    .then(function(response){
                        var page = response.data;
                        return page;
                    })
        }

        function deletePage(pageId){
            var url = '/api/page/'+pageId;
            return $http
                    .delete(url)
                    .then(function(response){
                        var page = response.data;
                        return page;
                    })
        }
    }
})();

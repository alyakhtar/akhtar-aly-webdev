(function() {
    angular
        .module('WebAppMaker')
        .factory('pageService', pageService);

    function pageService() {
        var pages = [
          { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
          { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
          { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

        var api = {
            createPage: createPage,
            findPagesByWebsiteId: findPagesByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;

        function findPageById(pageId) {
            for (var u in pages) {
                if (pages[u]._id === pageId)
                    return pages[u];
            }
        }

        function findPagesByWebsiteId(websiteId){
            var pageList = [];
            for (var u in pages){
                var page = pages[u];
                if (page.websiteId === websiteId){
                    pageList.push(page)
                }
            }
            return pageList;
        }

        function createPage(websiteId, page){
            lastId = pages[pages.length - 1]._id;
            id = parseInt(lastId) + 111 + '';
            page._id = id;
            page.websiteId = websiteId;
            pages.push(page);
        }

        function updatePage(pageId, page){
            for(var w in pages){
                if(pages[w]._id === pageId){
                    pages[w] = page;
                }
            }
        }

        function deletePage(pageId){
            var page = findPageById(pageId);
            var index = pages.indexOf(page);
            pages.splice(index,1);
        }
    }
})();

(function() {
    angular
        .module('WebAppMaker')
        .controller('pageEditController', pageEditController);

    function pageEditController($location, $routeParams, pageService) {

        var model = this;

        var websiteId = $routeParams['websiteId'];
        var userId = $routeParams['userId'];
        var pageId = $routeParams['pageId'];
        model.userId = userId;
        model.websiteId = websiteId;
        model.updatePage = updatePage;
        model.deletePage = deletePage;

        model.pages = pageService.findPagesByWebsiteId(websiteId);
        model.page = pageService.findPageById(pageId);

        function updatePage(page){
            page._id = pageId;
            page.websiteId = websiteId;
            pageService.updatePage(pageId,page);
            $location.url('/user/'+userId+'/website/'+websiteId+'/page');
        }

        function deletePage(pageId){
            pageService.deletePage(pageId);
            $location.url('/user/'+userId+'/website/'+websiteId+'/page');
        }
    }
})();

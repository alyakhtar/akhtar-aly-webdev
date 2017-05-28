(function() {
    angular
        .module('WebAppMaker')
        .controller('pageEditController', pageEditController);

    function pageEditController($location, $routeParams, pageService) {

        var model = this;

        model.updatePage = updatePage;
        model.deletePage = deletePage;

        var websiteId = $routeParams['websiteId'];
        var userId = $routeParams['userId'];
        var pageId = $routeParams['pageId'];

        function init(){
            model.userId = userId;
            model.websiteId = websiteId;
            model.pageId = pageId;
            model.pages = pageService.findPagesByWebsiteId(websiteId);
            model.page = pageService.findPageById(pageId);
        }

        init();

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

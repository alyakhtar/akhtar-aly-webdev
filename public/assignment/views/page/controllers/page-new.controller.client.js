(function() {
    angular
        .module('WebAppMaker')
        .controller('pageNewController', pageNewController);

    function pageNewController($location, $routeParams, pageService) {

        var model = this;

        var userId = $routeParams['userId'];
        var websiteId = $routeParams['websiteId'];
        model.userId = userId;
        model.websiteId = websiteId;
        model.createPage = createPage;
        
        model.pages = pageService.findPagesByWebsiteId(websiteId);

        function createPage(page){
            pageService.createPage(websiteId,page);
            $location.url('/user/'+userId+'/website/'+websiteId+'/page');
        }
    }
})();

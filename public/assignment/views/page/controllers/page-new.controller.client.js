(function() {
    angular
        .module('WebAppMaker')
        .controller('pageNewController', pageNewController);

    function pageNewController($location, $routeParams, pageService) {

        var model = this;
        
        model.createPage = createPage;

        var userId = $routeParams['userId'];
        var websiteId = $routeParams['websiteId'];
        
        function init(){
            model.userId = userId;
            model.websiteId = websiteId;
            model.pages = pageService.findPagesByWebsiteId(websiteId);
        }

        init();

        function createPage(page){
            pageService.createPage(websiteId,page);
            $location.url('/user/'+userId+'/website/'+websiteId+'/page');
        }
    }
})();

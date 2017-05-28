(function() {
    angular
        .module('WebAppMaker')
        .controller('pageListController', pageListController);

    function pageListController($location, $routeParams, pageService) {

        var model = this;

        var userId = $routeParams['userId'];
        var websiteId = $routeParams['websiteId'];


        function init(){
            model.userId = userId;
            model.websiteId = websiteId;
            model.pages = pageService.findPagesByWebsiteId(websiteId);
        }

        init();
    }
})();

(function() {
    angular
        .module('WebAppMaker')
        .controller('pageListController', pageListController);

    function pageListController($location, $routeParams, pageService) {

        var model = this;

        var userId = $routeParams['userId'];
        var websiteId = $routeParams['websiteId'];
        model.userId = userId;
        model.websiteId = websiteId;

        model.pages = pageService.findPagesByWebsiteId(websiteId);
    }
})();

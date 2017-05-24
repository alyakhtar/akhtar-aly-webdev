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

        model.pages = pageService.findPagesByWebsiteId(websiteId);
        model.page = pageService.findPageById(pageId);

    }
})();

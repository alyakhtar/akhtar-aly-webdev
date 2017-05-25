(function() {
    angular
        .module('WebAppMaker')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($location, $routeParams, pageService) {

        var model = this;

        var websiteId = $routeParams['websiteId'];
        var userId = $routeParams['userId'];
        var pageId = $routeParams['pageId'];
        model.userId = userId;
        model.websiteId = websiteId;
        model.pageId = pageId;

        model.pages = pageService.findPagesByWebsiteId(websiteId);
        model.page = pageService.findPageById(pageId);

    }
})();

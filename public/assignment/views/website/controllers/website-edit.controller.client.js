(function() {
    angular
        .module('WebAppMaker')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($location, $routeParams, websiteService) {

        var model = this;

        var websiteId = $routeParams['websiteId'];
        var userId = $routeParams['userId'];
        model.userId = userId;

        model.website = websiteService.findWebsiteById(websiteId);
        model.websites = websiteService.findWebsitesByUser(userId);
    }
})();

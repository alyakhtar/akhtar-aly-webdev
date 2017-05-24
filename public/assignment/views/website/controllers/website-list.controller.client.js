(function() {
    angular
        .module('WebAppMaker')
        .controller('websiteListController', websiteListController);

    function websiteListController($location, $routeParams, websiteService) {

        var model = this;

        var userId = $routeParams['userId'];
        model.userId = userId;

        model.websites = websiteService.findWebsitesByUser(userId);
    }
})();

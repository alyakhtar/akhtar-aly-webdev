(function() {
    angular
        .module('WebAppMaker')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController($location, $routeParams, websiteService) {

        var model = this;

        var userId = $routeParams['userId'];
        model.userId = userId;
        console.log(userId);
        model.websites = websiteService.findWebsitesByUser(userId);
    }
})();

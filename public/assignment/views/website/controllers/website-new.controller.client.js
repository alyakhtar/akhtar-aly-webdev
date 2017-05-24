(function() {
    angular
        .module('WebAppMaker')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController($location, $routeParams, websiteService) {

        var model = this;

        var userId = $routeParams['userId'];
        model.userId = userId;
        
        model.websites = websiteService.findWebsitesByUser(userId);
    }
})();

(function() {
    angular
        .module('WebAppMaker')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($location, $routeParams, websiteService) {

        var model = this;

        var websiteId = $routeParams['websiteId'];
        var userId = $routeParams['userId'];
        model.userId = userId;
        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        model.website = websiteService.findWebsiteById(websiteId);
        model.websites = websiteService.findWebsitesByUser(userId);

        function updateWebsite(website){
            website._id = websiteId;
            website.developerId = userId;
            websiteService.updateWebsite(websiteId,website);
            $location.url('/user/'+userId+'/website');
        }

        function deleteWebsite(websiteId){
            websiteService.deleteWebsite(websiteId);
            $location.url('/user/'+userId+'/website');
        }
    }
})();

(function() {
    angular
        .module('WebAppMaker')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($location, $routeParams, currentUser, websiteService) {

        var model = this;

        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;
        
        var websiteId = $routeParams['websiteId'];
        var userId = currentUser._id;

        function init(){
            model.userId = userId;
            model.websiteId = websiteId;
            websiteService
                .findWebsiteById(websiteId)
                .then(currentWebsite);
            websiteService
                .findWebsitesByUser(userId)
                .then(renderWebsites)
        }
        init();

        function currentWebsite(website){
            model.website = website;
        }

        function updateWebsite(website){
            website._id = websiteId;
            website._user = userId;
            website.accessed = (new Date());
            websiteService
                .updateWebsite(websiteId,website)
                .then(function(){
                    $location.url('/website');
                });
        }

        function deleteWebsite(websiteId){
            websiteService
                .deleteWebsite(websiteId)
                .then(function(){
                    $location.url('/website');
                });
        }

        function renderWebsites(websites){
            if(websites.length < 1){
                model.message = 'USER HAS NOT CREATED ANY WEBSITE!!!';
            }else{
                model.websites = websites; 
            }
        }
    }
})();

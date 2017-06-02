(function() {
    angular
        .module('WebAppMaker')
        .controller('websiteListController', websiteListController);

    function websiteListController($location, $routeParams, websiteService) {

        var model = this;

        var userId = $routeParams['userId'];
        model.userId = userId;

        model.updateAccessed = updateAccessed;

        function init(){
	        websiteService
                .findWebsitesByUser(userId)
                .then(renderWebsites);
	    }
	    init();

        function renderWebsites(websites){
            if(websites.length < 1){
                model.message = 'USER HAS NOT CREATED ANY WEBSITE!!!';
            }else{
                model.websites = websites; 
            }
        }

        function updateAccessed(website){
            var accessed = (new Date());
            website.accessed = accessed;
            websiteService
                    .updateWebsite(website._id,website)
                    .then(function(){
                        $location.url('/user/'+userId+'/website/'+website._id+'/page');
                    })
        }
    }
})();

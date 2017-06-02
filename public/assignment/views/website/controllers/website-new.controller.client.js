(function() {
    angular
        .module('WebAppMaker')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController($location, $routeParams, websiteService) {

        var model = this;

        model.createWebsite = createWebsite;

        var userId = $routeParams['userId'];
        
        function init(){
            model.userId = userId;
            websiteService
                .findWebsitesByUser(userId)
                .then(renderWebsites);
        }
        init();
    	
    	function createWebsite(website){
            var date = (new Date());
            website.created = date;
            website.accessed = date;
    		websiteService
                .createWebsite(userId,website)
                .then(function(website){
            		$location.url('/user/' + website.developerId +'/website');
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

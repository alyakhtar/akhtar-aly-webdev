(function() {
    angular
        .module('WebAppMaker')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController($location, $routeParams, websiteService) {

        var model = this;

        var userId = $routeParams['userId'];
        model.userId = userId;

        model.createWebsite = createWebsite;
        
        model.websites = websiteService.findWebsitesByUser(userId);
    	
    	function createWebsite(website){
    		websiteService.createWebsite(userId,website);
    		$location.url('/user/' + userId +'/website');
    	}
    }
})();

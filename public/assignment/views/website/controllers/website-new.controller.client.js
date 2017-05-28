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
            model.websites = websiteService.findWebsitesByUser(userId);
        }
        init();
    	
    	function createWebsite(website){
    		websiteService.createWebsite(userId,website);
    		$location.url('/user/' + userId +'/website');
    	}
    }
})();

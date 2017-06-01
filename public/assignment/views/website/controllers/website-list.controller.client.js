(function() {
    angular
        .module('WebAppMaker')
        .controller('websiteListController', websiteListController);

    function websiteListController($routeParams, websiteService) {

        var model = this;

        var userId = $routeParams['userId'];
        model.userId = userId;

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
    }
})();

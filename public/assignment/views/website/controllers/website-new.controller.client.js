(function() {
    angular
        .module('WebAppMaker')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController($location, currentUser, websiteService) {

        var model = this;

        model.createWebsite = createWebsite;

        var userId = currentUser._id;
        
        function init(){
            model.userId = userId;
            websiteService
                .findWebsitesByUser(userId)
                .then(renderWebsites);
        }
        init();
    	
    	function createWebsite(website){
            var nm = angular.element(document.querySelector('#name'));
            if(typeof website === 'undefined' || !website.name){
                model.websiteName = 'Please enter website name';
                nm.addClass('validate');
            } else{
                var date = (new Date());
                website.accessed = date;
        		websiteService
                    .createWebsite(userId,website)
                    .then(function(website){
                		$location.url('/website');
                    });
            }
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

(function() {
    angular
        .module('WebAppMaker')
        .controller('pageNewController', pageNewController);

    function pageNewController($location, $routeParams, currentUser, pageService) {

        var model = this;
        
        model.createPage = createPage;

        var userId = currentUser._id;
        var websiteId = $routeParams['websiteId'];
        
        function init(){
            model.userId = userId;
            model.websiteId = websiteId;
            pageService
                .findPagesByWebsiteId(websiteId)
                .then(renderPages);
        }
        init();
        
        function createPage(page){
            var pn = angular.element(document.querySelector('#name'));
            if(typeof page === 'undefined' || !page.name){
                model.pageName = 'Please enter a page name';
                pn.addClass('validate');
            } else{
                var date = (new Date());
                page.created = date;
                page.accessed = date;
                pageService
                    .createPage(websiteId,page)
                    .then(function(){
                        $location.url('/website/'+websiteId+'/page');
                    });
            }
        }

        function renderPages(pages){
            if(pages.length < 1){
                model.message = 'USER HAS NOT CREATED ANY PAGE!!!';
            }else{
                model.pages = pages; 
            }
        }
    }
})();

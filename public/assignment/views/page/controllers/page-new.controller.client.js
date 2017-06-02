(function() {
    angular
        .module('WebAppMaker')
        .controller('pageNewController', pageNewController);

    function pageNewController($location, $routeParams, pageService) {

        var model = this;
        
        model.createPage = createPage;

        var userId = $routeParams['userId'];
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
            var date = (new Date());
            page.created = date;
            page.accessed = date;
            pageService
                .createPage(websiteId,page)
                .then(function(){
                    $location.url('/user/'+userId+'/website/'+websiteId+'/page');
                });
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

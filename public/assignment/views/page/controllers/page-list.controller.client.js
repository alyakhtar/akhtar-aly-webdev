(function() {
    angular
        .module('WebAppMaker')
        .controller('pageListController', pageListController);

    function pageListController($location, $routeParams, currentUser, pageService) {

        var model = this;

        var userId = currentUser._id;
        var websiteId = $routeParams['websiteId'];

        model.updateAccessed = updateAccessed;

        function init(){
            model.userId = userId;
            model.websiteId = websiteId;
            pageService
                .findPagesByWebsiteId(websiteId)
                .then(renderPages);
        }
        init();

        function renderPages(pages){
            if(pages.length < 1){
                model.message = 'USER HAS NOT CREATED ANY PAGE!!!';
            }else{
                model.pages = pages; 
            }
        }

        function updateAccessed(page){
            var accessed = (new Date());
            page.accessed = accessed;
            pageService
                    .updatePage(page._id,page)
                    .then(function(){
                        $location.url('/website/'+websiteId+'/page/'+page._id+'/widget');
                    })
        }
    }
})();

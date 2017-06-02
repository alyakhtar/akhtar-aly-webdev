(function() {
    angular
        .module('WebAppMaker')
        .controller('pageEditController', pageEditController);

    function pageEditController($location, $routeParams, pageService) {

        var model = this;

        model.updatePage = updatePage;
        model.deletePage = deletePage;

        var websiteId = $routeParams['websiteId'];
        var userId = $routeParams['userId'];
        var pageId = $routeParams['pageId'];
        
        function init(){
            model.userId = userId;
            model.websiteId = websiteId;
            model.pageId = pageId;
            pageService
                .findPageById(pageId)
                .then(currentPage);
            pageService
                .findPagesByWebsiteId(websiteId)
                .then(renderPages);
        }
        init();

        function currentPage(page){
            model.page = page;
        }

        function updatePage(page){
            page._id = pageId;
            page.developerId = websiteId;
            var date = (new Date());
            page.accessed = date;
            pageService
                .updatePage(pageId,page)
                .then(function(){
                    $location.url('/user/'+userId+'/website/'+websiteId+'/page');
                });
        }

        function deletePage(pageId){
            pageService
                .deletePage(pageId)
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

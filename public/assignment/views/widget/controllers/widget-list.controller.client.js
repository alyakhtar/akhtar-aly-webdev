(function() {
    angular
        .module('WebAppMaker')
        .controller('widgetListController', widgetListController);

    function widgetListController($sce, $routeParams, widgetService) {

        var model = this;

        var userId = $routeParams['userId'];
        var websiteId = $routeParams['websiteId'];
        var pageId = $routeParams['pageId'];
        model.userId = userId;
        model.websiteId = websiteId;
        model.pageId = pageId;

        model.trustYoutubeUrl = trustYoutubeUrl;
        model.trustHTMLText = trustHTMLText;

        model.widgets = widgetService.findWidgetsByPageId(pageId);

        function trustYoutubeUrl(url){
            var baseUrl = "https://www.youtube.com/embed/";
            var splitUrl = url.split('/');
            var link = splitUrl[splitUrl.length - 1];
            baseUrl += link;
            return $sce.trustAsResourceUrl(baseUrl);
        }


        function trustHTMLText(text){
            return $sce.trustAsHtml(text);
        }
    }
})();

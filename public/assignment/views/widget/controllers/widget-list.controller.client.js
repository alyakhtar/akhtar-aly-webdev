(function() {
    angular
        .module('WebAppMaker')
        .controller('widgetListController', widgetListController);

    function widgetListController($sce, $routeParams, widgetService) {

        var model = this;

        model.trustYoutubeUrl = trustYoutubeUrl;
        model.trustHTMLText = trustHTMLText;
        model.widgetUrl = widgetUrl;
        
        var userId = $routeParams['userId'];
        var websiteId = $routeParams['websiteId'];
        var pageId = $routeParams['pageId'];


        function init(){
            model.userId = userId;
            model.websiteId = websiteId;
            model.pageId = pageId;
            model.widgets = widgetService.findWidgetsByPageId(pageId);
        }

        init();
        
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

        function widgetUrl(widget){
            var url = 'views/widget/templates/widget-'+widget.widgetType.toLowerCase()+'.view.client.html';
            return url;
        }

    }
})();

(function() {
    angular
        .module('WebAppMaker')
        .controller('widgetListController', widgetListController);

    function widgetListController($sce, $routeParams, widgetService) {

        var model = this;

        model.trustYoutubeUrl = trustYoutubeUrl;
        model.trustHTMLText = trustHTMLText;
        model.widgetUrl = widgetUrl;
        model.updatePosition = updatePosition;
        
        var userId = $routeParams['userId'];
        var websiteId = $routeParams['websiteId'];
        var pageId = $routeParams['pageId'];


        function init(){
            model.userId = userId;
            model.websiteId = websiteId;
            model.pageId = pageId;
            widgetService
                .findWidgetsByPageId(pageId)
                .then(renderWidgets);
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
            var url = 'views/widget/templates/widget-'+widget.type.toLowerCase()+'.view.client.html';
            return url;
        }

        function renderWidgets(widgets){
            if(widgets.length < 1){
                model.message = 'USER HAS NOT CREATED ANY WIDGETS!!!';
            }else{
                model.widgets = widgets; 
            }
        }

        function updatePosition(start, end){
            widgetService
                .updatePosition(start,end,pageId);
        }

    }
})();

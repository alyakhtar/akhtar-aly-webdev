(function() {
    angular
        .module('WebAppMaker')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($location, $routeParams, widgetService) {

        var model = this;

        model.editWidgetUrl = editWidgetUrl;
        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;
        
        var websiteId = $routeParams['websiteId'];
        var userId = $routeParams['userId'];
        var pageId = $routeParams['pageId'];
        var widgetId = $routeParams['widgetId'];

        function init(){
            model.userId = userId;
            model.websiteId = websiteId;
            model.pageId = pageId;
            model.widgetId = widgetId;
            model.widget = widgetService.findWidgetById(widgetId);
        }

        init();

        function editWidgetUrl(widget){
            var url = 'views/widget/templates/widget-'+widget.widgetType.toLowerCase()+'.edit.view.client.html';
            return url + '';
        }

        function updateWidget(widget){
            widgetService.updateWidget(widgetId,widget);
            $location.url('/user/'+userId+'/website/'+websiteId+'/page/'+pageId+'/widget');
        }

        function deleteWidget(){
            widgetService.deleteWidget(widgetId);
            $location.url('/user/'+userId+'/website/'+websiteId+'/page/'+pageId+'/widget');
        }
    }
})();

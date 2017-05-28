(function() {
    angular
        .module('WebAppMaker')
        .controller('widgetNewController', widgetNewController);

    function widgetNewController($location, $routeParams, widgetService) {

        var model = this;

        model.createWidget = createWidget;
        
        var userId = $routeParams['userId'];
        var websiteId = $routeParams['websiteId'];
        var pageId = $routeParams['pageId'];
        
        function init(){
            model.userId = userId;
            model.websiteId = websiteId;
            model.pageId = pageId;
            model.widget = widgetService.findWidgetsByPageId(websiteId);
        }

        init();
        
        function createWidget(widgetType){
            var newWidget = {
                widgetType: widgetType
            }
            var id = widgetService.createWidget(model.pageId,newWidget);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+id);
        }
    }
})();

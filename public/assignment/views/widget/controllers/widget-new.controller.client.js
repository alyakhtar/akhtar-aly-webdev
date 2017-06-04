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
            widgetService
                .findWidgetsByPageId(websiteId)
                .then(currentWidget);
        }
        init();
        
        function createWidget(widgetType){
            var newWidget = {
                widgetType: widgetType
            }
            widgetService
                .createWidget(model.pageId,newWidget)
                .then(function(widget){
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+widget._id);
                });
        }

        function currentWidget(widget){
            model.widget = widget;
        }
    }
})();

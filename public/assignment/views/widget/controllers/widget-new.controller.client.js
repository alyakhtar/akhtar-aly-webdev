(function() {
    angular
        .module('WebAppMaker')
        .controller('widgetNewController', widgetNewController);

    function widgetNewController($location, $routeParams, currentUser, widgetService) {

        var model = this;

        model.createWidget = createWidget;
        
        var userId = currentUser._id;
        var websiteId = $routeParams['websiteId'];
        var pageId = $routeParams['pageId'];
        
        function init(){
            model.userId = userId;
            model.websiteId = websiteId;
            model.pageId = pageId;
        }
        init();
        
        function createWidget(widgetType){
            var newWidget = {
                type: widgetType
            }
            widgetService
                .createWidget(model.pageId,newWidget)
                .then(function(widget){
                    $location.url('/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+widget._id);
                });
        }

    }
})();

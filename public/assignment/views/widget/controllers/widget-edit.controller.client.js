(function() {
    angular
        .module('WebAppMaker')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($location, $routeParams, currentUser, widgetService) {

        var model = this;

        model.editWidgetUrl = editWidgetUrl;
        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;
        
        var websiteId = $routeParams['websiteId'];
        var userId = currentUser._id;
        var pageId = $routeParams['pageId'];
        var widgetId = $routeParams['widgetId'];

        function init(){
            model.userId = userId;
            model.websiteId = websiteId;
            model.pageId = pageId;
            model.widgetId = widgetId;
            widgetService
                .findWidgetById(widgetId)
                .then(currentWidget);
        }
        init();

        function editWidgetUrl(widget){
            if(typeof widget !== 'undefined'){
                var widgetType = widget.type.toLowerCase();
                var url = 'views/widget/templates/widget-'+widgetType+'.edit.view.client.html';
                return url + '';
            }
        }

        function updateWidget(widget){
            widgetService
                .updateWidget(widgetId,widget)
                .then(function(){
                    $location.url('/website/'+websiteId+'/page/'+pageId+'/widget');
                })
        }

        function deleteWidget(){
            widgetService
                .deleteWidget(widgetId)
                .then(function(){
                    $location.url('/website/'+websiteId+'/page/'+pageId+'/widget');
                })
        }

        function currentWidget(widget){
            model.widget = widget; 
        }
    }
})();

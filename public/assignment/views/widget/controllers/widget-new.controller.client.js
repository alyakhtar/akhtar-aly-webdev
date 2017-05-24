(function() {
    angular
        .module('WebAppMaker')
        .controller('widgetNewController', widgetNewController);

    function widgetNewController($location, $routeParams, widgetService) {

        var model = this;

        var userId = $routeParams['userId'];
        var websiteId = $routeParams['websiteId'];
        model.userId = userId;
        model.websiteId = websiteId;
        
        model.widget = widgetService.findWidgetsByPageId(websiteId);
    }
})();

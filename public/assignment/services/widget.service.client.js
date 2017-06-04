(function() {
    angular
        .module('WebAppMaker')
        .factory('widgetService', widgetService);

    function widgetService($http) {

        var api = {
            createWidget: createWidget,
            findWidgetById: findWidgetById,
            findWidgetsByPageId: findWidgetsByPageId,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            updatePosition: updatePosition
        };
        return api;

        function findWidgetsByPageId(pageId) {
            var url = '/api/page/'+pageId+'/widget';
            return $http
                    .get(url)
                    .then(function(response){
                        var widgets = response.data;
                        return widgets;
                    });

        }

        function findWidgetById(widgetId){
            var url = '/api/widget/'+widgetId;
            return $http
                    .get(url)
                    .then(function(response){
                        var widget = response.data;
                        return widget;
                    });
        }

        function createWidget(pageId,widget){
            var url = '/api/page/'+pageId+'/widget';
            return $http
                    .post(url,widget)
                    .then(function(response){
                        var widget = response.data;
                        return widget;
                    });
        }

        function updateWidget(widgetId, widget){
            var url = '/api/widget/'+widgetId;
            return $http
                    .put(url,widget)
                    .then(function(response){
                        var widget = response.data;
                        return widget;
                    });
        }

        function deleteWidget(widgetId){
            var url = '/api/widget/'+widgetId;
            return $http
                    .delete(url)
                    .then(function(response){
                        var widget = response.data;
                        return widget;
                    });
        }

        function updatePosition(index1,index2,pageId){
            var url = '/page/'+pageId+'/widget?initial='+index1+'&final='+index2;
            return $http
                    .put(url);
        }
    }
})();

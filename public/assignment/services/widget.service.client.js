(function() {
    angular
        .module('WebAppMaker')
        .factory('widgetService', widgetService);

    function widgetService() {
        
        var widgets = [
          { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": "2", "text": "GIZMODO"},
          { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": "4", "text": "Lorem ipsum"},
          { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/1900/1200/"},
          { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
          { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": "4", "text": "Lorem ipsum"},
          { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
          { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        var api = {
            createWidget: createWidget,
            findWidgetById: findWidgetById,
            findWidgetsByPageId: findWidgetsByPageId,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
        };
        return api;

        function findWidgetsByPageId(pageId) {
            var pageList = [];
            for (var u in widgets) {
                var widget = widgets[u];
                if (widget.pageId === pageId)
                    pageList.push(widget);
            }
            return pageList;
        }

        function findWidgetById(widgetId){
            for (var u in widgets){
                var widget = widgets[u];
                if (widget._id === widgetId){
                    return widget;
                }
            }
            return null;
        }

        function createWidget(pageId,widget){
            lastId = widgets[widgets.length - 1]._id;
            id = parseInt(lastId) + 111 + '';
            id += '';
            widget._id = id;
            widget.pageId = pageId;
            widgets.push(widget);
            return id;
        }

        function updateWidget(widgetId, widget){
            for(var w in widgets){
                if(widgets[w]._id === widgetId){
                    widgets[w] = widget;
                }
            }
        }

        function deleteWidget(widgetId){
            var widget = findWidgetById(widgetId);
            var index = widgets.indexOf(widget);
            widgets.splice(index,1);
        }
    }
})();

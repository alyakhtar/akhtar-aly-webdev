(function() {
    angular
        .module('WebAppMaker')
        .controller('FlickrImageSearchController', FlickrImageSearchController);

    function FlickrImageSearchController($routeParams, $location, currentUser, widgetService, FlickrService) {
        var model = this;

        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto; 

        function init(){
            model.userId = currentUser._id;
            model.websiteId = $routeParams['websiteId'];
            model.pageId = $routeParams['pageId'];
            model.widgetId = $routeParams['widgetId'];

            widgetService
                .findWidgetById(model.widgetId)
                .then(currentWidget);
        }
        init();

        function currentWidget(widget){
            model.widget = widget;
        }

        function searchPhotos(query) {
            FlickrService
                .searchPhotos(query)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(", "");
                    data = data.substring(0, data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        };

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";

            model.widget.url = url;

            widgetService
                .updateWidget(model.widgetId, model.widget)
                .then(function(response) {
                    $location.url("/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + model.widgetId);
                });
        }
    }
})();

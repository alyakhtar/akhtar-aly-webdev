(function () {
    angular
        .module("WebAppMaker")
        .service("FlickrService", FlickrService);

    var key = "cf4d59ad6cc1cccaa2d3947efe1b53f1";
    var secret = "2ce4d180b0c339d2";
    var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

    function FlickrService($http) {

        var api = {
            searchPhotos: searchPhotos
        };
        return api;

        function searchPhotos(query) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", query);
            return $http.get(url);
        }

    }
})();
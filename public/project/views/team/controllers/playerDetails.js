(function() {
    angular
        .module('Project')
        .controller('playerDetails', playerDetails);

    function playerDetails($http, $location, $routeParams) {

        var model = this;

        var playerId = $routeParams['playerId'];

        var key = "6wsgf62ddhacehmnp3dwaq6a";
        
        
        function init(){
            getPlayerDetails();
        }
        init();

        function getPlayerDetails(){
            var urlBase = "http://api.sportradar.us/nfl-ot1/players/"+playerId+"/profile.json?api_key="+key;
            $http
                .get(urlBase)
                .then(function(response){
                    model.player = response.data;
                });
        }
    }
})();

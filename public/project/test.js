(function() {
    angular
        .module('Project')
        .controller('searchController', searchController);

    function searchController($http, $location) {

        var model = this;

        model.getPlayerInfo = getPlayerInfo;

        var key = "6wsgf62ddhacehmnp3dwaq6a";
        
        
        function init(){
            getTeamDetails();
        }
        init();

        function getTeamDetails(){
            var urlBase = "http://api.sportradar.us/nfl-ot1/teams/33405046-04ee-4058-a950-d606f8c30852/profile.json?api_key="+key;
            $http
                .get(urlBase)
                .then(function(response){
                    players = response.data.players;
                    name = response.data.market + ' '+ response.data.name;
                    model.name = name;
                    model.players = players;
                    // console.log(players);
                });
        }

        function getPlayerInfo(playerId){
            var urlBase = "http://api.sportradar.us/nfl-ot1/players/"+playerId+"/profile.json?api_key="+key;
            $http
                .get(urlBase)
                .then(function(response){
                    $location.url('/player/'+playerId);
                    // console.log(players);
                });
        }
    }
})();

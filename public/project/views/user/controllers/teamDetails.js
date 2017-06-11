(function() {
    angular
        .module('Project')
        .controller('teamDetails', teamDetails);

    function teamDetails($http, $location, $routeParams) {

        var model = this;

        var teamId = $routeParams['teamId']
        // model.getPlayerInfo = getPlayerInfo;

        var key = "6wsgf62ddhacehmnp3dwaq6a";
        
        
        function init(){
            getTeamDetails();
            getTeamImage();
        }
        init();

        function getTeamDetails(){
            var urlBase = "https://api.sportradar.us/nfl-ot1/teams/"+teamId+"/profile.json?api_key="+key;
            $http
                .get(urlBase)
                .then(function(response){
                    players = response.data.players;
                    name = response.data.market + ' '+ response.data.name;
                    model.name = name;
                    model.players = players;
                });
        }

        function getTeamImage(){
            $http
                .get('assets/teams.json')
                .then(function(response){
                    teams = response.data;
                    for(var u in teams){
                        if(teams[u].id === teamId){
                            model.image = teams[u].url.thumb;
                        }
                    }
                });
        }

        // function getPlayerInfo(playerId){
        //     var urlBase = "http://api.sportradar.us/nfl-ot1/players/"+playerId+"/profile.json?api_key="+key;
        //     $http
        //         .get(urlBase)
        //         .then(function(response){
        //             $location.url('/player/'+playerId);
        //         });
        // }
    }
})();

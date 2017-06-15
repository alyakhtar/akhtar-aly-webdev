(function() {
    angular
        .module('Project')
        .controller('teamDetails', teamDetails);

    function teamDetails($location, $routeParams, teamService) {

        var model = this;

        var teamId = $routeParams['teamId'];
        
        function init(){
            getTeamDetails();
            getTeamImage();
        }
        init();

        function getTeamDetails(){
            teamService
                .getTeamDetails(teamId)
                .then(function(teamDetails){
                    model.players = teamDetails.players;
                    model.name = teamDetails.market + ' '+ teamDetails.name;
                });
        }

        function getTeamImage(){
            teamService
                .getTeamImage()
                .then(function(teams){
                    for(var u in teams){
                        if(teams[u].id === teamId){
                            model.image = teams[u].url.thumb;
                        }
                    }
                });
        }
    }
})();

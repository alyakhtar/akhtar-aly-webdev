(function() {
    angular
        .module('Project')
        .controller('teams', teams);

    function teams($location, teamService) {

        var model = this;

        model.getTeamDetails = getTeamDetails;

        function init(){
            teamService
                .getTeams()
                .then(function(teams){
                    model.teams = teams;
                })
        }
        init();

        function getTeamDetails(teamId){
            $location.url('/team/'+teamId);
        }
    }
})();

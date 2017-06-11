(function() {
    angular
        .module('Project')
        .controller('teams', teams);

    function teams($http, $location) {

        var model = this;

        model.getTeamDetails = getTeamDetails;

        function init(){
            getTeams();
        }
        init();

        function getTeams(){
            $http
                .get('assets/teams.json')
                .then(function(response){
                    model.teams = response.data;
                    // model.afc = response.data.afc;
                });
        }

        function getTeamDetails(teamId){
            $location.url('/team/'+teamId);
        }
    }
})();

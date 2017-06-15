(function() {
    angular
        .module('Project')
        .factory('teamService', teamService);

    function teamService($http) {

        var api = {
            getTeams: getTeams,
            getTeamDetails: getTeamDetails,
            getTeamImage: getTeamImage
        };
        return api;

        function getTeams(){
            url= 'assets/teams.json'
            return $http
                    .get(url)
                    .then(function(response){
                        return response.data;
                    });
        }

        function getTeamDetails(teamId){
            url = '/api/team/'+teamId;
            return $http
                    .get(url)
                    .then(function(response){
                        return response.data;
                    });
        }

        function getTeamImage(){
            return $http
                    .get('assets/teams.json')
                    .then(function(response){
                        return response.data;
                    });
        }
    }
})();

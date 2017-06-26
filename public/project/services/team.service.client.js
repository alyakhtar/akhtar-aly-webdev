(function() {
    angular
        .module('Project')
        .factory('teamService', teamService);

    function teamService($http) {

        var api = {
            getTeams: getTeams,
            getTeamDetails: getTeamDetails,
            getTeamImage: getTeamImage,
            getHomepageTeams: getHomepageTeams,
            updateHomepageTeams: updateHomepageTeams
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

        function getHomepageTeams(){
            var url = '/api/project/admin/teams';
            return $http
                    .get(url)
                    .then(function(response){
                        return response.data;
                    });
        }

        function updateHomepageTeams(teamId, newTeam){
            var url = '/api/project/admin/team/'+teamId;

            return $http
                    .post(url, newTeam)
                    .then(function(response){
                        return response.data;
                    })
        }
    }
})();

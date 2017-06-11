(function () {
    angular
        .module('Project')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home.html'
            })
            .when('/login', {
            	templateUrl: 'views/user/templates/login.html'
            })
            .when('/register', {
                templateUrl: 'views/user/templates/register.html'
            })
            .when('/teams', {
                templateUrl: 'views/user/templates/teams.html',
                controller: 'teams',
                controllerAs: 'model'
            })
            .when('/team/:teamId', {
                templateUrl: 'views/user/templates/team-info.html',
                controller: 'teamDetails',
                controllerAs: 'model'
            })
            // .when('/player/:playerId', {
            // 	templateUrl: 'views/user/templates/player.html',
            //     controller: 'playerDetails',
            //     controllerAs: 'model'
            // })

    }
})();
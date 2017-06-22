(function () {
    angular
        .module('Project')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home.html'
            })
            .when('/teams', {
                templateUrl: 'views/team/templates/teams.view.client.html',
                controller: 'teams',
                controllerAs: 'model'
            })
            .when('/team/:teamId', {
                templateUrl: 'views/team/templates/team-info.view.client.html',
                controller: 'teamDetails',
                controllerAs: 'model'
            })
            .when('/login', {
            	templateUrl: 'views/user/templates/login.view.client.html',
                controller:'loginController',
                controllerAs: 'model'
            })
            .when('/register', {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when('/user/:userId', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model'
            })
            .when('/user/:userId/wall', {
                templateUrl: 'views/user/templates/wall.view.client.html',
                controller: 'wallController',
                controllerAs: 'model'
            })
            .when('/user/:userId/tickets', {
                templateUrl: 'views/user/templates/tickets.view.client.html',
                controller: 'ticketController',
                controllerAs: 'model'
            })
            // .when('/player/:playerId', {
            // 	templateUrl: 'views/user/templates/player.html',
            //     controller: 'playerDetails',
            //     controllerAs: 'model'
            // })

    }
})();
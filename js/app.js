
var pokeApp = angular.module('pokeApp', ['ngRoute', 'ngResource']);

pokeApp.config(function ($routeProvider) {
    $routeProvider

    .when('/', {
        templateUrl: 'pages/home.html',
        controller: 'homeController'
    })

    .when('/team', {
        templateUrl: 'pages/team.html',
        controller: 'teamController'
    })
    
});

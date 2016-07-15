'use strict';

angular
    .module('myApp', [
        'ngRoute'
    ])
	.config(($routeProvider, $locationProvider) => {
	    $routeProvider
	        .when('/', {
	            templateUrl: 'views/main.html',
	            controller: 'MainCtrl'
	        })
	        .otherwise({
	            redirectTo: '/'
	        });
});

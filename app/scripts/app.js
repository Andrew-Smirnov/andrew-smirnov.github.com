'use strict';

/**
 * @ngdoc overview
 * @name applicationApp
 * @description
 * # applicationApp
 *
 * Main module of the application.
 */
angular
  .module('applicationApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/venue/:venueId',{
        templateUrl: 'views/venue.html',
        controller: 'VenueCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

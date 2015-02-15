'use strict';

/**
 * @ngdoc function
 * @name applicationApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the applicationApp
 */
angular.module('applicationApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

'use strict';

/**
 * @ngdoc overview
 * @name loanReportApp
 * @description
 * # loanReportApp
 *
 * Main module of the application.
 */
angular
  .module('loanReportApp', [
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
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

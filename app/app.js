var app = angular.module("loanreportApp", ['ngRoute']); 

app.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');
}]);

app.controller("loanReportCtrl", function ($scope, $rootScope, $cookies, ngProgressFactory) {
   
    $scope.$parent.ShowHeaderMenu = true;
});
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        /*landing pages*/
        .when("/", {
            templateUrl: "views/landingPage/login.html",
            controller: "loginCtrl",
        })
        .when("/login", {
            templateUrl: "views/landingPage/login.html",
            controller: "loginCtrl"
        })
        .when("/register", {
            templateUrl: "views/landingPage/register.html",
            controller: "registerCtrl"
        })
        .when("/forgetPassword", {
            templateUrl: "views/landingPage/forgetpassword.html",
            controller: "forgetpasswordCtrl"
        })
        .when("/dashboard", {
            templateUrl: "views/dashboard.html",
            controller: "dashboardCtrl"
        })
        .otherwise({
            templateUrl: "views/landingPage/login.html",
            controller: "loginCtrl"
        });
}])

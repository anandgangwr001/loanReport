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
<<<<<<< Updated upstream
        .when("/login", {
            templateUrl: "views/landingPage/login.html",
            controller: "loginCtrl"
=======
        .when("/dashboard", {
            templateUrl: "views/dashboard.html",
            controller: "dashboardCtrl"
        })
        .when("/accepted", {
            templateUrl: "views/personalLoan/acceptedPersonalLoan.html",
            controller: "acceptedPersonalLoanCtrl"
>>>>>>> Stashed changes
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
        .when("/about", {
            templateUrl: "views/about.html",
            controller: "aboutCtrl"
        })
        .otherwise({
            templateUrl: "views/landingPage/login.html",
            controller: "loginCtrl"
        });
}])

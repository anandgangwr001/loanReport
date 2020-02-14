var app = angular.module("loanreportApp", ['ngExDialog', 'ngRoute', 'webStorageModule', 'toaster']);

app.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');
}]);

app.controller("loanReportCtrl", function ($scope) {
    $scope.$parent.ShowHeaderMenu = true;
});
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        /*landing pages*/
        .when("/", {
            templateUrl: "views/landingPage/login.html",
            controller: "loginCtrl",
        })
        // .when("/register", {
        //     templateUrl: "views/landingPage/register.html",
        //     controller: "registerCtrl"
        // })
        // .when("/forgetPassword", {
        //     templateUrl: "views/landingPage/forgetpassword.html",
        //     controller: "forgetpasswordCtrl"
        // })
        .when("/dashboard", {
            templateUrl: "views/dashboard.html",
            controller: "dashboardCtrl"
        })
        .when("/accepted", {
            templateUrl: "views/personalLoan/acceptedPersonalLoan.html",
            controller: "acceptedPersonalLoanCtrl"
        })
        .when("/rejected", {
            templateUrl: "views/personalLoan/rejectedPersonalLoan.html",
            controller: "rejectedPersonalLoanCtrl"
        })
        .when("/acceptedBusiness", {
            templateUrl: "views/businessLoan/acceptedBusinessLoan.html",
            controller: "acceptedBusinessLoanCtrl"
        })
        .when("/rejectedBusiness", {
            templateUrl: "views/businessLoan/rejectedBusinessLoan.html",
            controller: "rejectedBusinessLoanCtrl"
        })
        .when("/nosubmit", {
            templateUrl: "views/nosubmit/nosubmit.html",
            controller: "noSubmitCtrl"
        })
        .otherwise({
            templateUrl: "views/landingPage/login.html",
            controller: "loginCtrl"
        });
}]);
app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push(['$rootScope', '$q', '$injector', function ($rootScope, $q, $injector) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                //config.headers['Access-Control-Allow-Origin'] = '*';
                var LS = $injector.get('LS');
                var authData = LS.get('authToken');
                if (config.url.indexOf("/login") == -1 && authData && authData != "") {
                    if (!config.headers['X-Auth-Token'] && !config.headers['X-AUTH-TOKEN'])
                        config.headers['X-Auth-Token'] = authData;
                    // console.log(JSON.stringify(config.url));
                } else {
                    var location = $injector.get('$location');
                    var hostname = location.host().split('.')[0];
                    if (hostname === 'localhost')
                        hostname = 'localhost';
                }
                if (config.url.indexOf("truecopy.in") >= 0) {
                    delete config.headers['X-Auth-Token'];
                }
                return config;
            },
            responseError: function (rejection) {
                var deferred = $q.defer();
                if (rejection.data) {
                    if (rejection.data.error == "invalid_grant") {
                        return $q.reject(rejection);
                    }
                    if (rejection.data.ModelState && rejection.data.ModelState.Duplicate_User) {
                        return $q.reject(rejection);
                    }
                }
                var config = rejection.config || {};
                var Terror = {
                    'status': rejection.status,
                    'url': config.url
                };
                console.log(config.url);
                var ErrMsg = "'Something went wrong due to internet connectivity issues.'";
                if (!config.ignoreAuthModule) {
                    switch (rejection.status) {
                        case 0:
                            break;
                        case 401:
                            break;
                        default:
                            switch (rejection.status) {
                                case 403:
                                    ErrMsg = "You don't have necessary permissions for the resource";
                                    break;
                                case "404":
                                    ErrMsg = "The requested resource could not be found";
                                    break;
                                case "407":
                                    ErrMsg = "The client must first authenticate itself with the proxy";
                                    break;
                                case "408 ":
                                    ErrMsg = "The client did not produce a request within the time that the server was prepared to wait.The client MAY repeat the request without modifications at any later time";
                                    break;
                            }
                            break;
                    }
                }
                //alert(ErrMsg);
                if ($rootScope.showErrorModal) {
                    console.log(ErrMsg);
                } else {
                    $rootScope.showErrorModal = true;
                    var exDialog = $injector.get('exDialog');
                    if (config.url.indexOf("truecopy.in") < 0) {
                        exDialog.openMessage($rootScope, ErrMsg, "Warning", "warning");
                    }
                }

                return $q.reject(rejection);
            }
        };
    }]);
}]);


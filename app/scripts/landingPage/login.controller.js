app.controller("loginCtrl", function ($scope,loginService,$window,LS,toaster) {
    $scope.$parent.ShowHeaderMenu = false
    $scope.ClearCookies = function () {
        var Lang = LS.get('lang');
        LS.clearAll();
        LS.set('lang', Lang); 
    }
    $scope.ClearCookies();
    $scope.user={};
    $scope.doLogin = function (loginForm) {
        if (loginForm.$valid) {
            loginService.loginFunction($scope.user).then(function (response) {
                if (response && response.data && response.data.status == "SUCCESS") {
                    LS.set('authToken', response.data.token);
                    $window.location.href = '#/dashboard';
                    toaster.pop('success', "success", "Login Successfully");

                } else {
                    toaster.pop('error', "error", "Please Enter valid details");
                }
            })
        } else {
            // toaster.pop('error', "error", "Please Enter valid details");
            // toastr.warning("Please Enter valid details");
        }
    };
});


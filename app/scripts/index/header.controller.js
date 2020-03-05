app.controller("headerCtrl", function ($scope, $rootScope, LS, $cookies, $window, restUrl, $timeout, $http, cfpLoadingBar, toastr, ModalService) {

    //GET COMPANY LIST 
    $scope.$parent.getCompanyList();
    //$scope.NavEntityContext = $scope.$parent.getSetNavContext();
    $scope.isLoadedHierarchy = false;

    $scope.fetch = function () {
    };

    $scope.start = function () {
        cfpLoadingBar.start();
    };

    $scope.complete = function () {
        cfpLoadingBar.complete();
    }

    $scope.IsReadOnly = function (btn) {
        if ($scope.$parent.get_UserRole) {
            var role = $scope.$parent.get_UserRole();
            if (role && role.access) {
                if (role.access.indexOf(btn) >= 0)
                    return true;
                else
                    return false;
            }
        }
    }

    // fake the initial load so first time users can see it right away:
    $scope.start();
    $scope.fakeIntro = true;
    $timeout(function () {
        $scope.complete();
        $scope.fakeIntro = false;
    }, 750);


    //CHANGE COMPANY 
    $scope.changeCompany = function (companyId) {
        var url = restUrl.changeCompanyUrl;
        if (companyId) {
            $http({
                method: "POST",
                url: url + companyId
            }).then(function (response) {
                if (response.data.status == "SUCCESS") {
                    if (response.data.response && response.data.response.length > 0 && response.data.response[0].companyid) {
                        var companyId = response.data.response[0].companyid;
                        var company = response.data.response[0].company;
                        //$scope.set_UserRole(response.data.response[0].role);
                        $scope.$parent.getSetCompanyId(companyId);
                        $cookies.put('companyIdCookies', companyId);
                        $scope.$parent.getSetCompany(company);
                        $scope.$parent.updateBusinessEntity();
                        angular.element('#parentEntity').html(company);
                        $scope.clearFilling();
                        $scope.clearFillingPeriod();
                        toastr.success(response.data.message)
                        $window.location.href = "#/dashboard";
                    }
                } else {
                    toastr.info(response.data.message)
                }
            }).catch(function (err) {
                toastr.info("Network Error!");
                $window.location.href = "#/dashboard";
            });
        }
    }
    $rootScope.showHeader = true;
    $rootScope.showFooter = true;
    $scope.closeSsoWindow = function () {
        if ($rootScope.Ssowindow != null) {
            $rootScope.logoutSsoWindow();
            $scope.logoutTestInsWin();
            $rootScope.Ssowindow.close();
        }
    }
    $scope.signOutFunction = function () {
        debugger;
        $rootScope.logoutSsoWindow();
        $scope.logoutTestInsWin();
        $scope.isicici = LS.get('isicweicirt');
        $cookies.remove("userCookies");
        $cookies.remove("tokenCookies");
        $cookies.remove("companyIdCookies");
        $cookies.remove("parentCompanyCookies");
        $cookies.remove("gstinForViewEditDeleteCookies");
        $cookies.remove("BusinessEntityCookie");
        $cookies.remove("companyName");
        $cookies.remove("tokenCookies");
        $cookies.remove("userCookies");
        $cookies.remove("gstinForViewInvoice");
        $scope.$parent.getSetshowMenu(1);

        var Lang = LS.get('lang');
        LS.clearAll();
        LS.set('lang', Lang);

        localStorage.clear();

        if ($scope.isicici == true) {

            $window.location.href = '#/Logout';
        }
        else {
            $window.location.href = '#/login';
            $window.location.reload();
        }

    }

    //feedback form popup
    $scope.openfeedbackform = function () {
        debugger;
        var modalObj = ModalService.showModal({
            templateUrl: './views/index/feedbackform.html',
            controller: "feedbackFormCtrl",
            inputs: {

            }
        }).then(function (modal) {
            modal.element.modal();

            return modal.close;
        }).then(function (result) {

        });
    };
    //sapphire to amethyst with SSO
    /*$scope.navReport = function(){
        navAmethystRpt.GetSessionId($scope.userId).then(function(){
            console.log("getting session id");
            });
    };*/
    /*$scope.navReport = function () {
        debugger;
        var url = 'http://52.66.196.251/axis2/rx/cubotsvc/loginCubot/';
        var url = 'https://dev.bi.irisgst.com/axis2/rx/cubotsvc/loginCubot/';
        var headers = {
                  'Access-Control-Allow-Origin' : '*',
                  'Access-Control-Allow-Headers' : '*',
                  'Content-Type': 'text/plain',
                  'Accept': 'text/plain'
              };
        $http({        	 
            method: 'POST',
            url: url,
            headers: headers,
            headers: {'Content-Type': 'text/plain','accept':'**', 'Access-Control-Allow-Origin':'*', 'Access-Control-Allow-Headers':'*'},
            data:'<loginCubot><dbSchema>gst</dbSchema><domainName></domainName><userId>sessioninit=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2YWlzaGFsaS5jaGhlZGFAaXJpc2luZGlhLm5ldCIsImF1ZGllbmNlIjoid2ViIiwiY3JlYXRlZCI6MTU0MTA2NTYwMzAxNSwiZXhwIjoxNTQxNjcwNDAzLCJ0ZW5hbnQiOiJkZXYifQ.dKt9gCxPZInV5CDAMW7qO4EW9MLmGigu5uhc77CcpFiH1TMWMGlka8njXL7Dhg8p6dSqR4_-5M_kS6oyKRZupQ</userId><password></password><signature>123</signature></loginCubot>'
  
        }).then(function (response) {
            if (response.data.status == 'SUCCESS') {                
                 toastr.success("success");
                $window.location.href = "https://dev.bi.irisgst.com/gstr/GstrAnalysis.html";
                
            } else {
                toastr.info("Failure!");
            }
        });
      }*/
    $scope.prodIp = 'http://www.beta.bi.irisgst.com'

    $scope.navReport = function () {
        var url = restUrl.initializeAmethystSession;
        $http({
            method: 'GET',
            url: url
        }).then(function (response) {
            if (response.data.status == 'SUCCESS') {
                toastr.success(response.data.message);
                var sessionId = response.data.response;
                var expireDate = new Date();
                expireDate.setDate(expireDate.getDate() + 2);
                console.log('expires ' + expireDate);
                $cookies.put("RXSESSION", sessionId, {
                    expires: expireDate
                });
                /*$rootScope.Ssowindow = $window.open('https://dev.bi.irisgst.com/irisDashboard/mainReport.html', 'Amethyst');*/
                /*$rootScope.Ssowindow = $window.open('http://www.beta.bi.irisgst.com/irisDashboard/mainReport.html', 'Amethyst');*/
                $rootScope.Ssowindow = $window.open('http://www.beta.bi.irisgst.com/dashboard.html?' + $cookies.get('RXSESSION'), 'Amethyst');
                $rootScope.hasInsight = true;
                //$rootScope.getSessionId = $cookies.get('RXSESSION');
            } else {
                toastr.error(response.data.message);
            }
        });

    }
    $rootScope.logoutSsoWindow = function () {
        //$rootScope.getSessionId = $cookies.get('RXSESSION');
        /*var url = 'https://dev.bi.irisgst.com/axis2/rx/cubotsvc/logoutCubot/'+$rootScope.getSessionId;*/
        /*var url = 'http://www.beta.bi.irisgst.com/axis2/rx/cubotsvc/logoutCubot/'+$rootScope.getSessionId;*/
        /*var url = 'http://www.beta.bi.irisgst.com/dashboard_logout.html?'+$rootScope.getSessionId;*/
        if (($rootScope.Ssowindow != null || $rootScope.logoutWindow != null) && $rootScope.hasInsight) {
            $rootScope.logoutWindow = $window.open('http://www.beta.bi.irisgst.com/dashboard_logout.html?' + $cookies.get('RXSESSION'));
            $rootScope.hasInsight = false;
            $rootScope.Ssowindow.close();
            $rootScope.logoutWindow.close();
        }
        //toastr.success("Signed out successfully");      	
        /*$http({
            url: url
        }).then(function (response) {       	
            if (response.data.status == 'SUCCESS') {                
           	 toastr.success("Signed out successfully");          	
           	} else {
                toastr.error("Problem in sign out");
            }
        });*/
    }
    //test insight code start here
    $scope.testInsight = function () {
        var url = restUrl.initializeAmethystSession;
        $http({
            method: 'GET',
            url: url
        }).then(function (response) {
            if (response.data.status == 'SUCCESS') {
                toastr.success(response.data.message);
                var sessionId = response.data.response;
                var expireDate = new Date();
                expireDate.setDate(expireDate.getDate() + 2);
                console.log('expires ' + expireDate);
                $cookies.put("RXSESSION", sessionId, {
                    expires: expireDate
                });
                $rootScope.testInswindow = $window.open('http://www.beta.bi.irisgst.com/dashboard_test.html?' + $cookies.get('RXSESSION'), 'Amethyst');
                $rootScope.hasTestInsight = true;
            } else {
                toastr.error(response.data.message);
            }
        });
    }
    $rootScope.logoutTestInsWin = function () {
        //$rootScope.getSessionId = $cookies.get('RXSESSION');
        if (($rootScope.testInswindow != null || $rootScope.logoutTestWindow != null) && $rootScope.hasTestInsight) {
            $rootScope.logoutTestWindow = $window.open('http://www.beta.bi.irisgst.com/dashboard_logout_test.html?' + $cookies.get('RXSESSION'));
            $rootScope.hasTestInsight = false;
            $rootScope.testInswindow.close();
            $rootScope.logoutTestWindow.close();
        }
    }


});
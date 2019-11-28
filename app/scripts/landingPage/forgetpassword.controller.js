app.controller("forgetpasswordCtrl", function ($scope, $rootScope, $timeout, $cookies, $window) {
    console.log("controler loaded");
//     $rootScope.common = {
//         "showHeader": false,
//         "showFooter": false
//     };

//     $scope.$parent.getSetshowMenu(1);
   
//     $rootScope.email = undefined;
    
   
//     $scope.ClearCookies = function () {
//         $cookies.remove("userCookies");
//         $cookies.remove("tokenCookies");
//         $cookies.remove("companyIdCookies");
//         $cookies.remove("parentCompanyCookies");
//         $cookies.remove("gstinForViewEditDeleteCookies");
//         $cookies.remove("BusinessEntityCookie");
//         $cookies.remove("companyName");
//         $cookies.remove("gstinForViewInvoice");

//         var Lang = LS.get('lang');
//         LS.clearAll();
//         LS.set('lang', Lang);
       
//     }
//     $scope.ClearCookies();
//     $scope.formData = {};
//     $scope.doLogin = function (loginForm) {
    
//         if (loginForm.$valid) {
     
//             //$scope.formData.email = $scope.formData.email.replace(/[\s]/g, '');
//             //  $scope.formData.email = $scope.formData.email.trim();
//             //$scope.formData.password = $scope.formData.password.replace(/[\s]/g, '');
          
//             loginService.loginFunction($scope.formData).then(function (response) {
//                 $rootScope.email = undefined;
                
//                 if (response && response.data && response.data.status == "SUCCESS") {
//                     //toastr.success('Login Successful!');
//                     $scope.set_UserRole(1);
//                     //$scope.set_UserRole(response.data.response.role);
//                     var Lang = LS.get('lang');
//                     LS.set('lang', Lang);
//                     LS.set('authToken', response.data.response.token);
//                     LS.set('parentCompanyId', response.data.response.parentid);
//                     var passwordExpDate = response.data.response.passWordExpiredDate;                                        
//                     LS.set('passwordExpLeftDays', passwordExpDate);
//                     LS.set('email',response.data.response.email);
//                     LS.set('username',response.data.response.username);
//                     if ($scope.$parent) {
//                         LS.set('selectedReconComp', null);
//                         LS.set('sectionName', null);
//                         LS.set('selectedFp', null);
//                         $scope.$parent.getSetCompany(response.data.response.rootCompanyName);
//                         $scope.$parent.getSetUser(response.data.response.username);
//                         $scope.$parent.getSetUserId(response.data.response.email);
//                         if(response.data.response.companyid != undefined){
//                             $scope.$parent.subArrowShow = true;
//                             $scope.$parent.getSetCompanyId(response.data.response.rootCompanyid);
//                             $scope.$parent.getBusinessHierarchy();
//                             // $scope.$parent.viewBusinessHierarchy(response.data.response.companyid);
//                             /* $scope.$parent.getDashboardReturnStatusCount(response.data.response.companyid, '072017', $scope.$parent.getCurrentMonthYear(), 'GSTR1');
//                             $scope.$parent.getDashboardReturnStatusCount(response.data.response.companyid, '072017', $scope.$parent.getCurrentMonthYear(), 'GSTR3B'); */
//                             //$scope.$parent.getReturnStatusAndQuickStatsData($scope.getSetCompanyId());
//                             $scope.$parent.getOutwardSupplyAndLiability(response.data.response.companyid, $scope.$parent.getSetUserId());
//                             $scope.$parent.getTaxPayment(response.data.response.companyid, $scope.$parent.getSetUserId());
//                             $scope.$parent.getQuickStats(response.data.response.companyid, $scope.$parent.getSetUserId());
//                         }
//                         else{
//                             $scope.$parent.subArrowShow = false;
//                         }
//                         $scope.$parent.roleName = $scope.$parent.get_UserRole();
//                     }
//                     angular.element('#parentEntity').text(response.data.response.rootCompanyName);
//                     angular.element('#parentCompanyUser').text(response.data.response.username);
//                     //$timeout(function(){
//                     $scope.$parent.isBusinessHierarchyCalled = true;
//                     $window.location.href = '#/dashboard';
//                     //}, 400);
//                 } else {
//                     if (response && response.data && response.data.status == "FAILURE") {
//                         if (response.data.response != null && response.data.response.isValidPassword == false) {
//                             toastr.error('Your password has expired and must be changed after redirecting.');
//                             $rootScope.email = response.data.response.email;                            
//                             $timeout(function () {
//                                 $window.location.href = '#/setNewPassword';
//                             }, 1000);
//                         } else {
//                     toastr.error('Invalid sign in details', 'Error');
//                     $window.location.href = '#/login';
//                 }
//                     }
// //                    toastr.error('Invalid sign in details', 'Error');
// //                    $window.location.href = '#/login';
//                 }
//             }).catch(function (err) {
//                 toastr.error("Network Error");
//             });

//         } else {
          
//             // toastr.warning("Please Enter valid details");
//         }
//     };


//     $scope.langtypes = [{"name": "English", "value": "en"}, {"name": "Hindi", "value": "hi"}];

//     $scope.change_lang = function () {
//         var lang = $scope.langtypes.find(function (e) {
//             if (e.value == $scope.selectedlangtype)
//                 return e;
//         });
//         LS.set('lang', lang);
//         $window.location.reload();
//     };


//     $scope.defaultlang = function () {
//         var lang = LS.get('lang');
//         if (lang)
//             $scope.selectedlangtype = lang.value;
//     };
});


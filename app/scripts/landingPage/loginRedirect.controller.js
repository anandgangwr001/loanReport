app.controller("loginRedirectCtrl",function($scope,$http,$location,$window,$rootScope,restUrl,toastr)	{ 
  console.log("login redirect ctrl loads...");
  $scope.$parent.ShowHeaderMenu = false;
  $scope.$parent.getSetshowMenu(1);
  $rootScope.showHeader = false;
  $rootScope.showFooter = false;
  var tokenObject = $location.search();
  var res = "";
	var absUrl = $location.absUrl();
  var token = tokenObject.token;
  var userName = tokenObject.userFirstName;

      $scope.regenerateToken = function() {
         var url=restUrl.regenerateTokenUrl+token;
         
          $http({
              method: 'POST',
              url:url+token,
              headers: {'Content-Type': 'application/json'}
          }).then(function (response) {
            
             if(response.data.status=='FAILURE') {
                toastr.warning(response.data.message);
             } else if(response.data.status=='SUCCESS') {
                toastr.success(response.data.message);
             }
              var res= response.data.message;
              
              
             //  $window.location.href = '#/login';
          });
       }

});

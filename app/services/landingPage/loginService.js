app.service("loginService",function($http){

    var url = "http://apiform.webelecreditmanagement.com/login/login_data";

    this.loginFunction = function(loginModel) {
        var mpromise = $http.post(url, loginModel);
            return mpromise;
    };
    this.testFunciton = function(){
        return "hello";
    };
    
})
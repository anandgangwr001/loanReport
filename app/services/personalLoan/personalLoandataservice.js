app.factory("personalloandataService", ['$http', function ($http) {
    var dataServiceFactory = {};
    var _getdataCount = function (model, url) {
        return $http({
            method: 'POST',
            url: url,
            data: model
        }).then(function (response) {
            return response;
        }, function (error) {
            // toastr.error('server problem', +error);
        });
    }
    dataServiceFactory.getDataCount = _getdataCount;
    return dataServiceFactory;
}]);
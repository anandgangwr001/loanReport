app.factory("GET_INVOICELIST_SERVICE", ['$http', function ($http) {
    var invoiceServiceFactory = {};

    var _searchInvoice = function (model, page, size) {
        model.page=page;
        model.size=size;
        var url = "http://apiform.webelecreditmanagement.com/getdata/user_get";
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
    var _nosubmitInvoice = function (model, page, size) {
        model.page=page;
        model.size=size;
        var url = "http://apiform.webelecreditmanagement.com/nosubmitctrl/nosubmit_user";
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

    invoiceServiceFactory.searchInvoice = _searchInvoice;
    invoiceServiceFactory.nosubmitInvoice = _nosubmitInvoice;
    return invoiceServiceFactory;
}]);
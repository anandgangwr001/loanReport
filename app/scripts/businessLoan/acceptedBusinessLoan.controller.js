app.controller("acceptedBusinessLoanCtrl", function ($scope, personalloandataService, PaginationService, GET_INVOICELIST_SERVICE, $filter) {
    $scope.$parent.ShowHeaderMenu = true;
    $scope.pager = {};
    $scope.pegSize = 10;
    $scope.isDateReset = true;
    var fdate;
    var tdate;
    $scope.dateString = $filter("date")(Date.now(), 'yyyy-MM-dd');
    $scope.endDate = new Date($scope.dateString)
    tdate = convert($scope.endDate);

    $scope.fromdateString = $filter("date")('2020-01-01', 'yyyy-MM-dd');
    $scope.frmDate = new Date($scope.fromdateString)
    fdate = convert($scope.frmDate);

    function convert(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }

    $scope.fromDate = function () {
        fdate = convert($scope.frmDate);
        $scope.isDateReset = false;
        $scope.accptedBusinessLoan();
    };
    $scope.toDate = function () {
        tdate = convert($scope.endDate);
        $scope.isDateReset = false;
        $scope.accptedBusinessLoan();
    };

    $scope.clearFilter = function () {
        $scope.searchdata = "";
    };

    $scope.clearDateFilter = function () {
        $scope.fromdateString = $filter("date")('2020-01-01', 'yyyy-MM-dd');
        $scope.frmDate = new Date($scope.fromdateString)
        $scope.dateString = $filter("date")(Date.now(), 'yyyy-MM-dd');
        $scope.endDate = new Date($scope.dateString)
        $scope.isDateReset = true;
    };
    $scope.accptedBusinessLoan = function (resetPagination) {
        if (resetPagination) {
            $scope.CurrentPage = 0;
            $scope.pegSize = 10;
        }
        $scope.dataFilter = {
            "emp_type": "Self_e",
            "approval": "A",
            "fromDate": fdate ? fdate : null,
            "toDate": tdate ? tdate : null
        };
        var url = "http://apiform.webelecreditmanagement.com/getdata/user_get_count";
        var mpromise = personalloandataService.getDataCount($scope.dataFilter, url);
        mpromise.then(function (response) {
            if (response.data != null && response.data.totalRecord != null && response.data.status == true) {
                //CALLING SERVICE FOR SEARCH FILTER
                $scope.totalCount = response.data.totalRecord;
                $scope.pager = PaginationService.getPager($scope.totalCount, $scope.CurrentPage, $scope.pegSize);
                var mpromise1 = GET_INVOICELIST_SERVICE.searchInvoice($scope.dataFilter, $scope.CurrentPage - 1, $scope.pegSize);
                mpromise1.then(function (response) {
                    if (response.data.status == true && response.data.data != null) {
                        $scope.res = response.data.data;
                    }
                    $scope.tbl = true;
                })
            } else {
                $scope.msg = response.data.meassage;
                $scope.tbl = false;
            }
        })
    }
    $scope.setPage = function (page, pageChanged) {
        if (page === "" || page === null) {
            // toastr.error('Please Enter Page Number.'); return;
        }
        page = parseInt(page);
        if (page < 1 || page > $scope.pager.totalPages) {
            // toastr.error('Page Not Found.');
            return;
        }
        $scope.CurrentPage = page;
        if (pageChanged) {
            $scope.CurrentPage = $scope.CurrentPage;
            $scope.pegSize = $scope.pegSize;
        }
        $scope.accptedBusinessLoan(false);
    }
    $scope.setPage(1);
});


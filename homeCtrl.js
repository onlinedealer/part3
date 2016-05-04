(function() {
    'use strict';

    fileuploader.controller("homeCtrl", ['$scope', '$ajaxFactory', '$rootScope', 'fileUpload', 'uiRouters', '$location', '$route', '$window', '$timeout', homeCtrl]);

    function homeCtrl($scope, $ajaxFactory, $rootScope, fileUpload, uiRouters, $location, $route, $window, $timeout) {
        $scope.viewbtn = true;
        $scope.DataSource = [];
        $rootScope.dropdownselect1 = "";
        $scope.checkboxall = "";

        $scope.fetchdropdown = "";
        $scope.contestTypeValue = "";
        $scope.selectedId = "";
        //$scope.statusMsg = "";


        $scope.statusMsg = $scope.uploadResponse;

        $timeout(function() {
            $scope.statusMsg = "";
        }, 3000);

        $scope.processStatus = $scope.uploadResponse;

        $timeout(function() {
            $scope.processStatus = "";
        }, 3000);


        $scope.templateapplied = "test";



        // function for upload button
        $scope.uploadFile = function() {

            var file = $scope.myFile;
            var uploadUrl = 'http://localhost:8090/ocr/rest/v1/service/upload/pdf/file/';
            var promise = fileUpload.uploadFileToUrl(file, uploadUrl);

            promise.then(function(d) {
                $scope.uploadResponse = d;
            });
            promise.catch(function(d) {
                console.log('catch block executed', d);
                return d;
            });
            promise.finally(function(d) {
                console.log('finally block executed', d);

            });
            $window.location.reload();
            //$scope.statusMsg = $scope.uploadResponse.RESULT;

        };

        // catching template on dropdown list
        $scope.changedValue = function(item) {
            $rootScope.dropdownSelect = item.templateName;
            console.log(item.templateName)
        }

        // catching ID on selected radio button
        $scope.getSelectedValue = function(id) {
            $rootScope.selectedId = id;
        }

        // function for navigate to next page depends on selected dropdonw and radio button
        $scope.open = function(checkeditem) {
            $location.url(uiRouters.dashboard);
            //console.log(checkeditem)             
            //console.log($scope.contestTypeValue)   

            $rootScope.globalId = checkeditem;
            console.log($rootScope.globalId)
        };


        // function for "process Document"-- this calls to one service
        $scope.process = function(DataSource) {
            /*var item = [];
            angular.forEach(DataSource, function (value, key) {
                if (DataSource[key].selected == DataSource[key]._id) {
                    item.push(DataSource[key].selected);
                }
            });


            console.log(item)
            //console.log(DataSource[key].selected) 
            }); */

            var selectedTemplate = $rootScope.dropdownSelect;
            console.log(selectedTemplate)

            var selectedId = $rootScope.selectedId;
            console.log(selectedId)

            var url = "http://localhost:8090/ocr/rest/v1/service/process/files/" + selectedId + "/template" + "/" + selectedTemplate;
            console.log(url)
            var promise = $ajaxFactory.getDataFromServer(url, 'POST', {});

            promise.then(function(d) {
                $rootScope.processData = d;
            });
            promise.catch(function(d) {
                console.log('catch block executed', d);
                return d;
            });
            promise.finally(function(d) {
                console.log('finally block executed', d);

            });

            console.log(url)
            $window.location.reload();

        }


        // self calling function to display gird table contains the fileName, status, dropdown..etc
        $scope.fetchDataTable = function() {

            //var url = "http://localhost:8090/ocr/rest/v1/service/get/all/documentqueuedetails";
            var promise = $ajaxFactory.getDataFromServer(uiRouters.filepath + '/table.json', 'GET', {});
            //var promise = $ajaxFactory.getDataFromServer(url, 'GET', {});

            promise.then(function(d) {
                $scope.GridDataSource = d;
            });
            promise.catch(function(d) {
                console.log('catch block executed', d);
                return d;
            });
            promise.finally(function(d) {
                console.log('finally block executed', d);

            });
        }
        $scope.fetchDataTable();

        // function for to display the dropdown
        $scope.fetchdropdownData = function() {

            //var url = "http://localhost:8090/ocr/rest/v1/service//get/all/template";
            var promise = $ajaxFactory.getDataFromServer(uiRouters.filepath + '/template.json', 'GET', {});
            //var promise = $ajaxFactory.getDataFromServer(url, 'GET', {});

            promise.then(function(d) {
                $scope.dropdownList = d;
            });
            promise.catch(function(d) {
                console.log('catch block executed', d);
                return d;
            });
            promise.finally(function(d) {
                console.log('finally block executed', d);

            });
        }
        $scope.fetchdropdownData();

    }
})();
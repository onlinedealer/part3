app.controller("itftController", ['$rootScope', '$scope', '$timeout', '$filter', '$ajaxFactory', '$http', '$interval', 'uiGridTreeViewConstants', '$q',
    function($rootScope, $scope, $timeout, $filter, $ajaxFactory, $http, $interval, uiGridTreeViewConstants, $q) {


        $scope.columnDefs = [];
        $scope.fectchAllColumns = function(data) {
            if (data.length > 0) {
                var record = data[0];
                for (key in record) {
                    var tempObj = {};
                    tempObj.name = key;
                    tempObj.width = "15%";
                    $scope.columnDefs.push(tempObj);
                }

            }
            return $scope.columnDefs;
        };
        $scope.gridOptions = {
            enableSorting: true,
            enableFiltering: true,
            showTreeExpandNoChildren: true,
            paginationPageSizes: [5, 10],
            paginationPageSize: 5,
            columnDefs: $scope.columnDefs,
            onRegisterApi: function(gridApi) {
                $scope.gridApi = gridApi;
            }
        };
        $scope.fetchDataSource = function() {
            var first = $http.get("/resources/data/100.json"),
                second = $http.get("/resources/data/100_sub_nostro.json"),
                third = $http.get("/resources/data/100_sub_sub_nostro.json"),
                four = $http.get("/resources/data/100.json");


            $q.all([first, second, third, four]).then(function(result) {
                var levelOne = result[0].data;
                var levelTwo = result[1].data;
                var levelThree = result[2].data;
                var levelFour = result[3].data;
                $scope.fectchAllColumns(result[0].data);
                //$scope.fectchAllColumns(result[1].data);
                //$scope.fectchAllColumns(result[2].data);
                //$scope.fectchAllColumns(result[3].data);


                angular.forEach(levelOne, function(firstChildNode) {
                    firstChildNode.$$treeLevel = 0;
                    firstChildNode.children = [];

                    angular.forEach(levelTwo, function(secondChildNode) {
                        secondChildNode.$$treeLevel = 1;
                        secondChildNode.children = [];
                        firstChildNode.children.push(secondChildNode);

                        angular.forEach(levelThree, function(thirdChildNode) {
                            thirdChildNode.$$treeLevel = 2;
                            thirdChildNode.children = [];
                            secondChildNode.children.push(thirdChildNode);

                            levelFour.forEach(function(fourthChildNode) {
                                fourthChildNode.$$treeLevel = 3;
                                fourthChildNode.children = [];
                                thirdChildNode.children.push(fourthChildNode);
                            });

                        });
                    });
                });

                $scope.gridOptions.data = [];
                addTreeLevel(levelOne, 0, $scope.gridOptions.data);

            })

        };
        $scope.fetchDataSource();

        $scope.expandAll = function() {
            $scope.gridApi.treeBase.expandAllRows();
            $scope.gridOptions.columnDefs[0].visible = false;
            $scope.gridApi.grid.refresh();
        };
        $scope.hideColumObj = function(index) {
            for (var i = 0; i <= index; i++) {
                $scope.gridOptions.columnDefs[i].visible = false;
            }

            $scope.gridApi.grid.refresh();
        };
        $scope.showColumObj = function() {
            for (var i = 0; i < $scope.gridOptions.columnDefs.length; i++) {
                $scope.gridOptions.columnDefs[i].visible = true;
            }

            $scope.gridApi.grid.refresh();
        };

        $scope.collapseAllRows = function() {
            $scope.gridApi.treeBase.collapseAllRows();
        }

        $scope.toggleRow = function(rowNum) {
            $scope.gridApi.treeBase.toggleRowTreeState($scope.gridApi.grid.renderContainers.body.visibleRowCache[rowNum]);
        };

        var addTreeLevel = function(childArray, currentLevel, dataArray) {
            childArray.forEach(function(childNode) {
                if (childNode.children.length > 0) {
                    childNode.$$treeLevel = currentLevel;
                }
                dataArray.push(childNode);
                addTreeLevel(childNode.children, currentLevel + 1, dataArray);
            });
        };
    }
]);

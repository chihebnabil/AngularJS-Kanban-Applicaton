(function () {
    'use strict';

    angular
        .module('app', ['ngDraggable', "ngRoute"]);


    angular
        .module('app')
        .controller('MainCtrl', MainCtrl)

    /** @ngInject */
    function MainCtrl($scope, $rootScope, $routeParams) {
        $rootScope.navbar = true
        var id = $routeParams.id
        var projects = JSON.parse(localStorage.getItem("projects"))
        $rootScope.label = projects[id].label
        $scope.lists = projects[id].boards




        $scope.onDragComplete = function (index, parent, data, evt) {
            if (data != null) {
                console.log("drag success index, data:", index);
                $scope.lists[parent].tasks.splice(index, 1);
            }
        }
        $scope.onDropComplete = function (index, data, evt) {

            console.log("onDropComplete index, data:", index);
            if (data != null) {
                $scope.$apply(function () {
                    $scope.lists[index].tasks.push(data);
                    $scope.update($scope.lists)
                })
            }

        }
        $scope.new = function (parent, data) {
            if (data != null) {
                $scope.lists[parent].tasks.push({ name: "" + data + "" });
                $scope.update($scope.lists)
            }
        }
        $scope.remove = function (parent, index) {
            $scope.lists[parent].tasks.splice(index, 1);
            $scope.update($scope.lists)
        }
        $scope.update = function (data) {
            projects[id].boards = data
            localStorage.setItem('projects', JSON.stringify(projects))
        }

    }




    angular
        .module('app')
        .controller('HomeCtrl', HomeCtrl)

    /** @ngInject */
    function HomeCtrl($scope, $rootScope) {
        $rootScope.navbar = false

        if (JSON.parse(localStorage.getItem("projects")) == null) {
            $rootScope.projects = []
        } else {
            $rootScope.projects = JSON.parse(localStorage.getItem("projects"))
        }




        $scope.newProject = function () {
            $rootScope.projects.push({
                label: $scope.projectName,
                boards: [
                    {
                        "label": "Todo",
                        "tasks": [
                            {
                                "name": "Task 1",
                                "text": "Task 1 Text",
                                "time": "00"
                            }


                        ]
                    },
                    {
                        "label": "Doing",
                        "tasks": [


                        ]
                    },
                    {
                        "label": "Done",
                        "tasks": [



                        ]
                    }
                ]
            })
            $scope.update($rootScope.projects)

        }
        $scope.remove = function (index) {
            $rootScope.projects.splice(index, 1);
            $scope.update($rootScope.projects)
        }
        $scope.update = function (data) {
            localStorage.setItem('projects', JSON.stringify(data))
        }

    }



    angular
        .module('app')
        .controller('TimeCtrl', TimeCtrl)

    /** @ngInject */
    function TimeCtrl($scope, $rootScope) {


    }



}());
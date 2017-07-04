(function () {
    'use strict';
    /**
     * Firebase Config
     */
    var config = {
        apiKey: "AIzaSyAAghCvO6oB9Pnv1zmQUu7HZMEiKtXdSMQ",
        authDomain: "todos-87616.firebaseapp.com",
        databaseURL: "https://todos-87616.firebaseio.com",
        projectId: "todos-87616",
        storageBucket: "",
        messagingSenderId: "9187514965"
    };
    firebase.initializeApp(config);


    /** @ngInject */
    app.controller('MainCtrl', function ($scope, $rootScope, $routeParams, $firebaseObject, $firebaseAuth, $location, Storage) {

        $rootScope.navbar = true
        var id = $routeParams.id
        $scope.authObj = $firebaseAuth();
        var firebaseUser = $scope.authObj.$getAuth();


        var projects = JSON.parse(localStorage.getItem("projects"))
        Storage.get('projects').then(function (projects) {
            $scope.projects = JSON.parse(projects)
            console.log($scope.projects)

        });


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
                $scope.lists[parent].tasks.push({ name: "" + data + "", time: '' });
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
            Storage.set('projects', JSON.stringify(projects))
        }

    });


    /** @ngInject */
    app.controller('HomeCtrl', function ($scope, $rootScope, $firebaseObject, $firebaseAuth, $location, $firebaseArray, Storage) {

        $rootScope.navbar = false
        $scope.authObj = $firebaseAuth();
        var firebaseUser = $scope.authObj.$getAuth();

        if (JSON.parse(localStorage.getItem("projects")) == null) {
            $rootScope.projects = []
        } else {
            $rootScope.projects = JSON.parse(localStorage.getItem("projects"))
        }




        $scope.newProject = function () {
            if ($scope.projectName != "") {
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


        }
        $scope.remove = function (index) {
            $rootScope.projects.splice(index, 1);
            $scope.update($rootScope.projects)
            Storage.set('projects', JSON.stringify($rootScope.projects))
        }
        $scope.update = function (data) {
            localStorage.setItem('projects', JSON.stringify(data))
            Storage.set('projects', JSON.stringify(data))
        }

    });



}());
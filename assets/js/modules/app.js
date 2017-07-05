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


        var projects = []
        $scope.rate = 0;
        Storage.get('projects').then(function (p) {
            projects = JSON.parse(p)
            $rootScope.projects = JSON.parse(p)
             $scope.id = id
            $scope.rate = projects[id].rate
            $scope.label = projects[id].label
            $scope.lists = projects[id].boards
        });


        $scope.updateRate = function (v) {
            projects[id].rate = v
            $scope.rate = v
            console.log(projects)
            Storage.set('projects', JSON.stringify(projects))

        }
        $scope.updateLabel = function (v) {
            projects[id].label = v
            $scope.label = v
            Storage.set('projects', JSON.stringify(projects))
        }



        $scope.onDragComplete = function (index, parent, data, evt) {
            if (data != null) {

                console.log("drag success event:", evt.event);
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
                $scope.lists[parent].tasks.push({ name: "" + data + "", time: 0 });
                $scope.update($scope.lists)
            }
        }
        $scope.remove = function (parent, index) {
            $scope.lists[parent].tasks.splice(index, 1);
            $scope.update($scope.lists)
        }
        $scope.update = function (data) {
            projects[id].boards = data

            Storage.set('projects', JSON.stringify(projects))
        }

    });


    /** @ngInject */
    app.controller('HomeCtrl', function ($scope, $rootScope, $firebaseObject, $firebaseAuth, $location, $firebaseArray, Storage) {

        $rootScope.navbar = false
        $scope.authObj = $firebaseAuth();
        var firebaseUser = $scope.authObj.$getAuth();

        var projects = []
        Storage.get('projects').then(function (p) {
            $rootScope.projects = JSON.parse(p)

        });




        $scope.newProject = function (isValid) {

            if (isValid) {
                $rootScope.projects.push({
                    label: $scope.projectName,
                    rate: $scope.rate,
                    boards: [
                        {
                            "label": "Todo",
                            "tasks": [
                                {
                                    "name": "Task 1",
                                    "text": "Task 1 Text",
                                    "time": 0
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
                $scope.projectName == ""
                $scope.rate = ""
            }


        }
        $scope.remove = function (index) {
            $rootScope.projects.splice(index, 1);
            $scope.update($rootScope.projects)
            Storage.set('projects', JSON.stringify($rootScope.projects))
        }
        $scope.update = function (data) {

            Storage.set('projects', JSON.stringify(data))
        }

    });
    app.controller('InvCtrl', function ($scope, $rootScope,$routeParams, $firebaseAuth, $location, Storage) {
        Storage.get('projects').then(function (p) {
           
            $rootScope.projects = JSON.parse(p)
            $scope.id = $routeParams.project
            $scope.rate = $rootScope.projects[$scope.id ].rate
            $scope.label = $rootScope.projects[$scope.id ].label
            $scope.items = $rootScope.projects[$scope.id ].boards[2].tasks
            console.log( $scope.items)
        });

    })

    app.filter('time', function () {
        return function (time) {
            time = parseInt(time, 10);
            var h = Math.floor(time / 3600);
            var m = Math.floor((time % 3600) / 60);
            return h + "h" + (m >= 10 ? m : '0' + m);
        }
    });
    app.filter('to_min', function () {
        return function (time) {
            return Math.round(time / 60);
        }
    })
    app.filter('round', function () {
        return function (value) {
            return Math.round(value);
        }
    });

}());
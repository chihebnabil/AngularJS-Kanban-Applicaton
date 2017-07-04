
(function () {
    'use strict';
    /**
     *  Firebase Time Tracker Module
     */
    /** @ngInject */
    TRACKER.controller('TimeCtrl', function TimeCtrl($scope, $rootScope, $firebaseAuth, $location, Storage) {

        $rootScope.navbar = false
        // $scope.tasks = null;

        // Change icon when timer is started
        $scope.$watch('start', function (start) {
            Storage.set('start', start);
            if (chrome.browserAction) {

            }
        });
        Storage.get('projects').then(function (projects) {
            $scope.projects = JSON.parse(projects)
            console.log($scope.projects)

        });
        Storage.get('start').then(function (start) {
            $scope.loaded = true;
            $scope.start = start;
        });

        $scope.startTimer = function () {
            $scope.start = Date.now();

        };
        $scope.stopTimer = function () {
            $scope.start = false;
        };
        $scope.save = function () {
            $scope.projects[$scope.board].boards[1].tasks[$scope.task].time = parseInt($scope.projects[$scope.board].boards[1].tasks[$scope.task].time) + parseInt($scope.start);
  
            console.log("task time", $scope.projects[$scope.board].boards[1].tasks[$scope.task].time )
            
            $scope.start = false;

        };

        $scope.$watch('board', function (newVal) {
            // alert($scope.projects[$scope.board].boards[1].tasks)
            $scope.tasks = $scope.projects[$scope.board].boards[1].tasks;
        })


        // Link to dashboard
        $scope.dashboard = function () {
            if (chrome.tabs) {
                chrome.tabs.create({ url: chrome.extension.getURL('dashboard.html') });
            } else {
                window.location = "dashboard.html";
            }
        };
    }

    )


}());
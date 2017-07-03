
(function () {
    'use strict';
    /**
     *  Firebase Time Tracker Module
     */
    /** @ngInject */
    TRACKER.controller('TimeCtrl', function TimeCtrl($scope, $rootScope, $firebaseAuth, $location, Storage) {
        var vm = this;
        $rootScope.navbar = false

        // Change icon when timer is started
        $scope.$watch('start', function (start) {
            Storage.set('start', start);
            if (chrome.browserAction) {
                //  chrome.browserAction.setIcon({ path: "icon" + (start ? "-on" : "") + ".png" });
            }
        });

        Storage.get('start').then(function (start) {
            $scope.loaded = true;
            $scope.start = start;
        });

        $scope.startTimer = function () {
            $scope.start = Date.now();

        };

        $scope.resumeTimer = function () {

        };
        $scope.stopTimer = function () {
            $scope.start = false;
        };
        $scope.save = function () {

        };



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
(function () {
    'use strict';
    /**
     *  Firebase Time Tracker Module
     */

    var TRACKER = angular.module('TRACKER', ['ngRoute', 'firebase']);


    /** @ngInject */
    TRACKER.controller('TimeCtrl', function TimeCtrl($scope, $rootScope, $firebaseAuth, $location) {
        var vm = this;
        $rootScope.navbar = false

        // Change icon when timer is started
        $scope.$watch('start', function (start) {
            Storage.set('start', start);
            if (chrome.browserAction) {
              //  chrome.browserAction.setIcon({ path: "icon" + (start ? "-on" : "") + ".png" });
            }
        });

        $scope.startTimer = function () {
            $scope.start = Date.now();

        };

        $scope.resumeTimer = function () {
      
        };
        $scope.stopTimer = function () {
         
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
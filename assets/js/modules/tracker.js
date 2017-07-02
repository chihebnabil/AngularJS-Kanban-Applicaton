(function () {
    'use strict';
    /**
     *  Firebase Time Tracker Module
     */

    var TRACKER = angular.module('TRACKER', ['ngRoute', 'firebase', 'timer']);

   
    /** @ngInject */
    TRACKER.controller('TimeCtrl', function TimeCtrl($scope, $rootScope, $firebaseAuth, $location) {
        var vm = this;

        $scope.startTimer = function (deadline) {
            $scope.$broadcast('timer-start');
            $scope.timerRunning = true;
            $scope.deadlineMillis += deadline * 1000 * 60;
        };

        $scope.resumeTimer = function () {
            $scope.$broadcast('timer-resume');

            $scope.deadlineMillis = 0;
            $scope.timerRunning = false;
        };
        $scope.stopTimer = function () {
            $scope.$broadcast('timer-stop');

            //  $scope.deadlineMillis = 0;
            $scope.timerRunning = true;
        };

        $scope.$on('timer-tick', function (event, data) {
            if ($scope.timerRunning && data.millis >= $scope.deadlineMillis) {
                $scope.$apply($scope.timeOver);
            }
        });

    }

    )


}());
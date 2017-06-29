(function () {
    'use strict';
    /**
     *  Firebase Time Tracker Module
     */

    angular
        .module('TRACKER', ["ngRoute", "firebase"]);

    angular
        .module('TRACKER')
        .controller('TimeCtrl', TimeCtrl)
    function TimeCtrl($scope, $rootScope, $firebaseAuth, $location) {
    }




}());
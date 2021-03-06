(function () {
    'use strict';
    /**
     *  Firebase Auth Module
     */

    var AUTH = angular.module('AUTH', ["ngRoute", "firebase"]);

    /** @ngInject */
    AUTH.controller('AuthCtrl', function AuthCtrl($scope, $rootScope, $firebaseAuth, $location) {
        var vm = this;
        $scope.email = ""
        $scope.password = ""
        $scope.login = function () {
            $firebaseAuth().$signInWithEmailAndPassword($scope.email, $scope.password).then(function (firebaseUser) {
                console.log("Signed in as:", firebaseUser.uid);
                $location.path('/');
            }).catch(function (error) {
                console.error("Authentication failed:", error);
            });




        }
        $scope.register = function () {
            $firebaseAuth().$createUserWithEmailAndPassword($scope.email, $scope.password)
                .then(function (firebaseUser) {
                    console.log("User " + firebaseUser.uid + " created successfully!");
                    $location.path('/login');
                }).catch(function (error) {
                    console.error("Error: ", error);
                });

        }
        $scope.GoogleLogin = function () {
            $firebaseAuth().$signInWithPopup("google").then(function (result) {
                console.log("Signed in as:", result.user.uid);
                $location.path('/');
            }).catch(function (error) {
                console.error("Authentication failed:", error);
            });
        }

    }
    )

}());
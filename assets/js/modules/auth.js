(function () {
    'use strict';
    /**
     *  Firebase Auth Module
     */

    angular
        .module('AUTH', ["ngRoute", "firebase"]);
    angular
        .module('AUTH')
        .controller('AuthCtrl', AuthCtrl)

    /** @ngInject */
    function AuthCtrl($scope, $rootScope, $firebaseAuth, $location) {
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


}());
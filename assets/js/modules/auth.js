(function () {
    'use strict';
    /**
     *  Firebase Auth Module
     */

   

    /** @ngInject */
    AUTH.controller('AuthCtrl', function AuthCtrl($scope, $rootScope, $firebaseAuth, $location) {
        $scope.email = "chiheb.design@gmail.com"
        $scope.password = "12345678"
        $scope.authObj = $firebaseAuth();
        var firebaseUser = $scope.authObj.$getAuth();
        if (firebaseUser) {
            $location.path('/record');
        }
        $scope.login = function () {
            console.log('clicked login')
            $firebaseAuth().$signInWithEmailAndPassword($scope.email, $scope.password).then(function (firebaseUser) {
                console.log("Signed in as:", firebaseUser.uid);
                $location.path('/record');
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
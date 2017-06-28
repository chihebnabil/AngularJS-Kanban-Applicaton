(function () {
    'use strict';

    angular
        .module('app')
        .config(ConfigRoutes)

    /** @ngInject */
    function ConfigRoutes($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "templates/home.html"
            })
            .when("/project/:id", {
                templateUrl: "templates/project.html"
            })
             .when("/time", {
                templateUrl: "templates/time.html"
            })
            .when("/login", {
                templateUrl: "templates/login.html"
            })
    }

}());
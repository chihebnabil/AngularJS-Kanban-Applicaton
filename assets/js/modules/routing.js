(function () {
    'use strict';
    /**
     * Routing
     */


    ROUTING.config(ConfigRoutes);
    /** @ngInject */
    function ConfigRoutes($routeProvider, $compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);

        $routeProvider
            .when("/", {
                templateUrl: "templates/record.html"
            })
            .when("/project/:id", {
                templateUrl: "templates/project.html"
            })
            .when("/invoice/:project/:id", {
                templateUrl: "templates/invoice.html"
            })
            .when("/login", {
                templateUrl: "templates/login.html"
            })
            .when("/register", {
                templateUrl: "templates/register.html"
            })
            .when("/record", {
                templateUrl: "templates/record.html"
            })
            .otherwise({
                templateUrl: "templates/login.html"
            });
    }

}());
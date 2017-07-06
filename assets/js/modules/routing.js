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
            .when("/invoice/:project", {
                templateUrl: "templates/invoice.html",
                controller : "InvCtrl"
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
            .when("/settings", {
                templateUrl: "templates/settings.html"
            })
            .otherwise({
                templateUrl: "templates/login.html"
            });
    }

}());
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
                controller: "InvCtrl"
            })
            .when("/record", {
                templateUrl: "templates/record.html"
            })
            .when("/settings", {
                templateUrl: "templates/settings.html"
            })
            .when("/paypal-settings", {
                controller: "SettingsCtrl",
                templateUrl: "templates/paypal-settings.html"
            })
            .when("/paypal-fee-calculator", {
                controller: "SettingsCtrl",
                templateUrl: "templates/paypal-fee-calculator.html"
            })
            .otherwise({
                templateUrl: "templates/settings.html"
            });
    }

}());
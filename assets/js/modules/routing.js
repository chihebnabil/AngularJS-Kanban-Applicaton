(function () {
  
    /**
     * Routing
     */
 app.config(ConfigRoutes)

    /** @ngInject */
   function ConfigRoutes($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "templates/record.html"
            })
            .when("/project/:id", {
                templateUrl: "templates/project.html"
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
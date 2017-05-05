(function () {
    'use strict';

    angular
        .module('app')
        .factory('Factory', Factory)

    /** @ngInject */
    function Factory($http) {

        return {

            get : function() {
                return  $http.get("data.json")
                    
            }
        }

    }

}());
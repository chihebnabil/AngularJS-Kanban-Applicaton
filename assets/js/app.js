(function () {
    'use strict';

    angular
        .module('app', ['ngDraggable']);


    angular
        .module('app')
        .controller('MainCtrl', MainCtrl)

    /** @ngInject */
    function MainCtrl($scope, Factory) {

        Factory.get().then(function (response) {
            console.log("responce :", response.data)
            $scope.lists =   response.data;

        });



        $scope.onDragComplete = function (index, parent, data, evt) {
            //  console.log("drag success, data:", data);
            if (data != null) {
                console.log("drag success index, data:", index);
                $scope.lists[parent].people.splice(index, 1);
            }
        }
        $scope.onDropComplete = function (index, data, evt) {

            console.log("onDropComplete index, data:", index);
            console.log($scope.lists[0].people)
            if (data != null) {
                $scope.$apply(function () {
                    $scope.lists[index].people.push(data);
                })
            }

        }
        $scope.new = function (parent, data) {
            if (data != null) {
                console.log(parent)
                console.log(data)
                $scope.lists[parent].people.push({ name: "" + data + "" });

            }
        }

    }


}());
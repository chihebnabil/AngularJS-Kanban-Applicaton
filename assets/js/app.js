(function () {
    'use strict';

    angular
        .module('app', ['ngDraggable']);


    angular
        .module('app')
        .controller('MainCtrl', MainCtrl)

    /** @ngInject */
    function MainCtrl($scope) {
        $scope.lists = [
            {
                label: "Men",
                allowedTypes: ['man'],
                max: 4,
                people: [
                    { name: "Bob", type: "man" },
                    { name: "Charlie", type: "man" },
                    { name: "Dave", type: "man" }
                ]
            },
            {
                label: "Women",
                allowedTypes: ['woman'],
                max: 4,
                people: [
                    { name: "Alice", type: "woman" },
                    { name: "Eve", type: "woman" },
                    { name: "Peggy", type: "woman" }
                ]
            },
            {
                label: "People",
                allowedTypes: ['man', 'woman'],
                max: 6,
                people: [
                    { name: "Frank", type: "man" },
                    { name: "Mallory", type: "woman" },
                    { name: "Alex", type: "unknown" },
                    { name: "Oscar", type: "man" },
                    { name: "Wendy", type: "woman" }
                ]
            }
        ];

        $scope.onDragComplete = function (index,parent, data, evt) {
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
        $scope.new = function(parent,data){
            if (data != null) {
                console.log(parent)
                console.log(data)
                $scope.lists[parent].people.push({ name : ""+data+""});
               
        }
        }

    }


}());
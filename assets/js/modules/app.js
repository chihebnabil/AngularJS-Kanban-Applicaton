(function () {
    'use strict';


    /** @ngInject */
    app.controller('MainCtrl', function ($scope, $rootScope, $routeParams, $location, Storage) {

        $rootScope.navbar = true
        var id = $routeParams.id
        var projects = []

        $scope.rate = 0;
        Storage.get('projects').then(function (p) {
            projects = JSON.parse(p)
            $rootScope.projects = JSON.parse(p)
            $scope.id = id
            $scope.rate = projects[id].rate
            $scope.label = projects[id].label
            $scope.lists = projects[id].boards
        });
        Storage.get('settings').then(function (s) {
            $scope.settings = JSON.parse(s)
        })
        // Code editor config
        $scope.editorOptions = {
            lineWrapping: true,
            lineNumbers: true,
            htmlMode: true,
            mode: 'php'
        };

        // SHows The Modal when double click on any tasks
        $scope.task = { name: '', text: ' ' }
        $scope.editItem = function (parent, index) {
            $scope.showModal = true
            console.log($scope.task)
            $scope.task.name = $scope.lists[parent].tasks[index].name
            $scope.task.text = $scope.lists[parent].tasks[index].text
            // $scope.update($scope.lists)
        }
        $scope.editItemSave = function (data) {
            //    console.log(data[parent])
            //    data[parent].tasks[index].name = $scope.task.name
            //    data[parent].tasks[index].text = $scope.task.text
        }

        $scope.updateRate = function (v) {
            projects[id].rate = v
            $scope.rate = v
            console.log(projects)
            Storage.set('projects', JSON.stringify(projects))

        }
        $scope.updateLabel = function (v) {
            projects[id].label = v
            $scope.label = v
            Storage.set('projects', JSON.stringify(projects))
        }



        $scope.onDragComplete = function (index, parent, data, evt) {
            if (data != null) {

                console.log("drag success event:", evt.event);
                $scope.lists[parent].tasks.splice(index, 1);
            }
        }
        $scope.onDropComplete = function (index, data, evt) {

            console.log("onDropComplete index, data:", index);
            if (data != null) {
                $scope.$apply(function () {
                    $scope.lists[index].tasks.push(data);
                    $scope.update($scope.lists)
                })
            }

        }
        $scope.new = function (parent, data) {
            if (data != null) {
                $scope.lists[parent].tasks.push({ name: "" + data + "", time: 0, qty: 1 });
                $scope.update($scope.lists)
            }
        }
        $scope.remove = function (parent, index) {
            $scope.lists[parent].tasks.splice(index, 1);
            $scope.update($scope.lists)
        }
        $scope.update = function (data) {
            projects[id].boards = data

            Storage.set('projects', JSON.stringify(projects))
        }

    });


    /** @ngInject */
    app.controller('HomeCtrl', function ($scope, $rootScope, $location, Storage) {

        $rootScope.navbar = false


        var projects = []
        Storage.get('projects').then(function (p) {
            $rootScope.projects = JSON.parse(p)

        });




        $scope.newProject = function (isValid) {

            if (isValid) {
                $rootScope.projects.push({
                    label: $scope.projectName,
                    rate: $scope.rate,
                    boards: [
                        {
                            "label": "Todo",
                            "tasks": [
                                {
                                    "name": "Task 1",
                                    "text": "Task 1 Text",
                                    "qty": 1,
                                    "time": 0
                                }


                            ]
                        },
                        {
                            "label": "Doing",
                            "tasks": [


                            ]
                        },
                        {
                            "label": "Done",
                            "tasks": [



                            ]
                        }
                    ]
                })
                $scope.update($rootScope.projects)
                $scope.projectName == ""
                $scope.rate = ""
            }


        }
        $scope.remove = function (index) {
            $rootScope.projects.splice(index, 1);
            $scope.update($rootScope.projects)
            Storage.set('projects', JSON.stringify($rootScope.projects))
        }
        $scope.update = function (data) {

            Storage.set('projects', JSON.stringify(data))
        }

    });
    app.controller('InvCtrl', function ($scope, $filter, $rootScope, $routeParams, $location, $window, Storage) {
        Storage.get('settings').then(function (s) {
            $scope.settings = JSON.parse(s)
            $scope.invoice = {
                number: 123,
                paid_at: null,
                currency: "DZD",
                paid: false,
                data: new Date(),
                taxRate: 0.19,
                from:
                { name: $scope.settings.full_name, address: $scope.settings.address, details: $scope.settings.details }
                ,
                to:
                { name: "Martin A. Selby", address: "450 Cinnamon Lane", details: "San Antonio, TX 78202", email: "exemple@exemple.com" }
                ,
                products: [
                    {
                        name: "test", quantity: 2,
                        unit_price: {
                            currency: $scope.settings.currency,
                            value: "5"
                        }
                    }
                ]
            }
        })


        $scope.qty = 1;
        $scope.items = []
        $scope.getpaid = false;
        $scope.showLink = function () {
            if ($scope.getpaid) {
                $scope.getpaid = false;
            } else {
                $scope.getpaid = true;
            }

        }
        $scope.print = function () {
            $window.print()
        }

        Storage.get('projects').then(function (p) {

            $rootScope.projects = JSON.parse(p)
            $scope.id = $routeParams.project
            $scope.invoice.number = $scope.id
            $scope.rate = $rootScope.projects[$scope.id].rate

            $scope.label = $rootScope.projects[$scope.id].label

            $scope.items = $rootScope.projects[$scope.id].boards[2].tasks
            for (var i = 0; i < $scope.items.length; i++) {
                var element = $scope.items[i];
                element.price = $filter('round')(element.time / 3600 * $scope.rate)

            }


        });



        $scope.getTotal = function () {
            var total = 0;

            for (var i = 0; i < $scope.items.length; i++) {
                var element = $scope.items[i];

                total += (element.price * element.qty)
            }
            return total;
        };

        $scope.add = function () {
            $scope.items.push({ name: $scope.item.name, time: 0, qty: $scope.q, price: $scope.q * $scope.r })
            console.log($scope.items)
        }
        $scope.remove = function (index) {
            $scope.items.splice(index, 1)
        }
    })
    app.controller('SettingsCtrl', function ($scope, $rootScope, $window, Storage) {


        $scope.calculator = function () {
            $scope.sum = 100;
            $scope.$watch('sum', function (sum) {
                $scope.PayPalRate = 0.049
                $scope.PayPalFee = (sum * $scope.PayPalRate) + 0.3
                $scope.MoneyWillGet = sum - $scope.PayPalFee
                $scope.MoneyShouldDemand = (sum + 0.3) / (1 - $scope.PayPalRate)
                switch (true) {
                    case (sum >= 0 && sum <= 3000):
                        //alert(sum2);
                        //alert(sum- fee);
                        break;
                    case (sum > 3000 && sum <= 10000):
                        $scope.PayPalRate = 0.044;


                        break;
                    case (sum > 10000 && sum <= 100000):
                        $scope.PayPalRate = 0.042;


                        break;
                    case (sum > 100000):
                        $scope.PayPalRate = 0.039;


                        break;

                }
            })
        }


        Storage.get('settings').then(function (s) {
            $scope.settings = JSON.parse(s)
        })
        $scope.save = function () {

            Storage.set('settings', JSON.stringify($scope.settings))
            $window.history.back();
        }

        // Link to dashboard
        $scope.dashboard = function () {
            if (chrome.tabs) {
                chrome.tabs.create({ url: chrome.extension.getURL('dashboard.html') });
            } else {
                window.location = "dashboard.html";
            }
        };
    })


    // Filters
    app.filter('time', function () {
        return function (time) {
            time = parseInt(time, 10);
            var h = Math.floor(time / 3600);
            var m = Math.floor((time % 3600) / 60);
            return h + "h" + (m >= 10 ? m : '0' + m);
        }
    });
    app.filter('to_min', function () {
        return function (time) {
            return Math.round(time / 60);
        }
    })
    app.filter('round', function () {
        return function (value) {
            return Math.round(value);
        }
    });
    app.filter('round2dec', function () {
        return function (value) {
            return Math.round(value * 100) / 100;
        }
    });

}());
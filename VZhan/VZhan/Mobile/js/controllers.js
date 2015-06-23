'use strict';

/* Controllers */

var wxControllers = angular.module("wxControllers", []);


wxControllers.controller('ScrollCtrl', ['$scope', '$routeParams', 'Scroll',
    function ($scope, $routeParams, Scroll) {

        // 
        // 'Scroll' screen
        // 
        var scrollItems = [];

        for (var i = 1; i <= 100; i++) {
            scrollItems.push('Item ' + i);
        }

        $scope.scrollItems = scrollItems;

        $scope.bottomReached = function () {
            /* global alert: false; */
            alert('Congrats you scrolled to the end of the list!');
        };

    }

]);



wxControllers.controller('HomeCtrl', ['$scope', '$routeParams', 'Home',
    function ($scope, $routeParams, Home) {

 
    }

]);



wxControllers.controller('ContactCtrl', ['$scope', '$routeParams', 'Contact',
    function ($scope, $routeParams, Contact) {


        $scope.chatUsers = [
        { name: 'Carlos  Flowers', online: true },
        { name: 'Byron Taylor', online: true },
        { name: 'Jana  Terry', online: true },
        { name: 'Darryl  Stone', online: true },
        { name: 'Fannie  Carlson', online: true },
        { name: 'Holly Nguyen', online: true },
        { name: 'Bill  Chavez', online: true },
        { name: 'Veronica  Maxwell', online: true },
        { name: 'Jessica Webster', online: true },
        { name: 'Jackie  Barton', online: true },
        { name: 'Crystal Drake', online: false },
        { name: 'Milton  Dean', online: false },
        { name: 'Joann Johnston', online: false },
        { name: 'Cora  Vaughn', online: false },
        { name: 'Nina  Briggs', online: false },
        { name: 'Casey Turner', online: false },
        { name: 'Jimmie  Wilson', online: false },
        { name: 'Nathaniel Steele', online: false },
        { name: 'Aubrey  Cole', online: false },
        { name: 'Donnie  Summers', online: false },
        { name: 'Kate  Myers', online: false },
        { name: 'Priscilla Hawkins', online: false },
        { name: 'Joe Barker', online: false },
        { name: 'Lee Norman', online: false },
        { name: 'Ebony Rice', online: false }
        ];
    }

]);


wxControllers.controller('OverlayCtrl', ['$scope', '$routeParams', 'Overlay',
    function ($scope, $routeParams, Overlay) {

        // Fake text i used here and there.
        $scope.lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel explicabo, aliquid eaque soluta nihil eligendi adipisci error, illum corrupti nam fuga omnis quod quaerat mollitia expedita impedit dolores ipsam. Obcaecati.';

    }

]);

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



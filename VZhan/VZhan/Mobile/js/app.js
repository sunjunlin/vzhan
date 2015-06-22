'use strict';

/* App Module */

var wxApp = angular.module('wxApp', [
  'ngRoute',
  'mobile-angular-ui',
  'wxControllers',
  'wxFilters',
   'ipCookie',
  'wxServices'
]);

wxApp.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/home', {    //MUI
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        }).

        when('/home', {    //MUI
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        })
        .otherwise({
            redirectTo: '/home'
        });
      $routeProvider.when('/scroll', { templateUrl: 'partials/scroll.html', reloadOnSearch: false });
      $routeProvider.when('/toggle', { templateUrl: 'partials/toggle.html', reloadOnSearch: false });
      $routeProvider.when('/tabs', { templateUrl: 'partials/tabs.html', reloadOnSearch: false });
      $routeProvider.when('/accordion', { templateUrl: 'partials/accordion.html', reloadOnSearch: false });
      $routeProvider.when('/overlay', { templateUrl: 'partials/overlay.html', reloadOnSearch: false });
      $routeProvider.when('/forms', { templateUrl: 'partials/forms.html', reloadOnSearch: false });
      $routeProvider.when('/dropdown', { templateUrl: 'partials/dropdown.html', reloadOnSearch: false });
      $routeProvider.when('/touch', { templateUrl: 'partials/touch.html', reloadOnSearch: false });
      $routeProvider.when('/swipe', { templateUrl: 'partials/swipe.html', reloadOnSearch: false });
      $routeProvider.when('/drag', { templateUrl: 'partials/drag.html', reloadOnSearch: false });
      $routeProvider.when('/drag2', { templateUrl: 'partials/drag2.html', reloadOnSearch: false });
      $routeProvider.when('/carousel', { templateUrl: 'partials/carousel.html', reloadOnSearch: false });
      //$routeProvider.when('/', { templateUrl: 'home.html', reloadOnSearch: false });

  }]);

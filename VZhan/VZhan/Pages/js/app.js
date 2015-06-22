'use strict';

/* App Module */

var wxApp = angular.module('wxApp', [
  'ngRoute',
    'mobile-angular-ui', //引进的mobile ui,控制下拉刷新等效果
  'wxControllers',
  'wxFilters',
   'ipCookie',
  'wxServices'
]);

wxApp.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/Announcement/state/:state', {
            templateUrl: 'partials/announcement.html',
            controller: 'AnnouncementCtrl'
        }).
        when('/Announcement/:id', {
            templateUrl: 'partials/announcementDetail.html',
            controller: 'AnnouncementDetailCtrl'
        }).
        when('/ProcessList', {
            templateUrl: 'partials/processList.html',
            controller: 'ProcessListCtrl'
        }).
        //when('/ProcessListDetail/:id/Category/:category', {
        //    templateUrl: 'partials/processListDetail.html',
        //    controller: 'ProcessListDetailCtrl'
        //}).
        when('/ProcessListDetail/WID/:WID', {
            templateUrl: 'partials/processListDetail.html',
            controller: 'ProcessListDetailCtrl'
        }).
        when('/ProcessListDetail/PIID/:PIID', {
            templateUrl: 'partials/processListDetail.html',
            controller: 'ProcessListDetailCtrl'
        }).
        when('/ProcessStatus/:id', {
            templateUrl: 'partials/processListStatus.html',
            controller: 'ProcessStatusCtrl'
        }).
        when('/Authentication/?code=:code&state=:state', {
            templateUrl: 'partials/Authentication.html',
            controller: 'AuthenticationCtrl'
        }).

        when('/ProcessResult/:id/WorkFlowNumber/:workFlowNumber/Title/:title', {
            templateUrl: 'partials/result.html',
            controller: 'ProcessResultCtrl'
        }).
        when('/ProcessResult/:id', {
            templateUrl: 'partials/result.html',
            controller: 'ProcessResultCtrl'
        }).
        when('/PeoplePicker', {
            templateUrl: 'partials/sidebarRight.html',
            controller: 'PeoplePickerCtrl'
        }).
        when('/Scroll', {    //MUI
            templateUrl: 'partials/scroll.html',
            controller: 'ScrollCtrl'
        })
        .otherwise({
            redirectTo: '/ProcessList'
        });
  }]);

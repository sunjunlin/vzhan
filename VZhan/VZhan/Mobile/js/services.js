'use strict';

/* Services */

var wxServices = angular.module('wxServices', ['ngResource']);
  

wxServices.factory('Scroll', ['$resource', '$http',
  function ($resource, $http) {

      var Scroll = {};
     
      return Scroll;



  }]);


wxServices.factory('Home', ['$resource', '$http',
  function ($resource, $http) {

      var Home = {};

      return Home;



  }]);


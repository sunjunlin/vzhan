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

wxServices.factory('Contact', ['$resource', '$http',
  function ($resource, $http) {

      var Contact = {};

      return Contact;



  }]);

wxServices.factory('Overlay', ['$resource', '$http',
  function ($resource, $http) {

      var Overlay = {};

      return Overlay;



  }]);

wxServices.factory('Drag', ['$resource', '$http',
    function ($resource, $http) {

        var Drag = {};

        return Drag;



    }]);

wxServices.factory('Swipe', ['$resource', '$http',
    function ($resource, $http) {

        var Swipe = {};

        return Swipe;



    }]);


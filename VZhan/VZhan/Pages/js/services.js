'use strict';

/* Services */

var wxServices = angular.module('wxServices', ['ngResource']);
var userIdKey = "userId";
var userIdVal = "01503020";

wxServices.factory('Announcement', ['$resource', '$http',
  function ($resource,$http) {
      var announcement = {};
      announcement.query = function () {
          $resource('json/:announcementId.json', {}, {
              query: {
                  method: 'GET',
                  params: {
                      announcementId: 'announcements'
                  },
                  isArray: true
              }
          });
      };

      announcement.Authenticate = function () {
          var baseUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc02cb1b8b09bbd18&redirect_uri=Authentication&response_type=code&scope=snsapi_base#wechat_redirect';

          return $http.get(baseUrl);
      };

      return announcement;
  }]);

wxServices.factory('ProcessList', ['$resource', '$http',
  function ($resource, $http) {
      var ProcessList = {};

      //var urlBase = '/api/WorkFlow/GetTaskList/' + userIdVal;


      ProcessList.query = function (pageSize, pageCount) {
          var urlBase = '/api/WorkFlow/GetTaskList/' + userIdVal + '?pageNum=' + pageCount + '&pagesize=' + pageSize;
          return $http.get(urlBase);
      };


      //var urlGetReviewedTaskList = '/api/WorkFlow/GetReviewedTaskList/' + userIdVal;

      ProcessList.queryGetReviewedTaskList = function (pageSize, pageCount) {
          var urlGetReviewedTaskList = '/api/WorkFlow/GetReviewedTaskList/' + userIdVal + '?pageNum=' + pageCount + '&pagesize=' + pageSize;

          return $http.get(urlGetReviewedTaskList);
      };






      var urlApprove = '/api/WorkFlow/InformationTransferApprove/' + userIdVal;


      ProcessList.Approve = function (wid,comment) {
          var urlArg = urlApprove;
        //  return $http.post(urlArg, comment);

          return $http({
              method: "post",
              url: urlArg,
              data: { "WorkItemId": wid, "Comment": comment }

          });
      };


      var urlRollBack = '/api/WorkFlow/InformationTransferReject/' + userIdVal;
 

      ProcessList.RollBack = function (wid, comment) {
          var urlArg = urlRollBack;
        //  return $http.post(urlArg, {'':comment});
            return $http({
              method: "post",
              url: urlArg,    
              data: { "WorkItemId": wid, "Comment": comment }

          });

      };            

      return ProcessList;
  }]);


 

wxServices.factory('ProcessStatus', ['$resource', '$http',
  function ($resource, $http) {
     
      var ProcessStatus = {};
 
      var urlDetail = '/api/WorkFlow/GetWFCommentList/?piid=';
      ProcessStatus.queryDetail = function (piid) {
          var urlArg = urlDetail + piid;
          return $http.get(urlArg);
      };

      return ProcessStatus;



  }]);

wxServices.factory('ProcessResult', ['$resource', '$http',
    function ($resource, $http) {
        var ProcessResult = {};
        var urlApprove = '/api/WorkFlow/InformationTransferApprove/' + userIdVal + '?wid=';


        ProcessResult.Approve = function (wid) {
            var urlArg = urlApprove + wid;
            return $http.post(urlArg);
        };


        return ProcessResult;


  }]);

wxServices.factory('OAuth2',['$http','ipCookie',
    function($http,ipCookie){
        var service = {};
        var _redirectUrl = 'http://weixinqy.tclcom.com/MobilePage/OAuth2.html';
        var _appid = 'wxc02cb1b8b09bbd18';//TODO
        var _wxUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?';
        var _cookieKey = 'wxToken';
        
        var _generateUrl = function (state) {
           var url = _wxUrl;
           url += "appid=" + _appid;
           url += "&redirect_uri=" + _redirectUrl;
           url += "&response_type=code&scope=snsapi_base";
           url += '&state='+encodeURI(state);
           url += '#wechat_redirect';
           console.log(url);
           return  url;
        }
        service.auth = function (state){
            var url = _generateUrl(state);
            alert(url);
            window.location.href = encodeURI(url);
        }
        
        service.getToken = function() {
            var token = ipCookie(_cookieKey);
            return token;
        }
        
        return  service;
    }]);

wxServices.factory('ProcessListDetail', ['$resource', '$http',
  function ($resource, $http) {

      var ProcessListDetail = {};
      var urlDetail = '/api/WorkFlow/GetInformationTransfer/?wid=';

      ProcessListDetail.queryDetail = function (wid) {
          var urlArg = urlDetail + wid;
          return $http.get(urlArg);
      };



      var urlDetailAttach = '/api/WorkFlow/GetAttachementsList/?piid=';
      ProcessListDetail.queryDetailAttach = function (piid) {
          var urlArg = urlDetailAttach + piid;
          return $http.get(urlArg);
      };
      return ProcessListDetail;
 


  }]);


wxServices.factory('Scroll', ['$resource', '$http',
  function ($resource, $http) {

      var Scroll = {};

      return Scroll;



  }]);


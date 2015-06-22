'use strict';

/* Controllers */

var wxControllers = angular.module("wxControllers", []);

wxControllers.controller('AnnouncementCtrl', ['$scope', '$location', '$routeParams', 'Announcement', 'OAuth2',
    function ($scope, $location, $routeParams, Announcement, OAuth2) {
        var token = OAuth2.getToken();
        if (token == null || token == undefined) {
            var state = $routeParams.state;
            state += "@@" + 'http://weixinqy.tclcom.com/MobilePage/@/Announcement/state/11';//add redirect url for Auth2
            OAuth2.auth(state);
        } else {
            alert("userId = " + token.UserId);
            $scope.annoucements = Announcement.query();
            $scope.showDetail = function (index) {
                var model = $scope.annoucements[index];
                var url = "/Announcement/" + model.id;
                $location.path(url);
            };
        }

    }]);

wxControllers.controller('AnnouncementDetailCtrl', ['$scope', '$routeParams', 'Announcement',
    function ($scope, $routeParams, Announcement) {
        $scope.announcementDetail = Announcement.get(
            {
                announcementId: $routeParams.id
            }, function (nnouncementDetail) {
                //special goes here
            });
    }]);



wxControllers.controller('ProcessListCtrl', ['$scope', '$location', 'ProcessList',
    function ($scope, $location, ProcessList) {
        $scope.pageSize = 10;

        //if (!localStorage.getItem(userIdKey)) {
        //    localStorage.setItem(userIdKey, userIdVal);
        //}


        $scope.status;
        $scope.processlists = [];

        $scope.pageCount =   $scope.processlists==null? 0 : $scope.processlists.length;

        $scope.Pending = 'Pending';
        $scope.Reviewed = 'Reviewed';
        //var currentList = $scope.Pending;
        $scope.currentList == $scope.Pending;

        getProcessList($scope.Pending, $scope.pageSize, $scope.pageCount);

        function getProcessList(category, pageSize, pageCount) {
            if (category == $scope.Pending) {
                ProcessList.query(pageSize, pageCount).success(function (custs) {
                    if (custs.length > 0) {
                        for (var i = 0; i < custs.length; i++) {
                            $scope.processlists.push(custs[i]);
                        }

                    }
                    else
                    {
                        alert('没有更多数据');

                    }
                    $scope.currentList = $scope.Pending;

                }).error(function (error) {
                    $scope.status = 'Unable to load customer data: ' + error.message;
                    alert($scope.status);
                });
            }
            else if (category == $scope.Reviewed) {
                ProcessList.queryGetReviewedTaskList(pageSize, pageCount).success(function (custs) {
                    if (custs.length > 0) {
                
                        for (var i = 0; i < custs.length; i++) {
                            $scope.processlists.push(custs[i]);
                        }

                        $scope.currentList = $scope.Reviewed;
                    } else {
                        alert('没有更多数据');

                    }

                }).error(function (error) {
                    $scope.status = 'Unable to load customer data: ' + error.message;
                    alert($scope.status);
                });
            }

        }
        $scope.showDetail = function (index) {
            var model = $scope.processlists[index];
            var url = "/ProcessListDetail/WID/" + model.WorkItemID
            $location.path(url);
        }



        //$scope.showDetail = function (index) {
        //    var model = $scope.processlists[index];
        //    var url = "/ProcessListDetail/" + model.WorkItemID + "/Category/" + currentList;
        //    $location.path(url);
        //}


        $scope.toggle = function (category) {
            // var cate = (category == "待审流程" ? "Pending" : "Reviewed");
            $scope.currentList = category;
            $scope.processlists = [];
            $scope.pageCount = $scope.processlists == null ? 0 : $scope.processlists.length;
            getProcessList(category, $scope.pageSize, $scope.pageCount);

        };

        $scope.bottomReached = function () {
            /* global alert: false; */
            $scope.pageCount = $scope.processlists == null ? 0 : $scope.processlists.length;
            getProcessList($scope.currentList, $scope.pageSize, $scope.pageCount);
        };


        $scope.loadMore = function () {
            /* global alert: false; */
            $scope.pageCount = $scope.processlists == null ? 0 : $scope.processlists.length;
            getProcessList($scope.currentList, $scope.pageSize, $scope.pageCount);
        };
    }


]);

wxControllers.controller('ProcessListDetailCtrl', ['$scope', '$location', '$routeParams', '$sce', 'ProcessListDetail',
    function ($scope, $location, $routeParams, $sce, ProcessListDetail) {

        $scope.processListDetail = {};
        $scope.processListDetailAttachment = {};
        $scope.status;
        $scope.Comments = '';
        $scope.IsShowControl = ($routeParams.category == "待审流程" ? true : false);

        getProcess($routeParams.WID);
        function getProcess(wid) {

            ProcessListDetail.queryDetail(wid).success(function (custs) {
         
                    $scope.processListDetail = custs;
          

                $scope.deliberatelyTrustDangerousSnippet = function () {

                    return $sce.trustAsHtml($scope.processListDetail.Specify);
                };

                getProcessAttach($scope.processListDetail.ProcInsID);

            }).error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
                alert($scope.status);
            });
        }


        function getProcessAttach(piid) {

            ProcessListDetail.queryDetailAttach(piid).success(function (custs) {
                if (custs.length > 0) {
                    $scope.processListDetailAttachment = custs;
                }

            }).error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
                alert($scope.status);
            });
        }



        $scope.showProcessStatus = function (piid) {
            var url = "/ProcessStatus/" + piid;
            $location.path(url);

        }

        $scope.Approve = function () {

            var wid = $routeParams.id;
            var comments = $scope.Comments;

            ProcessList.Approve(wid, comments)
              .success(function () {

                  $scope.status = 'Approve success.';
                  var title = "流程已批准";//TODO               
                  var url = "/ProcessResult/" + wid + "/WorkFlowNumber/" + $scope.processListDetail.ITNO + "/Title/" + title;
                  $location.path(url);

              })
              .error(function (error) {
                  $scope.status = 'Unable to Approve : ' + error.message;
              });


        }


        $scope.RollBack = function () {
            var wid = $routeParams.id;
            var comments = $scope.Comments;

            ProcessList.RollBack(wid, comments)
              .success(function () {

                  $scope.status = 'RollBack success.';
                  var title = "流程已驳回";//TODO               
                  var url = "/ProcessResult/" + wid + "/WorkFlowNumber/" + $scope.processListDetail.ITNO + "/Title/" + title;
                  $location.path(url);
              })
              .error(function (error) {
                  $scope.status = 'Unable to Approve : ' + error.message;
              });

        }
    }
]);


wxControllers.controller('ProcessStatusCtrl', ['$scope', '$routeParams', 'ProcessStatus',
    function ($scope, $routeParams, ProcessStatus) {

        $scope.processStatusDetail = {};
        $scope.status;
        getProcessStatus($routeParams.id);
        function getProcessStatus(piid) {

            ProcessStatus.queryDetail(piid).success(function (custs) {

                $scope.processStatusDetail = custs;
                $scope.processStatusDetail.userName = '孙俊林';//TODO
                var date = new Date();
                $scope.processStatusDetail.date = date;            //获取日期与时间 

                console.log(custs);

            }).error(function (error) {

                $scope.status = 'Unable to load customer data: ' + error.message;
                alert($scope.status);
            });
        }

    }

]);



wxControllers.controller('ProcessResultCtrl', ['$scope', '$routeParams', 'ProcessResult',
    function ($scope, $routeParams, ProcessResult) {

        $scope.processResultDetail = {};
        getProcessResult();
        function getProcessResult() {

            $scope.processResultDetail.WorkFlowNumber = $routeParams.workFlowNumber;
            var date = new Date();
            $scope.processResultDetail.Date = date;       //获取日期与时间 
            $scope.processResultDetail.Title = $routeParams.title;
        }

        $scope.GoBack = function () {

            history.back();
        }
    }

]);



wxControllers.controller('PeoplePickerCtrl', ['$scope', '$routeParams', 'PeoplePicker',
    function ($scope, $routeParams, PeoplePicker) {

        $scope.processResultDetail = {};
        getProcessResult();
        function getProcessResult() {

            $scope.processResultDetail.WorkFlowNumber = $routeParams.workFlowNumber;
            var date = new Date();
            $scope.processResultDetail.Date = date;       //获取日期与时间 
            $scope.processResultDetail.Title = $routeParams.title;
        }

        $scope.GoBack = function () {

            history.back();
        }
    }

]);

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

        $scope.loadMore = function () {
            /* global alert: false; */
            alert('load more of the list!');
        };


    }

]);


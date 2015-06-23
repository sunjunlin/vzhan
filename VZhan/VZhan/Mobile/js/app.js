'use strict';

/* App Module */

var wxApp = angular.module('wxApp', [
  'ngRoute',
  'mobile-angular-ui',
  'wxControllers',
  'wxFilters',
   'ipCookie',
  'wxServices',
    'mobile-angular-ui.gestures',
    'mobile-angular-ui.core.sharedState'
]);

wxApp.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/home', {    //MUI
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl',
            reloadOnSearch: false
        })    
        .otherwise({
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl',
            reloadOnSearch: false
        });
       $routeProvider.when('/scroll', {
          templateUrl: 'partials/scroll.html',
          controller: 'ScrollCtrl',
          reloadOnSearch: false
      });
      $routeProvider.when('/toggle', {
          templateUrl: 'partials/toggle.html',
          reloadOnSearch: false
      });
      $routeProvider.when('/tabs', {
          templateUrl: 'partials/tabs.html',
          reloadOnSearch: false
      });
      $routeProvider.when('/accordion', { templateUrl: 'partials/accordion.html', reloadOnSearch: false });

      $routeProvider.when('/overlay', {
          templateUrl: 'partials/overlay.html',
          controller: 'OverlayCtrl',
          reloadOnSearch: true
      });
      $routeProvider.when('/forms', { templateUrl: 'partials/forms.html', reloadOnSearch: false });
      $routeProvider.when('/dropdown', { templateUrl: 'partials/dropdown.html', reloadOnSearch: false });
      $routeProvider.when('/touch', { templateUrl: 'partials/touch.html', reloadOnSearch: false });
      $routeProvider.when('/swipe', { templateUrl: 'partials/swipe.html', reloadOnSearch: false });
      $routeProvider.when('/drag', { templateUrl: 'partials/drag.html', reloadOnSearch: false });
      $routeProvider.when('/drag2', { templateUrl: 'partials/drag2.html', reloadOnSearch: false });
      $routeProvider.when('/carousel', { templateUrl: 'partials/carousel.html', reloadOnSearch: false });
 

  }]);



wxApp.run(function ($transform) {
    window.$transform = $transform;
});


// 
// `$touch example`
// 

wxApp.directive('toucharea', ['$touch', function ($touch) {
    // Runs during compile
    return {
        restrict: 'C',
        link: function ($scope, elem) {
            $scope.touch = null;
            $touch.bind(elem, {
                start: function (touch) {
                    $scope.touch = touch;
                    $scope.$apply();
                },

                cancel: function (touch) {
                    $scope.touch = touch;
                    $scope.$apply();
                },

                move: function (touch) {
                    $scope.touch = touch;
                    $scope.$apply();
                },

                end: function (touch) {
                    $scope.touch = touch;
                    $scope.$apply();
                }
            });
        }
    };
}]);

//
// `$drag` example: drag to dismiss
//
wxApp.directive('dragToDismiss', function ($drag, $parse, $timeout) {
    return {
        restrict: 'A',
        compile: function (elem, attrs) {
            var dismissFn = $parse(attrs.dragToDismiss);
            return function (scope, elem) {
                var dismiss = false;

                $drag.bind(elem, {
                    transform: $drag.TRANSLATE_RIGHT,
                    move: function (drag) {
                        if (drag.distanceX >= drag.rect.width / 4) {
                            dismiss = true;
                            elem.addClass('dismiss');
                        } else {
                            dismiss = false;
                            elem.removeClass('dismiss');
                        }
                    },
                    cancel: function () {
                        elem.removeClass('dismiss');
                    },
                    end: function (drag) {
                        if (dismiss) {
                            elem.addClass('dismitted');
                            $timeout(function () {
                                scope.$apply(function () {
                                    dismissFn(scope);
                                });
                            }, 300);
                        } else {
                            drag.reset();
                        }
                    }
                });
            };
        }
    };
});

//
// Another `$drag` usage example: this is how you could create 
// a touch enabled "deck of cards" carousel. See `carousel.html` for markup.
//
wxApp.directive('carousel', function () {
    return {
        restrict: 'C',
        scope: {},
        controller: function () {
            this.itemCount = 0;
            this.activeItem = null;

            this.addItem = function () {
                var newId = this.itemCount++;
                this.activeItem = this.itemCount === 1 ? newId : this.activeItem;
                return newId;
            };

            this.next = function () {
                this.activeItem = this.activeItem || 0;
                this.activeItem = this.activeItem === this.itemCount - 1 ? 0 : this.activeItem + 1;
            };

            this.prev = function () {
                this.activeItem = this.activeItem || 0;
                this.activeItem = this.activeItem === 0 ? this.itemCount - 1 : this.activeItem - 1;
            };
        }
    };
});

wxApp.directive('carouselItem', function ($drag) {
    return {
        restrict: 'C',
        require: '^carousel',
        scope: {},
        transclude: true,
        template: '<div class="item"><div ng-transclude></div></div>',
        link: function (scope, elem, attrs, carousel) {
            scope.carousel = carousel;
            var id = carousel.addItem();

            var zIndex = function () {
                var res = 0;
                if (id === carousel.activeItem) {
                    res = 2000;
                } else if (carousel.activeItem < id) {
                    res = 2000 - (id - carousel.activeItem);
                } else {
                    res = 2000 - (carousel.itemCount - 1 - carousel.activeItem + id);
                }
                return res;
            };

            scope.$watch(function () {
                return carousel.activeItem;
            }, function () {
                elem[0].style.zIndex = zIndex();
            });

            $drag.bind(elem, {
                //
                // This is an example of custom transform function
                //
                transform: function (element, transform, touch) {
                    // 
                    // use translate both as basis for the new transform:
                    // 
                    var t = $drag.TRANSLATE_BOTH(element, transform, touch);

                    //
                    // Add rotation:
                    //
                    var Dx = touch.distanceX,
                        t0 = touch.startTransform,
                        sign = Dx < 0 ? -1 : 1,
                        angle = sign * Math.min((Math.abs(Dx) / 700) * 30, 30);

                    t.rotateZ = angle + (Math.round(t0.rotateZ));

                    return t;
                },
                move: function (drag) {
                    if (Math.abs(drag.distanceX) >= drag.rect.width / 4) {
                        elem.addClass('dismiss');
                    } else {
                        elem.removeClass('dismiss');
                    }
                },
                cancel: function () {
                    elem.removeClass('dismiss');
                },
                end: function (drag) {
                    elem.removeClass('dismiss');
                    if (Math.abs(drag.distanceX) >= drag.rect.width / 4) {
                        scope.$apply(function () {
                            carousel.next();
                        });
                    }
                    drag.reset();
                }
            });
        }
    };
});

wxApp.directive('dragMe', ['$drag', function ($drag) {
    return {
        controller: function ($scope, $element) {
            $drag.bind($element,
              {
                  //
                  // Here you can see how to limit movement 
                  // to an element
                  //
                  transform: $drag.TRANSLATE_INSIDE($element.parent()),
                  end: function (drag) {
                      // go back to initial position
                      drag.reset();
                  }
              },
              { // release touch when movement is outside bounduaries
                  sensitiveArea: $element.parent()
              }
            );
        }
    };
}]);
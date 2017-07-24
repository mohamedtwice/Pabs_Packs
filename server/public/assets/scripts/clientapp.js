var myApp = angular.module('myApp', ['ngRoute', 'chart.js', 'ui.bootstrap']);
/// Routes ///

myApp.directive('head', ['$rootScope', '$compile',
  function($rootScope, $compile) {
    return {
      restrict: 'E',
      link: function(scope, elem) {
        var html = '<link rel="stylesheet" ng-repeat="(routeCtrl, cssUrl) in routeStyles" ng-href="{{cssUrl}}" />';
        elem.append($compile(html)(scope));
        scope.routeStyles = {};
        $rootScope.$on('$routeChangeStart', function(e, next, current) {
          if (current && current.$$route && current.$$route.css) {
            if (!angular.isArray(current.$$route.css)) {
              current.$$route.css = [current.$$route.css];
            }
            angular.forEach(current.$$route.css, function(sheet) {
              delete scope.routeStyles[sheet];
            });
          }
          if (next && next.$$route && next.$$route.css) {
            if (!angular.isArray(next.$$route.css)) {
              next.$$route.css = [next.$$route.css];
            }
            angular.forEach(next.$$route.css, function(sheet) {
              scope.routeStyles[sheet] = sheet;
            });
          }
        });
      }
    };
  }
]); // to switch out style sheets accordingly between routes

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: '/views/home.html',
      controller: "LoginController",
      css: "style.css"
    })
    .when('/register', {
      templateUrl: '/views/register.html',
      controller: "LoginController",
      css: "style.css"
    })
    .when('/dashboard', {
      templateUrl: '/views/dashboard.html',
      controller: "DashboardController as dc",
      css: "dashboard.css"
    })
    .when('/inventory', {
      templateUrl: '/views/inventory.html',
      controller: "InventoryController as ic",
      css: "inventory.css"
    })
    .when('/tracker', {
      templateUrl: '/views/tracker.html',
      controller: "TrackerController as tc",
      css: "tracker.css"
    })
    .otherwise({
      redirectTo: 'home'
    });
}]);

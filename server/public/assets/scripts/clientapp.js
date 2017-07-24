var myApp = angular.module('myApp', ['ngRoute', 'chart.js', 'ui.bootstrap']);
/// Routes ///

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: '/views/home.html',
      controller: "LoginController"
    })
    .when('/register', {
      templateUrl: '/views/register.html',
      controller: "LoginController"
    })
    .when('/user', {
      templateUrl: '/views/user.html',
      controller: "UserController"
    })
    .when('/dashboard', {
      templateUrl: '/views/dashboard.html',
      controller: "DashboardController"
    })
    .when('/inventory', {
      templateUrl: '/views/inventory.html',
      controller: "InventoryController"
    })
    .when('/events', {
      templateUrl: '/views/events.html',
      controller: "EventsController"
    })
    .otherwise({
      redirectTo: 'home'
    });
}]);

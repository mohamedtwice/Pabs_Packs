var myApp = angular.module('myApp', ['ngRoute']);
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
      controller: "UserController"
    })
    .when('/inventory', {
      templateUrl: '/views/inventory.html',
      controller: "InventoryController"
    })
    .otherwise({
      redirectTo: 'home'
    })
}]);

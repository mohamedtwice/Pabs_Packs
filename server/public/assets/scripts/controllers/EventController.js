myApp.controller('EventController', function(eventService, $modal, $route) {

  // myApp.controller('EventController', ['$http', '$location', function($http, $location) {
  // myApp.controller('LoginController', ['$scope', '$http', '$location', function($scope, $http, $location) {

  console.log('in event controller');
  var vm = this;

  vm.getEvents = function() {
    console.log('in getEvents');
    eventService.getEvents().then(function() {
      vm.events = eventService.eventsData;
      console.log(vm.events);
    });
  }; // end getInventory

  vm.openAddNew = function(size) {
    console.log('in add new');
    var modalInstance = $modal.open({
      animation: vm.animationsEnabled,
      templateUrl: 'eventModal.html',
      controller: 'EventModalController as ec',
      size: size
    });
  }

  vm.deleteEvent = function(id) {
    console.log('in deleteEvent');
    console.log(id);
    eventService.deleteEvent(id).then(function(data) {
      console.log('data is:', data);
    });
    $route.reload();
    console.log('id is:', id);
  }; // end delete




}); // end createEvent

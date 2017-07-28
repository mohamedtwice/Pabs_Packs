myApp.controller('EventController', function(eventService, $modal, $route) {

  // myApp.controller('EventController', ['$http', '$location', function($http, $location) {
  // myApp.controller('LoginController', ['$scope', '$http', '$location', function($scope, $http, $location) {

  console.log('in event controller');
  var vm = this;

  // sort ordering (Ascending or Descending). Set true for desending
  vm.column = 'event';
  vm.reverse = false;
  vm.orderByField = 'event';
  vm.reverseSort = false;
  vm.animationsEnabled = true;

  // called on header click
  vm.sortColumn = function(col) {
    vm.column = col;
    if (vm.reverse) {
      vm.reverse = false;
      vm.reverseclass = 'arrow-up';
    } else {
      vm.reverse = true;
      vm.reverseclass = 'arrow-down';
    }
  };
  // remove and change class
  vm.sortClass = function(col) {
    if (vm.column == col) {
      if (vm.reverse) {
        return 'arrow-down';
      } else {
        return 'arrow-up';
      }
    } else {
      return '';
    }
  };

  vm.getEvents = function() {
    console.log('in getEvents');
    eventService.getEvents().then(function() {
      vm.events = eventService.eventsData;
      console.log(vm.events);
    });
  }; // end getInventory

  vm.deleteEvent = function(id) {
    console.log('in deleteEvent');
    console.log(id);
    eventService.deleteEvent(id).then(function(data) {
      console.log('data is:', data);
    });
    $route.reload();
    console.log('id is:', id);
  }; // end delete


  vm.createEvent = function() {
    console.log('in createEvent');

    var newEvent = {
      date: vm.event_date,
      time: vm.event_time,
      partner_id: vm.partner_id,
      event_type: vm.event_type,
      packs_made: vm.packs_made,
      packs_promised: vm.packs_promised,
      comments: vm.comments
    };

    console.log(newEvent);
    eventService.postEvent(newEvent).then(function() {});
    $route.reload();
  }; // end postInventoryItem

  vm.updateDonationEvents = function(id) {
    console.log('in updateDonationEvents');
    console.log(id);
    var updatedEvent = {
      date: vm.event_dateUpdate,
      time: vm.event_timeUpdate,
      partner_id: vm.partner_idUpdate,
      packs_promised: vm.packs_promisedUpdate,
      comments: vm.commentsUpdate
    };
    console.log(updatedEvent);
    eventService.updateEvents(id, updatedEvent).then(function() {
      swal({
        type: 'success',
        title: 'Event Updated!',
        timer: 2000
      }).then(
        function() {},
        // handling the promise rejection
        function(dismiss) {
          if (dismiss === 'timer') {
            console.log('I was closed by the timer');
          }
        });
    });
    $route.reload();
  };

  vm.updatePackEvents = function(id) {
    console.log('in updatePackEvents');
    console.log(id);

    var updatedEvent = {
      date: vm.event_dateUpdate,
      time: vm.event_timeUpdate,
      partner_id: vm.partner_idUpdate,
      packs_made: vm.packs_madeUpdate,
      comments: vm.commentsUpdate
    };
    console.log(updatedEvent);
    eventService.updateEvents(id, updatedEvent).then(function() {
      swal({
        type: 'success',
        title: 'Event Updated!',
        timer: 2000
      }).then(
        function() {},
        // handling the promise rejection
        function(dismiss) {
          if (dismiss === 'timer') {
            console.log('I was closed by the timer');
          }
        });
    });
    $route.reload();
  };

}); // end

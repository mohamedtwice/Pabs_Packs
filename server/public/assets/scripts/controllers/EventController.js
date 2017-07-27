myApp.controller('EventController', function(eventService, $modal, $route) {

  console.log('in event controller');
  var vm = this;

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


}); // end createEvent

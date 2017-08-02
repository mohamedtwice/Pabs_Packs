myApp.controller('EventModalController', function(EventService, PartnerService, $modalInstance, $route) {
  console.log('in EventModalController');
  var vm = this;

  vm.isCollapsed = true;

  vm.cancel = function() {
    $modalInstance.dismiss('cancel');
  }; // close modal button

  vm.reload = function() {
    $route.reload();
  } //  reloads page after new item has been added to show immediately

  vm.getEvents = function() {
    console.log('in getEvents');
    EventService.getEvents().then(function() {
      vm.events = EventService.eventsData;
      console.log(vm.events);
    });
  }; // end getEvents

  vm.getEvents();

  vm.postEvent = function() {
    var partnerName = vm.partner_name;
    if (vm.partner === undefined) {
      vm.partner = partnerName;
    }
    console.log('in createEvent');
    var newEvent = {
      date: vm.event_date,
      time: vm.event_time,
      partner: vm.partner,
      event_type: vm.event_type,
      packs_made: vm.packs_made,
      packs_promised: vm.packs_promised,
      comments: vm.comments
    }
    console.log(newEvent);
    if (vm.event_date === undefined) {
      swal({
        type: 'warning',
        title: 'Date was not entered!',
        timer: 2000
      }).then(
        function() {},
        // handling the promise rejection
        function(dismiss) {
          if (dismiss === 'timer') {
            console.log('I was closed by the timer');
          }
        })
    } else {
      EventService.postEvent(newEvent).then(function() {
        swal({
          type: 'success',
          title: 'New event added!',
          timer: 2000
        }).then(
          function() {},
          // handling the promise rejection
          function(dismiss) {
            if (dismiss === 'timer') {
              console.log('I was closed by the timer');
            }
          })
      });
      $route.reload();
    }
  } // end createEvent

  vm.postPartner = function() {
    var newPartner = {
      partner_name: vm.partner_name,
      partner_phone: vm.partner_phone,
      partner_contact: vm.partner_contact,
      partner_address: vm.partner_address
    }
    console.log(newPartner);
    // cancels function from running if all fields are empty
    if (newPartner.partner_name === undefined && newPartner.partner_phone === undefined && newPartner.partner_address === undefined && newPartner.partner_contact === undefined) {
      console.log('{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}');
      return;
    }
    if (newPartner.partner_name || newPartner.partner_phone || newPartner.partner_address || newPartner.partner_contact === undefined) {
      swal({
        type: 'warning',
        title: "You're missing a vendor category!",
        timer: 2000
      }).then(
        function() {},
        // handling the promise rejection
        function(dismiss) {
          if (dismiss === 'timer') {
            console.log('I was closed by the timer');
          }
        }) // end sweetAlert
    }
    // else {
    console.log("I'm here!");
    PartnerService.postPartner(newPartner).then(function() {

    }); // end sweetAlert
    // }
  } // end postVendor

}).filter('unique', function() {
  return function(collection, keyname) {
    var output = [],
      keys = [];
    angular.forEach(collection, function(item) {
      var key = item[keyname];
      if (keys.indexOf(key) === -1) {
        keys.push(key);
        output.push(item);
      }
    });
    return output;
  };
});

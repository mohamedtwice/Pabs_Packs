myApp.controller('EventModalController', function(EventService, PartnerService, $modalInstance, $route) {
  console.log('in EventModalController');
  var vm = this;

  vm.isCollapsed = true;

  vm.cancel = function() {
    $modalInstance.dismiss('cancel');
  }; // close modal button

  vm.selectMade = function() {
    vm.madeDisabled = !vm.madeDisabled;
    console.log(vm.madeDisabled);
  }

  vm.selectPromised = function() {
    vm.promisedDisabled = !vm.promisedDisabled;
    console.log(vm.promisedDisabled);
  }

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
    EventService.postEvent(newEvent).then(function() {
      swal({
        type: 'success',
        title: 'New event added!',
        timer: 2500
      }).then(
        function() {},
        // handling the promise rejection
        function(dismiss) {
          if (dismiss === 'timer') {
            console.log('I was closed by the timer');
          }
        })
    });
    vm.cancel();
    $route.reload();
    // getEvents doesn't post new event to page immediately
    // vm.getEvents();
  } // end createEvent

  vm.getPartner = function() {
    console.log('Getting vendors');
    PartnerService.getPartner().then(function() {
      vm.partners = PartnerService.partnerData;
      console.log(vm.partners);
    });
  } // end getInventory

  vm.getPartner();

  vm.postPartner = function() {
    var newPartner = {
      partner_name: vm.partner_name,
      partner_phone: vm.partner_phone,
      partner_contact: vm.partner_contact,
      partner_address: vm.partner_address
    }
    console.log(newPartner);
    // stops function from running if all fields are empty
    if (newPartner.partner_name === undefined && newPartner.partner_phone === undefined && newPartner.partner_address === undefined && newPartner.partner_contact === undefined) {
      console.log('{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}');
      return;
    }
    console.log("I'm here!");
    PartnerService.postPartner(newPartner).then(function() {

    });
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

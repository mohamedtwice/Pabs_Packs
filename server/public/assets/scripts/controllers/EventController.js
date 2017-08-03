myApp.controller('EventController', ['EventService', '$filter', '$modal', '$route', '$http', '$location', function(EventService, $filter, $modal, $route, $http, $location) {
  console.log('in event controller');
  var vm = this;
  console.log('checking user');
  $http.get('/user').then(function(response) {
    if (response.data.username) {
      // user has a curret session on the server
      vm.userName = response.data.username;
      console.log('User Data: ', vm.userName);
    } else {
      // user has no session, bounce them back to the login page
      $location.path("/home");
    }
  });

  // sort ordering (Ascending or Descending). Set true for desending
  vm.column = 'event_date';
  vm.reverse = false;
  vm.orderByField = 'event_date';
  vm.reverseSort = false;
  vm.animationsEnabled = true;
  vm.now = '';
  vm.numPerPage = 10;
  vm.currentPage = 1;
  vm.donationList = [];
  vm.pastList = [];
  vm.packList = [];

  vm.pageChanged = function() {
    console.log('Page changed to: ' + vm.currentPage);
  }; // logs in the console that pagination has occurred

  // called on header click
  vm.sortColumn = function(col) {
    console.log('In sortColumn');
    vm.column = col;
    if (vm.reverse) {
      vm.reverse = false;
      vm.reverseclass = 'arrow-up';
    } else {
      vm.reverse = true;
      vm.reverseclass = 'arrow-down';
    }
  } // sorts event tracker

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
  }

  vm.selectButton = function(id) {
    vm.selectedButton = !vm.selectedButton;
    console.log(vm.selectedButton);
  }

  vm.loadPage = function() {
    console.log('in loadPage');
    vm.getEvents();
    vm.getTotalPacks();
  }

  vm.getTotalPacks = function() {
    console.log('in getTotalPacks');
    EventService.getEvents().then(function() {
      vm.events = EventService.eventsData;
    });
    vm.getEvents();
  }; // end getTotalPacks

  // vm.getTotals = function(event) {
  //   if (events) {
  //     event.packs_needed = event.packs_made * event.packs_promised;
  //     vm.invoiceCount += event.quantity;
  //     vm.invoiceTotal += event.total;
  //   }
  // }

  vm.getEvents = function() {
    console.log('in getEvents');
    EventService.getEvents().then(function() {
      vm.events = EventService.eventsData;
      console.log(vm.events);
      var currentTime = new Date();
      var currentList1 = vm.events.filter(function(a) {
        return a.event_date > currentTime;
      });
      var currentList2 = vm.events.filter(function(e) {
        return e.event_date > currentTime;
      });
      var packedList = currentList1.filter(function(b) {
        return b.event_type == 'Packing';
      });
      var oldList = vm.events.filter(function(c) {
        return c.event_date < currentTime;
      });
      var updatedList = currentList2.filter(function(d) {
        return d.event_type == 'Donation';
      });
      vm.pastList = oldList;
      vm.packList = packedList;
      vm.donationList = updatedList;
      console.log(vm.packList);
      console.log(vm.pastList);
      console.log(vm.donationList);

      vm.getTotals = function(event) {
        console.log(event);
        if (events) {
          event.packs_needed = event.packs_made * event.packs_promised;
          console.log(event.packs_needed);
        }
      };
    });
  }; // end getEvents

  vm.openAddNew = function(size) {
    console.log('in add new');
    var modalInstance = $modal.open({
      animation: vm.animationsEnabled,
      templateUrl: 'eventModal.html',
      controller: 'EventModalController as ec',
      size: size
    });
  } // end openAddNew

  vm.deleteEvent = function(id) {
    console.log('in deleteEvent');
    console.log(id);
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false
    }).then(function() {
      console.log('in remove');
      EventService.deleteEvent(id);
      $route.reload();
      swal(
        'Deleted!',
        'Your item has been deleted.',
        'success'
      )
    }, function(dismiss) {
      // dismiss can be 'cancel', 'overlay',
      // 'close', and 'timer'
      if (dismiss === 'cancel') {
        swal(
          'Cancelled',
          'Your file is safe :)',
          'error'
        )
      }
    }) // end sweet alert
  }; // end delete

  vm.createEvent = function() {
    console.log('in createEvent');
    var newEvent = {
      date: vm.event_date,
      time: vm.event_time,
      partner_name: vm.partner_name,
      event_type: vm.event_type,
      packs_made: vm.packs_made,
      packs_promised: vm.packs_promised,
      comments: vm.comments
    };
    console.log(newEvent);
    EventService.postEvent(newEvent).then(function() {});
    vm.getEvents();
  }; // end createEvent

  // update Donation Events
  vm.updateDonationEvents = function(events) {
    var id = events.id;
    console.log('in updateDonationEvents');
    if (vm.event_dateUpdate !== events.event_date) {
      if (vm.event_dateUpdate === undefined) {
        vm.event_dateUpdate = events.event_date;
      } else {
        vm.event_dateUpdate = vm.event_dateUpdate;
      }
    }
    if (vm.event_timeUpdate !== events.event_time) {
      if (vm.event_timeUpdate === undefined) {
        vm.event_timeUpdate = events.event_time;
      }
    } else {
      vm.event_timeUpdate = vm.event_timeUpdate;
    }
    if (vm.partner_nameUpdate !== events.partner_name) {
      if (vm.partner_nameUpdate === undefined) {
        vm.partner_nameUpdate = events.partner_name;
      } else {
        vm.partner_nameUpdate = vm.partner_nameUpdate;
      }
    }
    if (vm.packs_promisedUpdate !== events.packs_promised) {
      if (vm.packs_promisedUpdate === undefined) {
        vm.packs_promisedUpdate = events.packs_promised;
      } else {
        vm.packs_promisedUpdate = vm.packs_promisedUpdate;
      }
    }
    if (vm.packs_madeUpdate !== events.packs_made) {
      if (vm.packs_madeUpdate === undefined) {
        vm.packs_madeUpdate = events.packs_made;
      } else {
        vm.packs_madeUpdate = vm.packs_madeUpdate;
      }
    }
    if (vm.commentsUpdate !== events.comments) {
      if (vm.commentsUpdate === undefined) {
        vm.commentsUpdate = events.comments;
      } else {
        vm.commentsUpdate = vm.commentsUpdate;
      }
    }
    console.log(id);
    var updatedEvent = {
      id: id,
      date: vm.event_dateUpdate,
      time: vm.event_timeUpdate,
      partner_name: vm.partner_nameUpdate,
      packs_made: vm.packs_madeUpdate,
      packs_promised: vm.packs_promisedUpdate,
      comments: vm.commentsUpdate
    };
    console.log(updatedEvent);
    EventService.updateDonationEvents(updatedEvent).then(function() {
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
      vm.getEvents();
    });
  } // end updateDonationEvents

  vm.updatePackEvents = function(events) {
    var id = events.id;
    console.log('in updatePackEvents');
    console.log(events);
    if (vm.event_dateUpdate !== events.event_date) {
      if (vm.event_dateUpdate === undefined) {
        vm.event_dateUpdate = events.event_date;
      } else {
        vm.event_dateUpdate = vm.event_dateUpdate;
      }
    }
    if (vm.event_timeUpdate !== events.event_time) {
      if (vm.event_timeUpdate === undefined) {
        vm.event_timeUpdate = events.event_time;
      } else {
        vm.event_timeUpdate = vm.event_timeUpdate;
      }
    }
    if (vm.partner_nameUpdate !== events.partner_name) {
      if (vm.partner_nameUpdate === undefined) {
        vm.partner_nameUpdate = events.partner_name;
      } else {
        vm.partner_nameUpdate = vm.partner_nameUpdate;
      }
    }
    if (vm.packs_promisedUpdate !== events.packs_promised) {
      if (vm.packs_promisedUpdate === undefined) {
        vm.packs_promisedUpdate = events.packs_promised;
      } else {
        vm.packs_promisedUpdate = vm.packs_promisedUpdate;
      }
    }
    if (vm.packs_madeUpdate !== events.packs_made) {
      if (vm.packs_madeUpdate === undefined) {
        vm.packs_madeUpdate = events.packs_made;
      } else {
        vm.packs_madeUpdate = vm.packs_madeUpdate;
      }
    }
    if (vm.commentsUpdate !== events.comments) {
      if (vm.commentsUpdate === undefined) {
        vm.commentsUpdate = events.comments;
      } else {
        vm.commentsUpdate = vm.commentsUpdate;
      }
    }
    console.log(id);
    var updatedEvent = {
      id: id,
      date: vm.event_dateUpdate,
      time: vm.event_timeUpdate,
      partner_name: vm.partner_nameUpdate,
      packs_made: vm.packs_madeUpdate,
      packs_promised: vm.packs_promisedUpdate,
      comments: vm.commentsUpdate
    };
    console.log(updatedEvent);
    EventService.updatePackEvents(updatedEvent).then(function() {
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
    }); // end call to service
    vm.getEvents();
  }; // end updatePackEvents

  // Needed Packs function
  vm.getPackTotals = function() {
    console.log('in getNeededPacks');
    EventService.getPackTotals().then(function() {
      vm.packTotals = EventService.packTotalsData;
      var packsData = EventService.packTotalsData;
      vm.neededPacks = [packsData.needed];
      vm.packsMade = [packsData.made];
      vm.packsDonated = [packsData.donated];
    }); // end EVentService.getNeededPacks
  }; // end neededPacks
  vm.getPackTotals();

}].filter('unique', function() {
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
}));

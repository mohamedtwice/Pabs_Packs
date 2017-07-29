myApp.controller('EventModalController', function(EventService, $modalInstance, $route) {
  console.log('in EventModalController');
  var vm = this;

  vm.cancel = function() {
    $modalInstance.dismiss('cancel');
  }; // close modal button

  vm.reload = function() {
    $route.reload();
  } //  reloads page after new item has been added to show immediately

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
      EventService.createEvent(newEvent).then(function() {
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

})

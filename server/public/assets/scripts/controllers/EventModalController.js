myApp.controller('EventModalController', function(EventService, $modalInstance, $route) {
  console.log('in EventModalController');
  var vm = this;

  vm.cancel = function() {
    $modalInstance.dismiss('cancel');
  }; // close modal button

  vm.reload = function() {
    $route.reload();
  } //  reloads page after new item has been added to show immediately

  vm.today = function() {
    vm.dt = new Date();
  };
  vm.today();

  vm.clear = function () {
    vm.dt = null;
  };

  vm.toggleMin = function() {
    vm.minDate = vm.minDate ? null : new Date();
  };
  vm.toggleMin();

  vm.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    vm.opened = true;
  };

  vm.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  vm.formats = ['MM/dd/yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  vm.format = vm.formats[0];

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 2);
  vm.events =
    [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];

  vm.getDayClass = function(date, mode) {
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);
      for (var i=0;i<vm.events.length;i++){
        var currentDay = new Date(vm.events[i].date).setHours(0,0,0,0);
        if (dayToCheck === currentDay) {
          return vm.events[i].status;
        }
      }
    }
    return '';
  };

  vm.postEvent = function() {
    console.log('in createEvent');
    var newEvent = {
      date: vm.event_date,
      time: vm.event_time,
      partner_id: vm.partner_id,
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

})

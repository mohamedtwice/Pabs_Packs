myApp.controller('AnnualGoalModalController', function(AnnualgoalService, $modalInstance, $route) {
  console.log('in AnnualGoalModalController');
  var vm = this;

  vm.isCollapsed = true;

  vm.cancel = function() {
    $modalInstance.dismiss('cancel');
  }; // close modal button

  vm.getAnnualgoal = function() {
    console.log('in getAnnualgoal');
    AnnualgoalService.getAnnualgoal().then(function() {
      vm.annualgoal = AnnualgoalService.annualgoalData;
      console.log(vm.annualgoal);
    });
  }; // end getAnnualgoal

  vm.getAnnualgoal();

  vm.addnewgoal = function() {
    console.log('in addnewgoal');
    var newGoal = {
      year: vm.year,
      annual_goal: vm.annual_goal
    };
    console.log(newGoal);
    AnnualgoalService.addnewgoal(newGoal).then(function() {
      swal({
        type: 'success',
        title: 'New goal added!',
        timer: 2500
      }).then(
        function() {},
        // handling the promise rejection
        function(dismiss) {
          if (dismiss === 'timer') {
            console.log('I was closed by the timer');
          }
        })
    }); // end sweetAlert
    vm.cancel();
    $route.reload();
  }; // end addnewgoal

});

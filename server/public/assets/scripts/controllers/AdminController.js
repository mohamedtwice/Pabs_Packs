myApp.controller('AdminController', function(vendorService, annualgoalService, $modal, $route) {

  console.log('in vendor controller');
  var vm = this;


  //// ALL GETS

  vm.getInfo = function() {
    console.log('in getInfo');
    vm.getVendors();
    vm.getAnnualgoal();
  }; // end getInfo


  vm.getAnnualgoal = function() {
    console.log('in getAnnualgoal');
    annualgoalService.getAnnualgoal().then(function() {
      vm.annualgoal = annualgoalService.annualgoalData;
      console.log(vm.annualgoal);
    });
  }; // end getAnnualgoal

  vm.getVendors = function() {
    console.log('in getVendors');
    vendorService.getVendors().then(function() {
      vm.vendors = vendorService.vendorsData;
      console.log(vm.vendors);
    });
  }; // end getVendors


  /// ALL EDITS


  vm.editgoals = function(goal) {
    console.log('in editgoals');
    vm.current = goal;
    console.log(goal);
  }; // end editgoals
  vm.current = {};




  /// ALL POSTS


  vm.addnewvendor = function() {
    console.log('in addnewgoal');
    var newVendor = {
      vendor_name: vm.vendor_name,
      vendor_phone: vm.vendor_phone,
      vendor_email: vm.vendor_email,
      vendor_address: vm.vendor_address
    };

    console.log(newVendor);
    vendorService.addnewvendor(newVendor).then(function() {
      $route.reload();
    });
  }; // end addnewgoal


  vm.addnewgoal = function() {
    console.log('in addnewgoal');
    var newGoal = {
      year: vm.year,
      annual_goal: vm.annual_goal
    };
    console.log(newGoal);
    annualgoalService.addnewgoal(newGoal).then(function() {
      $route.reload();
    });
  }; // end addnewgoal


}); // end vendor controller

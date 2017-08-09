myApp.controller('AdminController', ['EventtypeService', 'PartnerService', 'VendorService', 'AnnualgoalService', '$modal', '$route', '$http', '$location', function(EventtypeService, PartnerService, VendorService, AnnualgoalService, $modal, $route, $http, $location) {

  var vm = this;

  $http.get('/user').then(function(response) {
    console.log('checking user');
    if (response.data.username) {
      // user has a curret session on the server
      vm.userName = response.data.username;
      console.log('User Data: ', vm.userName);
    } else {
      // user has no session, bounce them back to the login page
      $location.path("/home");
    }
  });

  vm.selectedButton = false;
  vm.animationsEnabled = true;

  vm.selectButton = function(id) {
    vm.selectedButton = !vm.selectedButton;
    console.log(vm.selectedButton);
  } // to disable other edit buttons on click

  /// --------------------------------------------------------------------------------------------------------------

  //// ALL GETS

  vm.openVendorModal = function(size) {
    var modalInstance = $modal.open({
      animation: vm.animationsEnabled,
      templateUrl: 'vendorModal.html',
      controller: 'VendorModalController as vc',
      size: size
    });
  } // opens modal to add new item

  vm.openPartnerModal = function(size) {
    var modalInstance = $modal.open({
      animation: vm.animationsEnabled,
      templateUrl: 'partnerModal.html',
      controller: 'PartnerModalController as pc',
      size: size
    });
  } // opens modal to add new item

  vm.openAnnualGoalModal = function(size) {
    var modalInstance = $modal.open({
      animation: vm.animationsEnabled,
      templateUrl: 'annualGoalModal.html',
      controller: 'AnnualGoalModalController as agc',
      size: size
    });
  } // opens modal to add new item

  vm.getInfo = function() {
    console.log('in getInfo');
    vm.getVendors();
    vm.getAnnualgoal();
    vm.getPartners();
  }; // end getInfo

  vm.getAnnualgoal = function() {
    console.log('in getAnnualgoal');
    AnnualgoalService.getAnnualgoal().then(function() {
      vm.annualgoal = AnnualgoalService.annualgoalData;
      console.log(vm.annualgoal);
    });
  }; // end getAnnualgoal

  vm.getVendors = function() {
    console.log('in getVendors');
    VendorService.getVendors().then(function() {
      vm.vendors = VendorService.vendorData;
      console.log(vm.vendors);
    });
  }; // end getVendors

  vm.getPartners = function() {
    console.log('in getPartners');
    PartnerService.getPartner().then(function() {
      vm.partners = PartnerService.partnerData;
      console.log(vm.partners);
    });
  }; // end getPartner

  /// --------------------------------------------------------------------------------------------------------------

  /// ALL EDITS

  vm.updatePartners = function(partners) {
    console.log('in updatePartners');
    console.log(partners.id);
    if (vm.partner_nameUpdate !== partners.partner_name) {
      if (vm.partner_nameUpdate === undefined) {
        vm.partner_nameUpdate = partners.partner_name;
      } else {
        vm.partner_nameUpdate = vm.partner_nameUpdate;
      }
    }
    if (vm.partner_contactUpdate !== partners.partner_contact) {
      if (vm.partner_contactUpdate === undefined) {
        vm.partner_contactUpdate = partners.partner_contact;
      } else {
        vm.partner_contactUpdate = vm.partner_contactUpdate;
      }
    }
    if (vm.partner_phoneUpdate !== partners.partner_phone) {
      if (vm.partner_phoneUpdate === undefined) {
        vm.partner_phoneUpdate = partners.partner_phone;
      } else {
        vm.partner_phoneUpdate = vm.partner_phoneUpdate;
      }
    }
    if (vm.partner_addressUpdate !== partners.partner_address) {
      if (vm.partner_addressUpdate === undefined) {
        vm.partner_addressUpdate = partners.partner_address;
      } else {
        vm.partner_addressUpdate = vm.partner_addressUpdate;
      }
    }
    var updatedPartner = {
      id: partners.id,
      partner_name: vm.partner_nameUpdate,
      partner_contact: vm.partner_contactUpdate,
      partner_phone: vm.partner_phoneUpdate,
      partner_address: vm.partner_addressUpdate,
    };
    console.log(updatedPartner);
    PartnerService.updatePartner(updatedPartner).then(function() {
      swal({ //sweet alert
        type: 'success',
        title: 'Partner Updated!',
        timer: 2500
      }).then(
        function() {},
        // handling the promise rejection
        function(dismiss) {
          if (dismiss === 'timer') {
            console.log('I was closed by the timer');
          }
        })
    }); // end then
    $route.reload();
  };

  vm.updateVendor = function(vendors) {
    console.log('in updatePartners');
    console.log(vendors.id);
    if (vm.vendor_nameUpdate !== vendors.vendor_name) {
      if (vm.vendor_nameUpdate === undefined) {
        vm.vendor_nameUpdate = vendors.vendor_name;
      } else {
        vm.vendor_nameUpdate = vm.vendor_nameUpdate;
      }
    }
    if (vm.vendor_emailUpdate !== vendors.vendor_email) {
      if (vm.vendor_emailUpdate === undefined) {
        vm.vendor_emailUpdate = vendors.vendor_email;
      } else {
        vm.vendor_emailUpdate = vm.vendor_emailUpdate;
      }
    }
    if (vm.vendor_phoneUpdate !== vendors.vendor_phone) {
      if (vm.vendor_phoneUpdate === undefined) {
        vm.vendor_phoneUpdate = vendors.vendor_phone;
      } else {
        vm.vendor_phoneUpdate = vm.vendor_phoneUpdate;
      }
    }
    if (vm.vendor_addressUpdate !== vendors.vendor_address) {
      if (vm.vendor_addressUpdate === undefined) {
        vm.vendor_addressUpdate = vendors.vendor_address;
      } else {
        vm.vendor_addressUpdate = vm.vendor_addressUpdate;
      }
    }
    var updatedVendor = {
      id: vendors.id,
      vendor_name: vm.vendor_nameUpdate,
      vendor_email: vm.vendor_emailUpdate,
      vendor_phone: vm.vendor_phoneUpdate,
      vendor_address: vm.vendor_addressUpdate,
    };
    console.log(updatedVendor);
    VendorService.updateVendor(updatedVendor).then(function() {
      swal({ //sweet alert
        type: 'success',
        title: 'Vendor Updated!',
        timer: 2500
      }).then(
        function() {},
        // handling the promise rejection
        function(dismiss) {
          if (dismiss === 'timer') {
            console.log('I was closed by the timer');
          }
        })
    }); // end then
    $route.reload();
  };

  vm.updateAnnualGoal = function(goals) {
    console.log(goals);
    console.log('in updateGoal');
    // if item is undefined, send original ng-model
    if (vm.yearUpdate !== goals.year) {
      if (vm.yearUpdate === undefined) {
        vm.yearUpdate = goals.year;
      } else {
        vm.yearUpdate = vm.yearUpdate;
      }
    }
    if (vm.annual_goalUpdate !== goals.annual_goal) {
      if (vm.annual_goalUpdate === undefined) {
        vm.annual_goalUpdate = goals.annual_goal;
      } else {
        vm.annual_goalUpdate = vm.annual_goalUpdate;
      }
    }
    console.log(vm.yearUpdate);
    var updatedGoal = {
      id: goals.id,
      yearUpdate: vm.yearUpdate,
      annual_goalUpdate: vm.annual_goalUpdate,
    }
    console.log(updatedGoal);
    AnnualgoalService.updateAnnualGoal(updatedGoal).then(function() {
      swal({ //sweet alert
        type: 'success',
        title: 'Goal Updated!',
        timer: 2500
      }).then(
        function() {},
        // handling the promise rejection
        function(dismiss) {
          if (dismiss === 'timer') {
            console.log('I was closed by the timer');
          }
        })
    }); // end then
    $route.reload();
  }; // end updateProperties

  vm.current = {};

  /// --------------------------------------------------------------------------------------------------------------

  // DELETE FUNCTIONS

  vm.deletePartner = function(id) {
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
      PartnerService.deletePartner(id);
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

  vm.deleteVendor = function(id) {
    console.log('in deletePartner');
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
      VendorService.deleteVendor(id);
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

}]).filter('phoneNumber', function() {
  return function(number) {
    if (!number) {
      return '';
    }
    number = String(number);
    number = number.replace(/[^0-9]*/g, '');
    var formattedNumber = number;
    var c = (number[0] == '1') ? '1' : '';
    number = number[0] == '1' ? number.slice(1) : number;
    var area = number.substring(0, 3);
    var front = number.substring(3, 6);
    var end = number.substring(6, 10);
    if (front) {
      formattedNumber = (c + "(" + area + ") " + front);
    }
    if (end) {
      formattedNumber += ("-" + end);
    }
    return formattedNumber;
  };
}); // end controller

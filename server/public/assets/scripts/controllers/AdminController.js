myApp.controller('AdminController', function(EventtypeService, PartnerService, VendorService, AnnualgoalService, $modal, $route) {

  console.log('in vendor controller');
  var vm = this;
  vm.selectedButton = false;

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

  vm.getInfo = function() {
    console.log('in getInfo');
    vm.getVendors();
    vm.getAnnualgoal();
    vm.getPartners();
    vm.getEventType();
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

  vm.getEventType = function() {
    console.log('in getPartners');
    EventtypeService.getEventType().then(function() {
      vm.eventtype = EventtypeService.eventtypeData;
      console.log(vm.eventtype);
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
        title: 'Item Updated!',
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
    vm.getPartners();
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
    vm.getVendors();
  };

  vm.editgoals = function(goal) {
    console.log('in editgoals');
    vm.current = goal;
    console.log(goal);
  }; // end editgoals

  vm.current = {};

  /// --------------------------------------------------------------------------------------------------------------

  /// ALL POSTS

  vm.postVendor = function() {
    console.log('in postVendor');
    var newVendor = {
      vendor_name: vm.vendor_name,
      vendor_phone: vm.vendor_phone,
      vendor_email: vm.vendor_email,
      vendor_address: vm.vendor_address
    };
    console.log(newVendor);
    VendorService.postVendor(newVendor).then(function() {
      vm.getVendors();
    });
  }; // end postVendor

  vm.postPartner = function() {
    console.log('in postPartner');
    var newPartner = {
      partner_name: vm.partner_name,
      partner_contact: vm.partner_contact,
      partner_phone: vm.partner_phone,
      partner_address: vm.partner_address
    };
    console.log(newPartner);
    PartnerService.postPartner(newPartner).then(function() {
      vm.getPartners();
    });
  }; // end postPartner

  vm.addnewgoal = function() {
    console.log('in addnewgoal');
    var newGoal = {
      year: vm.year,
      annual_goal: vm.annual_goal
    };
    console.log(newGoal);
    AnnualgoalService.addnewgoal(newGoal).then(function() {
      vm.getAnnualgoal();
    });
  }; // end addnewgoal

  vm.addnewEventType = function() {
    console.log('in addnewEventType');
    var newEventType = {
      event_type_name: vm.event_type_name,
    };
    console.log(newEventType);
    EventtypeService.addnewEventType(newEventType).then(function() {
      vm.getEventType();
    });
  }; // end addnewgoal

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
      vm.getPartners();
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
      vm.getVendors();
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

});

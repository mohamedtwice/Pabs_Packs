myApp.controller('AdminController', function(eventtypeService, PartnerService, vendorService, annualgoalService, $modal, $route) {

  console.log('in vendor controller');
  var vm = this;


  /// --------------------------------------------------------------------------------------------------------------

  //// ALL GETS

  vm.getInfo = function() {
    console.log('in getInfo');
    vm.getVendors();
    vm.getAnnualgoal();
    vm.getPartners();
    vm.getEventType();
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

  vm.getPartners = function() {
    console.log('in getPartners');
    PartnerService.getPartner().then(function() {
      vm.partners = PartnerService.partnerData;
      console.log(vm.vendors);
    });
  }; // end getPartner

  vm.getEventType = function() {
    console.log('in getPartners');
    eventtypeService.getEventType().then(function() {
      vm.eventtype = eventtypeService.eventtypeData;
      console.log(vm.eventtype);
    });
  }; // end getPartner



  /// --------------------------------------------------------------------------------------------------------------

  /// ALL EDITS

  vm.updatePartners = function(partners) {
    console.log('in updatePartners');
    console.log(partners);

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
      date: vm.partner_nameUpdate,
      time: vm.partner_contactUpdate,
      partner_phone: vm.partner_phoneUpdate,
      partner_address: vm.partner_addressUpdate,
    };

    var id = partners;
    console.log(id);

    console.log(updatedPartner);
    PartnerService.updatePartner(id, updatedPartner).then(function() {
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
      $route.reload();
    });




    vm.editgoals = function(goal) {
      console.log('in editgoals');
      vm.current = goal;
      console.log(goal);
    }; // end editgoals

    vm.current = {};



    /// --------------------------------------------------------------------------------------------------------------


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
        vm.getVendors();
      });
    }; // end addnewgoal


    vm.addnewpartner = function() {
      console.log('in addnewgoal');
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
    }; // end addnewpartner

    vm.addnewgoal = function() {
      console.log('in addnewgoal');
      var newGoal = {
        year: vm.year,
        annual_goal: vm.annual_goal
      };
      console.log(newGoal);
      annualgoalService.addnewgoal(newGoal).then(function() {
        vm.getAnnualgoal();
      });
    }; // end addnewgoal


    vm.addnewEventType = function() {
      console.log('in addnewEventType');
      var newEventType = {
        event_type_name: vm.event_type_name,
      };
      console.log(newEventType);
      eventtypeService.addnewEventType(newEventType).then(function() {
        vm.getEventType();
      });
    }; // end addnewgoal


    /// --------------------------------------------------------------------------------------------------------------


    // DELETE FUNCTIONS

    vm.deletePartner = function(id) {
      console.log('in deletePartner');
      console.log(id);
      PartnerService.deletePartner(id).then(function(data) {
        console.log('data is:', data);
      });
      console.log('id is:', id);

      vm.getPartners();
    }; // end delete
    // end vendor controller
  };

  vm.deletePartner = function(id) {
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
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }; // delete partner

});

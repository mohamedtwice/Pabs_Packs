myApp.controller('PartnerModalController', function(PartnerService, $modalInstance, $route) {
  console.log('in PartnerModalController');
  var vm = this;

  vm.cancel = function() {
    $modalInstance.dismiss('cancel');
  }; // close modal button

  vm.getPartners = function() {
    console.log('in getPartners');
    PartnerService.getPartner().then(function() {
      vm.partners = PartnerService.partnerData;
      console.log(vm.partners);
    });
  }; // end getPartner

  vm.getPartners();

  vm.postPartner = function() {
    var newPartner = {
      partner_name: vm.partner_name,
      partner_phone: vm.partner_phone,
      partner_contact: vm.partner_contact,
      partner_address: vm.partner_address
    }
    console.log(newPartner);
    // stops function from running if all fields are empty
    PartnerService.postPartner(newPartner).then(function() {
      swal({
        type: 'success',
        title: 'New partner added!',
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
    $route.reload();
  };
  // end postVendor

});

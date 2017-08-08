myApp.controller('VendorModalController', function(VendorService, $modalInstance, $route) {
  console.log('in VendorModalController');
  var vm = this;

  vm.cancel = function() {
    $modalInstance.dismiss('cancel');
  }; // close modal button

  vm.getVendors = function() {
    console.log('in getVendors');
    VendorService.getVendors().then(function() {
      vm.vendors = VendorService.vendorData;
      console.log(vm.vendors);
    });
  }; // end getVendors

  vm.getVendors();

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
      swal({
        type: 'success',
        title: 'New item added!',
        timer: 2500
      }).then(
        function() {},
        // handling the promise rejection
        function(dismiss) {
          if (dismiss === 'timer') {
            console.log('I was closed by the timer');
          }
        }) // end dismiss
    }); // end sweetAlert
    vm.cancel();
    $route.reload();
  }; // end postVendor

});

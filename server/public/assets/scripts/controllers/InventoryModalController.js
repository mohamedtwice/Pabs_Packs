myApp.controller('InventoryModalController', function(InventoryService, VendorService, $modalInstance, $route) {
  console.log('in ModalController');
  var vm = this;

  vm.isCollapsed = true;
  vm.itemsPerPage = 10;

  vm.cancel = function() {
    $modalInstance.dismiss('cancel');
  }; // closes modal

  vm.getInventory = function() {
    console.log('Getting inventory2');
    InventoryService.getInventory().then(function() {
      vm.inventory2 = InventoryService.inventoryData;
      console.log(vm.inventory2);
    });
  } // end getInventory

  vm.getInventory(); // called upon pageload since I was having trouble with ng-init populating the typeahead

  vm.postInventoryItem = function() {
    var name = vm.name;
    if (vm.vendor === undefined) {
      vm.vendor = name;
    }
    console.log(vm.vendor);
    var newItem = {
      item: vm.item,
      vendor: vm.vendor,
      numberOnHand: vm.numberOnHand,
      comments: vm.comments,
      reorderAlertNumber: vm.reorderAlertNumber,
      type: vm.type
    }
    console.log(newItem);
    InventoryService.postInventoryItem(newItem).then(function() {
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
        })
    }); // end sweetAlert
    // vm.getInventory();
    $route.reload();
  } // end postInventoryItem

  vm.getVendors = function() {
    console.log('Getting vendors');
    vm.vendorNames = [];
    VendorService.getVendors().then(function() {
      vm.vendors = VendorService.vendorData;
      console.log(vm.vendors);
    });
  } // end getInventory

  vm.getVendors();

  vm.postVendor = function() {
    var newVendor = {
      name: vm.name,
      phone: vm.phone,
      email: vm.email,
      address: vm.address
    }
    console.log(newVendor);
    // cancels function from running if all fields are empty
    if (newVendor.name === undefined && newVendor.phone === undefined && newVendor.address === undefined && newVendor.email === undefined) {
      console.log('{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}');
      return;
    }
    console.log("I'm here!");
    VendorService.postVendor(newVendor).then(function() {

    }); // end sweetAlert
  } // end postVendor

}).filter('unique', function() {
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
});

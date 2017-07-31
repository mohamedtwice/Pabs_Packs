myApp.controller('InventoryModalController', function(InventoryService, $modalInstance, $route) {
  console.log('in ModalController');
  var vm = this;

  vm.cancel = function() {
    $modalInstance.dismiss('cancel');
  }; // closes modal

  vm.reload = function() {
    $route.reload();
  } //  reloads page after new item has been added to show immediately

  vm.getInventory = function() {
    console.log('Getting inventory2');
    InventoryService.getInventory().then(function() {
      vm.inventory2 = InventoryService.inventoryData;
      console.log(vm.inventory2);
    });
  } // end getInventory

  vm.getInventory(); // called upon pageload since I was having trouble with ng-init populating the typeahead

  vm.postInventoryItem = function() {
    var newItem = {
      item: vm.item,
      vendor: vm.vendor,
      numberOnHand: vm.numberOnHand,
      comments: vm.comments,
      reorderAlertNumber: vm.reorderAlertNumber,
      type: vm.type
    }
    console.log(newItem);
    if (newItem.item || newItem.vendor_id ||  newItem.number_on_hand ||  newItem.comments ||  newItem.type || newItem.low_number === undefined) {
      swal({
        type: 'warning',
        title: "You're missing a category!",
        timer: 2000
      }).then(
        function() {},
        // handling the promise rejection
        function(dismiss) {
          if (dismiss === 'timer') {
            console.log('I was closed by the timer');
          }
        }) // end sweetAlert
    } else {
      InventoryService.postInventoryItem(newItem).then(function() {
        swal({
          type: 'success',
          title: 'New item added!',
          timer: 2000
        }).then(
          function() {},
          // handling the promise rejection
          function(dismiss) {
            if (dismiss === 'timer') {
              console.log('I was closed by the timer');
            }
            vm.reload();
          })
      }); // end sweetAlert
    } // end else
  } // end postInventoryItem

})

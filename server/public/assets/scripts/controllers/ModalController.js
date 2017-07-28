myApp.controller('ModalController', function(InventoryService, $modalInstance, $route) {
  console.log('in ModalController');
  var vm = this;

  vm.cancel = function() {
    $modalInstance.dismiss('cancel');
  };

  vm.reload = function() {
    $route.reload();
  } //  reloads page after new item has been added to show immediately

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
    if (newItem.item === undefined) {
      swal({
        type: 'warning',
        title: 'Item was not entered!',
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
      });
    }

  } // end postInventoryItem

})

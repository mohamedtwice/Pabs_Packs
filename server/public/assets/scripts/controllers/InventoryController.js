myApp.controller('InventoryController', function(InventoryService, $route) {
  console.log('in inventory controller');
  var vm = this;

  vm.isCollapsed = false;
  vm.orderByField = 'item';
  vm.reverseSort = false;

  vm.reload = function() {
    $route.reload();
  } //  to reload page after new item has been added to show immediately

  vm.getInventory = function() {
    console.log('Getting the inventory');
    InventoryService.getInventory().then(function() {
      vm.inventory = InventoryService.inventoryData;
      console.log(vm.inventory);
    });
  } // end getInventory

  vm.postInventoryItem = function() {
    var newItem = {
      item: vm.item,
      vendor: vm.vendor,
      numberOnHand: vm.numberOnHand,
      dateOrdered: vm.dateOrdered,
      comments: vm.comments,
      reorderAlertNumber: vm.reorderAlertNumber
    }
    console.log(newItem);
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
        })
    });
    vm.reload();
  } // end postInventoryItem

  vm.deleteItem = function(index) {
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
      var id = vm.inventory[index]._id;
      InventoryService.deleteItem(id);
      vm.reload();
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
  }

});

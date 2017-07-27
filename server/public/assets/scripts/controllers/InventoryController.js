myApp.controller('InventoryController', function(InventoryService, $modal, $route) {
  console.log('in inventory controller');
  var vm = this;
  vm.column = 'item';
  // sort ordering (Ascending or Descending). Set true for desending
  vm.reverse = false;
  vm.orderByField = 'item';
  vm.reverseSort = false;
  vm.type = 'backpack';
  vm.animationsEnabled = true;

  vm.reload = function() {
    $route.reload();
  } //  reloads page after new item has been added to show immediately

  vm.openAddNew = function(size) {
    var modalInstance = $modal.open({
      animation: vm.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalController as mc',
      size: size
    });
  }
  // called on header click
  vm.sortColumn = function(col) {
    vm.column = col;
    if (vm.reverse) {
      vm.reverse = false;
      vm.reverseclass = 'arrow-up';
    } else {
      vm.reverse = true;
      vm.reverseclass = 'arrow-down';
    }
  };
  // remove and change class
  vm.sortClass = function(col) {
    if (vm.column == col) {
      if (vm.reverse) {
        return 'arrow-down';
      } else {
        return 'arrow-up';
      }
    } else {
      return '';
    }
  }
  vm.getInventory = function() {
    console.log('Getting the inventory');
    InventoryService.getInventory().then(function() {
      vm.inventory = InventoryService.inventoryData;
      console.log(vm.inventory);
    });
  } // end getInventory

  vm.updateProperties = function(id) {
    console.log('in updateProperties');
    console.log(id);
    var updatedProperty = {
      id: id,
      itemUpdate: vm.itemUpdate,
      vendorUpdate: vm.vendorUpdate,
      numberOnHandUpdate: vm.numberOnHandUpdate,
      commentsUpdate: vm.commentsUpdate,
      reorderAlertNumberUpdate: vm.reorderAlertNumberUpdate
    }
    console.log(updatedProperty);
    InventoryService.updateProperties(updatedProperty).then(function() {
      swal({
        type: 'success',
        title: 'Item Updated!',
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
  }
  vm.deleteItem = function(index) {
    console.log(index);
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
      InventoryService.deleteItem(index);
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

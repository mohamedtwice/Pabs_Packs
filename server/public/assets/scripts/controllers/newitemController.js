myApp.controller('newitemController', ['InventoryService', '$scope', '$http', '$location', function(InventoryService, $scope, $http, $location) {
  // This happens after view/controller loads -- not ideal but it works for now.
  console.log('newitemController');

  $scope.userName = "Mohamed";
  $scope.inventoryItem = {
    item: '',
    vendor_id: '',
    onhand: '',
    lownumber: '',
    type: '',
    notes: ''
  };
  $scope.message = '';



  $scope.createItem = function() {
    console.log('createItem click');
    var inventoryItem = {
      item: $scope.item,
      vendor_id: $scope.vendor_id,
      onhand: $scope.onhand,
      lownumber: $scope.lownumber,
      type: $scope.type,
      notes: $scope.notes
    };
    console.log('in add item', inventoryItem);
    InventoryService.postInventoryItem(inventoryItem);
  }; //end createItem


  // $scope.createItem = function() {
  //   console.log('in createItem');
  //   if ($scope.inventoryItem.item == '' || $scope.inventoryItem.vendor_id == '') {
  //     $scope.message = "Please complete all fields.";
  //   } else {
  //     var inventoryItem = {
  //       item: $scope.item,
  //       vendor_id: $scope.vendor_id,
  //       onhand: $scope.onhand,
  //       lownumber: $scope.lownumber,
  //       type: $scope.type,
  //       notes: $scope.notes
  //     };
  //     console.log('sending to server...', $scope.inventoryItem);
  //     $http.post('/inventory', $scope.inventoryItem).then(function(response) {
  //         console.log('success');
  //         // $location.path('/home');
  //       },
  //       function(response) {
  //         console.log('error');
  //         $scope.message = "Please try again."
  //       });
  //   }
  // }


  // -----



  // $scope.createItem = function() {
  //   console.log('createItem click');
  //   var inventoryItem = {
  //     item: $scope.item,
  //     vendor_id: $scope.vendor_id,
  //     onhand: $scope.onhand,
  //     lownumber: $scope.lownumber,
  //     type: $scope.type,
  //     notes: $scope.notes
  //   };
  //   console.log('in add item', inventoryItem);
  //   // inventoryService.addItem(inventoryItem);
  //   $http.post('/inventory', inventoryItem).then(function(response) {
  //       console.log('success');
  //       // $location.path('/home');
  //     },
  //     function(response) {
  //       console.log('error');
  //       $scope.message = "Please try again."
  //     });
  // }; //end createItem

  // -----

  $scope.logout = function() {
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path("/home");
    });
  };
}]);

myApp.service('inventoryService', function($http, $location, $route) {
  console.log('in inventoryService');

  var sv = this;

  // Add Inventory Item
  sv.addItem = function(inventoryItem) {
    console.log("in addItem service");
    console.log(inventoryItem);
    return $http.post('/inventory', inventoryItem).then(function(response) {
      // $route.reload();
      console.log('in invSvc:13', response);
      console.log('invSvc:12', inventoryItem);
    })
  }


  // Get All Inventory
  sv.getInventory = function(data) {
    var id = {
      id: data
    }
    return $http.post('/inventory', data).then(function(response) {
      return response.data;
    });
  }

});

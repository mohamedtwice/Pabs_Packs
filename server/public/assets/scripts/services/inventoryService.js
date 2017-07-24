myApp.service('InventoryService', function($http) {
  console.log('in inventory service');

  var sv = this;

  sv.getInventory = function(item) {
    return $http({
      method: 'GET',
      url: '/inventory'
    }).then(function(response) {
      sv.inventoryData = response.data;
      console.log(sv.inventoryData);
    }); // find the average rating
  }

  sv.postInventoryItem = function(newItem) {
    console.log(newItem);
    return $http({
      method: 'POST',
      url: '/inventory',
      data: newItem
    }).then(function(response) {
      console.log('back from postInventoryItem:', response);
    });
  }

  sv.deleteItem = function(id) {
  return $http({
    method: 'DELETE',
    url: '/inventory/' + id,
  }).then(function() {
    console.log('item deleted');
  });
}

});
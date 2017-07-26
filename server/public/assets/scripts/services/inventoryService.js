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
    }); // get the inventory
  }

  sv.postInventoryItem = function(newItem) {
    console.log(newItem);
    return $http({
      method: 'POST',
      url: '/',
      data: newItem
    }).then(function(response) {
      console.log('back from postInventoryItem:', response);
    });
  }

  sv.updateProperties = function(index, updatedProperty) {
    console.log(updatedProperty);
    console.log(index);
    return $http({
      method: 'PUT',
      url: '/inventory',
      data: updatedProperty,
      params: {
        id: index
      }
    }).then(function(response) {
      console.log('back from updatedProperty:', response);
    });
  }

  sv.deleteItem = function(id) {
    console.log(id);
    return $http({
      method: 'DELETE',
      url: '/inventory/' + id,
      params: {
        id: id
      }
    }).then(function() {
      console.log('item deleted');
    });
  }

});

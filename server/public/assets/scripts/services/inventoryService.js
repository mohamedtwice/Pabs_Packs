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
    });
  } // end getInventory

  sv.postInventoryItem = function(newItem) {
    console.log(newItem);
    return $http({
      method: 'POST',
      url: '/inventory',
      data: newItem
    }).then(function(response) {
      console.log('back from postInventoryItem:', response);
    });
  }; // end postInventoryItem

  sv.updateProperties = function(updatedProperty) {
    console.log(updatedProperty);
    return $http({
      method: 'PUT',
      url: '/inventory/' + updatedProperty.id,
      params: {
        id: updatedProperty.id
      },
      data: updatedProperty
    }).then(function(response) {
      console.log('back from updateProperties:', response);
    });
  }  // end update properties

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
  } //end deleteItem

});

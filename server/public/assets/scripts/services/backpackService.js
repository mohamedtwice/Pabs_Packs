myApp.service('BackpackService', function($http) {
  console.log('in backpack service');

  var sv = this;

  sv.getBackpack = function(item) {
    return $http({
      method: 'GET',
      url: '/backpack'
    }).then(function(response) {
      sv.backpackData = response.data;
      console.log(sv.backpackData);
    }); // get the backpack
  }

  sv.postBackpack = function(newItem) {
    console.log(newItem);
    return $http({
      method: 'POST',
      url: '/backpack',
      data: newItem
    }).then(function(response) {
      console.log('back from postBackpack:', response);
    });
  }

  sv.updateBackpack = function(updatedProperty) {
    console.log(updatedProperty);
    return $http({
      method: 'PUT',
      url: '/backpack/' + updatedProperty.id,
      data: updatedProperty
    }).then(function(response) {
      console.log('back from updateBackpack:', response);
    }); // update properties
  }

}

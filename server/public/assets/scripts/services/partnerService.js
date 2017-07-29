myApp.service('PartnerService', function($http) {
  console.log('in partner service');

  var sv = this;

  sv.getPartner = function(item) {
    return $http({
      method: 'GET',
      url: '/partners'
    }).then(function(response) {
      sv.partnerData = response.data;
      console.log(sv.partnerData);
    }); // get the partner
  }

  sv.postPartner = function(newItem) {
    console.log(newItem);
    return $http({
      method: 'POST',
      url: '/partners',
      data: newItem
    }).then(function(response) {
      console.log('back from postPartner:', response);
    });
  }

  sv.updatePartner = function(updatedProperty) {
    console.log(updatedProperty);
    return $http({
      method: 'PUT',
      url: '/partners/' + updatedProperty.id,
      data: updatedProperty
    }).then(function(response) {
      console.log('back from updatePartner:', response);
    }); // update properties
  }

}

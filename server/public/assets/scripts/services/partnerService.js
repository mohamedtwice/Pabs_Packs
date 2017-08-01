myApp.service('PartnerService', function($http) {
  console.log('in partner service');
  var sv = this;

  sv.getPartner = function() {
    return $http({
      method: 'GET',
      url: '/partners'
    }).then(function(response) {
      sv.partnerData = response.data;
      console.log(sv.partnerData);
    }); // get the partner
  }

  sv.postPartner = function(newPartner) {
    console.log(newPartner);
    return $http({
      method: 'POST',
      url: '/partners',
      data: newPartner
    }).then(function(response) {
      console.log('back from postPartner:', response);
    });
  }

  sv.updatePartner = function(updatedPartner) {
    console.log(updatedPartner);
    return $http({
      method: 'PUT',
      url: '/partners/: ' + updatedPartner.id,
      // params: {
      //   id: updatedPartner.id
      // },
      data: updatedPartner
    }).then(function(response) {
      console.log('back from updatePartner:', response);
    }); // update properties
  }

  sv.deletePartner = function(id) {
    console.log(id);
    return $http({
      method: 'DELETE',
      url: '/partners/' + id,
      params: {
        id: id
      }
    }).then(function() {
      console.log('partner deleted');
    });
  }

});

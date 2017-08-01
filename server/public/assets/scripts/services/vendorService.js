myApp.service('VendorService', function($http) {
  console.log('in vendor service');
  var sv = this;

  sv.getVendors = function() {
    console.log('in getVendors service');
    return $http({
      method: 'GET',
      url: '/vendors'
    }).then(function(response) {
      console.log(response);
      sv.vendorData = response.data;
      console.log(sv.vendorData);
    });
  }; // end getVendors

  sv.postVendor = function(newVendor) {
    console.log(newVendor);
    return $http({
      method: 'POST',
      url: '/vendors',
      data: newVendor
    }).then(function(response) {
      console.log('back from postVendor:', response);
    });
  }; // end postVendor

}); // end of service

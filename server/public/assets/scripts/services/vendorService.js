myApp.service('VendorService', function($http) {
  console.log('in vendor service');
  var sv = this;

  sv.getVendors = function() {
    console.log('in getVendors service');
    return $http({
      method: 'GET',
      url: '/vendor'
    }).then(function(response) {
      console.log(response);
      sv.vendorsData = response.data;
      console.log(sv.vendorsData);
    }); //
  }; // end getVendors



  sv.addnewvendor = function(newVendor) {
    console.log(newVendor);
    return $http({
      method: 'POST',
      url: '/vendor',
      data: newVendor
    }).then(function(response) {
      console.log('back from addnewvendor:', response);
    });
  };



}); // end of service

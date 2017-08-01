myApp.service('EventtypeService', function($http) {
  console.log('in EventtypeService');
  var sv = this;

  sv.getEventType = function() {
    console.log('in EventtypeService');
    return $http({
      method: 'GET',
      url: '/eventtype'
    }).then(function(response) {
      console.log(response);
      sv.eventtypeData = response.data;
      console.log(sv.eventtypeData);
    }); //
  }; // end getAnnualgoal



  sv.addnewEventType = function(newEventType) {
    console.log(newEventType);
    return $http({
      method: 'POST',
      url: '/eventtype',
      data: newEventType
    }).then(function(response) {
      console.log('back from addeventtype:', response);
    });
  };



}); // end of service

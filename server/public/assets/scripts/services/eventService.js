myApp.service('EventService', function($http) {

  console.log('in event service');
  var sv = this;

  sv.createEvent = function() {
    console.log('in getEvents service');
    return $http({
      method: 'GET',
      url: '/events'
    }).then(function(response) {
      console.log(response);
      sv.eventsData = response.data;
      console.log(sv.eventsData);
    }); 
  }; // end createEvent

  sv.getEvents = function() {
    console.log('in getEvents service');
    return $http({
      method: 'GET',
      url: '/events'
    }).then(function(response) {
      console.log(response);
      sv.eventsData = response.data;
      console.log(sv.eventsData);
    });
  }; // end getEvents

  sv.postEvent = function(newEvent) {
    console.log(newEvent);
    return $http({
      method: 'POST',
      url: '/events',
      data: newEvent
    }).then(function(response) {
      console.log('back from postEvent:', response);
    });
  }; // end postEvent

  sv.deleteEvent = function(id) {
    console.log('in deleteEvent');
    console.log(id);
    return $http({
      method: 'DELETE',
      url: '/events/' + id,
      params: {
        id: id
      }
    }).then(function(response) {
      return response;
    });
  }; //end deleteEvent

});

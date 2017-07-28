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

  sv.getEvents = function() {
   console.log('in getEvents service');
   return $http({
     method: 'GET',
     url: '/events'
   }).then(function(response) {
     console.log(response);
     sv.eventsData = response.data;
     console.log(sv.eventsData);
   }); //
 };

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
      url: '/events/',
      params: {
        id: id
      }
    }).then(function(response) {
      return response;
    });
  }; //end deleteEvent

  sv.updateEvents = function(id, updatedEvent) {
    console.log(updatedEvent);
    console.log(id);
    return $http({
      method: 'PUT',
      url: '/events/' + id,
      data: updatedEvent
      // params: {
      //   id: id
      // }
    }).then(function(response) {
      console.log('back from updatedEvent:', response);
    }); // end of update event
  };

});

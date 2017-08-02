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
    var dateArray = [];
    console.log('in getEvents service');
    return $http({
      method: 'GET',
      url: '/events'
    }).then(function(response) {
      sv.eventsData = response.data;
      sv.eventsData.forEach(function(obj) {
        obj.event_date = new Date(obj.event_date);
      });
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

  sv.updateDonationEvents = function(updatedProperty) {
    console.log(updatedProperty);
    return $http({
      method: 'PUT',
      url: '/events/' + updatedProperty.id,
      params: {
        id: updatedProperty.id
      },
      data: updatedProperty
    }).then(function(response) {
      console.log('back from updateDonationEvents:', response);
    });
  }  // end update properties

  sv.updatePackEvents = function(updatedProperty) {
    console.log(updatedProperty);
    return $http({
      method: 'PUT',
      url: '/events/' + updatedProperty.id,
      params: {
        id: updatedProperty.id
      },
      data: updatedProperty
    }).then(function(response) {
      console.log('back from updatePackEvents:', response);
    });
  }  // end update properties

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
  };

  // service get call for DashboardController getUpcomingEvents function
   sv.getUpcomingEvents = function() {
     console.log('in EventService getUpcomingEvents function');
     return $http({
      method: 'GET',
      url: '/dashboard/upcomingEvents'
    }).then(function(response) {
      sv.upcomingEventsGET = response.data;
    });
  }; // end getUpcoimingEvents

  // service get call for EventController getNeededPacks function
  sv.getNeededPacks = function() {
    console.log('in EventService getNeededPacks function');
    return $http({
      method: 'GET',
      url: '/events/neededTotals'
    }).then(function(response) {
      sv.neededPacksGET = response.data;
    });
  }; // end getNeededPacks

}); // end myApp.service

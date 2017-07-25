myApp.service('eventService', function($http) {

  console.log('in event service');
  var sv = this;

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
  };

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



});
//
// self.deleteAdmins = function(ev, id) {
//   var confirm = $mdDialog.confirm()
//     .title('Would you like to delete this user from the system?')
//     .ariaLabel('Delete admin')
//     .targetEvent(ev)
//     .ok('Delete Admin User')
//     .cancel('Cancel');
//
//   $mdDialog.show(confirm).then(function() {
//     self.status = 'Admin User is deleted';
//     $http({
//       method: 'DELETE',
//       url: '/private/deleteAdmins',
//       params: {
//         id: id
//       }
//     }).then(function(response) {
//       self.getAdmins();
//     }); //end then
//   }, function() {
//     self.status = 'user was not deleted, Thank you.';
//   }); // end confirm dialogue
// }; //end showconfirm
// showconfirm

myApp.service('AccessService', function($http) {
  var sv = this;

  sv.login = function(credentials) {
    return $http({
      method: 'POST',
      url: '/',
      data: credentials
    }).then(function(response) {
      console.log('back from login attempt:', response);
      sv.response = response;
    });
  } // end logIn

  sv.registerUser = function(user) {
    return $http({
      method: 'POST',
      url: '/register',
      data: user
    }).then(function(response) {
      console.log('back from register attempt:', response);
    });
  } // end register

});

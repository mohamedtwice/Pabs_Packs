myApp.controller('DashboardController', ['$scope', '$http', '$location', function($scope, $http, $location) {
  // This happens after view/controller loads -- not ideal but it works for now.
  console.log('DashboardController');
  $scope.userName = "Mohamed";
  // $http.get('/user').then(function(response) {
  //     if(response.data.username) {
  //         // user has a curret session on the server
  //         $scope.userName = response.data.username;
  //         console.log('User Data: ', $scope.userName);
  //     } else {
  //         // user has no session, bounce them back to the login page
  //         $location.path("/home");
  //     }
  // });
  //
  $scope.logout = function() {
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path("/home");
    });
  }; // end $scope.logout

  var vm = this;

  // pie chart
  // pie piece labels
  vm.labels = ['Packs Already Donated', 'Packs Left to Donate', 'Scheduled Pack Donations'];
  // dummy data
  vm.data = [300, 500, 100];
  // legend
  vm.options = {legend: {display: true}};

}]); // end controller

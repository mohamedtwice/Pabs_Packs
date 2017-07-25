myApp.controller('DashboardController', ['DashboardService', '$scope', '$http', '$location', function(DashboardService, $scope, $http, $location) {
  // This happens after view/controller loads -- not ideal but it works for now.
  console.log('checking user');
  $http.get('/user').then(function(response) {
    if (response.data.username) {
      // user has a curret session on the server
      $scope.userName = response.data.username;
      console.log('User Data: ', $scope.userName);
    } else {
      // user has no session, bounce them back to the login page
      $location.path("/home");
    }
  });

  $scope.logout = function() {
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path("/home");
    });
  }; // end $scope.logout


  var vm = this;

  // pie chart post function
  vm.postPieChart = function() {
    console.log('in controller, postPieChart');
    // pie piece labels
    vm.pieLabels = ['Packs Already Donated', 'Packs Left to Donate', 'Scheduled Pack Donations'];
    // legend
    vm.pieOptions = {legend: {display: true}};
    // dummy data:  [200, 300, 500]
    vm.pieData = [];
    // pie object
    var pieObject = {
      labels: vm.pieLabels,
      options: vm.pieOptions,
      data: vm.pieData
    }; // end pieObject
    DashboardService.postPieChart().then(function() {
      vm.pieChart = DashboardService.data;
      console.log('back in controller with:', vm.pieChart);
    });
  }; // end postPieChart

  // pie chart get function
  vm.getPieChart = function() {
    console.log('in controller, getPieChart');
  }; // end getPieChart







  // horizontal bar chart
  vm.barLabels = ['Gray Backpacks', 'Blankets', 'Journals', 'Bracelets', 'Heart Stress Relievers', 'Organza Bags', 'Pabby the Penguin', 'Lip Care', 'Lotion', 'Postcards', 'Stamps', 'Handwritten Notes', 'PAB\'S PACKS Story Cards'];
  vm.barSeries = ['Series A', 'Series B'];

  vm.barData = [
    [500, 500, 500, 300, 300, 300, 500,500, 500, 250, 100, 250, 250],
  ];
}]); // end controller

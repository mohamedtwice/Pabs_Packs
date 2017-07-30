myApp.controller('DashboardController', ['dashboardService', '$http', '$location', function(dashboardService, $http, $location) {
  // This happens after view/controller loads -- not ideal but it works for now.
  var vm = this;
  console.log('checking user');
  $http.get('/user').then(function(response) {
    if (response.data.username) {
      // user has a curret session on the server
      vm.userName = response.data.username;
      console.log('User Data: ', vm.userName);
    } else {
      // user has no session, bounce them back to the login page
      $location.path("/home");
    }
  });

  vm.logout = function() {
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path("/home");
    });
  }; // end vm.logout

vm.pieLabels = ['Packs Already Donated', 'Packs Left to Donate', 'Scheduled Pack Donations'];
vm.pieOptions = {legend: {display: true}};

  // pie chart post function
  vm.getPieChart = function() {
    console.log('in controller, getPieChart');
    // pie piece labels
    vm.pieLabels = ['Packs Already Donated', 'Packs Left to Donate', 'Scheduled Pack Donations'];
    // legend
    vm.pieOptions = {legend: {display: true}};
    // dummy data:  [200, 300, 500]
    vm.pieData = [200, 300, 500];
    // pie object
    var pieObject = {
      labels: vm.pieLabels,
      options: vm.pieOptions,
      data: vm.pieData
    }; // end pieObject
    dashboardService.getPieChart(pieObject).then(function() {
      vm.pieData = dashboardService.pieChartData;
      console.log(dashboardService.pieChartData);
      console.log('back in controller with:', vm.pieChart);
    }); // end dashboardService.getPieChart
  }; // end getPieChart



  // horizontal bar chart
  vm.getBarChart = function() {
    console.log('in controller, getBarChart');
    // bar labels
    // vm.barLabels = ['Gray Backpacks', 'Blankets', 'Journals', 'Bracelets', 'Heart Stress Relievers', 'Organza Bags', 'Pabby the Penguin', 'Lip Care', 'Lotion', 'Postcards', 'Stamps', 'Handwritten Notes', 'PAB\'S PACKS Story Cards'];
    vm.barLabels = [];
    // vm.barSeries = ['Series A', 'Series B'];
    // bar data
    // vm.barData = [[500, 500, 500, 300, 300, 300, 500,500, 500, 250, 100, 250, 250],];
    vm.barData = [];
    // bar object
    var barObject = {
      labels: vm.barLabels,
      data: vm.barData
    }; // end barObject
    dashboardService.getBarChart(barObject).then(function() {
      vm.barChart = dashboardService.barChartData;
      console.log(dashboardService.barChartData);
      console.log(vm.barChart);
    }); // end dashboardService.getBarChart
}; // end getBarChart

}]); // end controller

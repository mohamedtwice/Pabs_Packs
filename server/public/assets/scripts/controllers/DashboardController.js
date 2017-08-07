myApp.controller('DashboardController', ['DashboardService', 'EventService', '$http', '$location', function(DashboardService, EventService, $http, $location) {
  // This happens after view/controller loads -- not ideal but it works for now.
  var vm = this;
  console.log('checking user');
  $http.get('/user').then(function(response) {
    if (response.data.username) {
      // user has a curret session on the server
      vm.username = response.data.username;
      console.log('User Data: ', vm.username);
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


  // pie chart post function
  vm.getPieChart = function() {
    console.log('in controller, getPieChart');
    // pie piece labels
    vm.pieLabels = ['Packs Already Donated', 'Packs Left to Donate', 'Scheduled Pack Donations'];
    // legend
    vm.pieOptions = {
      legend: {
        display: true
      }
    };
    // pie data
    vm.pieData = [];

    DashboardService.getPieChart().then(function() {
      var dashData = DashboardService.pieChartData;
      vm.pieData = [dashData.packsDonated, dashData.leftToDonate, dashData.scheduledDonations];
      console.log('back in controller with:', vm.pieData);
    }); // end DashboardService.getPieChart
  }; // end getPieChart

  // horizontal bar chart
  vm.getBarChart = function() {
    console.log('in controller, getBarChart');

    // vm.barLabels = ['Gray Backpacks', 'Blankets', 'Journals', 'Bracelets', 'Heart Stress Relievers', 'Organza Bags', 'Pabby the Penguin', 'Lip Care', 'Lotion', 'Postcards', 'Stamps', 'Handwritten Notes', 'PAB\'S PACKS Story Cards'];
    vm.barLabels = [];

    vm.barData = [];

    DashboardService.getBarChart().then(function() {
      var dashData = DashboardService.barChartData;
      vm.barLabels = [dashData.items.rows[0].item, dashData.items.rows[1].item, dashData.items.rows[2].item, dashData.items.rows[3].item, dashData.items.rows[4].item];
      vm.barData = [dashData.numbers.rows[0].number_on_hand, dashData.numbers.rows[1].number_on_hand, dashData.numbers.rows[2].number_on_hand, dashData.numbers.rows[3].number_on_hand, dashData.numbers.rows[4].number_on_hand];
      console.log('back in controller with:', vm.barLabels, vm.barData);
    }); // end DashboardService.getBarChart
  }; // end getBarChart

  // upcoming events
  vm.getUpcomingEvents = function() {
    console.log('in controller, getUpcomingEvents');
    EventService.getUpcomingEvents().then(function() {
      vm.upcomingEvents = EventService.upcomingEventsGET;
      console.log(EventService.upcomingEventsGET);
      console.log(vm.upcomingEvents);
    });
  }; // end getUpcomingEvents

}]); // end controller

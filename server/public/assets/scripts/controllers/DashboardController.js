myApp.controller('DashboardController', ['dashboardService', 'EventService', '$http', '$location', function(dashboardService, EventService, $http, $location) {
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


  // pie chart post function
  vm.getPieChart = function() {
    console.log('in controller, getPieChart');
    // pie piece labels
    vm.pieLabels = ['Packs Already Donated', 'Packs Left to Donate', 'Scheduled Pack Donations'];
    // legend
    vm.pieOptions = {legend: {display: true}};
    // pie data
    vm.pieData = [];

    dashboardService.getPieChart().then(function() {
      var dashData = dashboardService.pieChartData;
      vm.pieData = [dashData.packsDonated, dashData.leftToDonate, dashData.scheduledDonations];
      console.log('back in controller with:', vm.pieData);
    }); // end dashboardService.getPieChart
  }; // end getPieChart


  // horizontal bar chart
  vm.getBarChart = function() {
    console.log('in controller, getBarChart');

    // vm.barLabels = ['Gray Backpacks', 'Blankets', 'Journals', 'Bracelets', 'Heart Stress Relievers', 'Organza Bags', 'Pabby the Penguin', 'Lip Care', 'Lotion', 'Postcards', 'Stamps', 'Handwritten Notes', 'PAB\'S PACKS Story Cards'];
    vm.barLabels = [];

    vm.barData = [];

    dashboardService.getBarChart().then(function() {
      var dashData = dashboardService.barChartData;
      vm.barLabels = [dashData.items.rows[0].item, dashData.items.rows[1].item, dashData.items.rows[2].item, dashData.items.rows[3].item, dashData.items.rows[4].item];
      vm.barData = [dashData.numbers.rows[0].number_on_hand, dashData.numbers.rows[1].number_on_hand, dashData.numbers.rows[2].number_on_hand, dashData.numbers.rows[3].number_on_hand, dashData.numbers.rows[4].number_on_hand];
      console.log('back in controller with:', vm.barLabels, vm.barData);
    }); // end dashboardService.getBarChart
}; // end getBarChart



  // upcoming events
  vm.getUpcomingEvents = function() {
    console.log('in controller, getUpcomingEvents');

    var eventsObject = {
      event1: '',
      event2: '',
      event3: ''
    }; // end eventsObject
    EventService.getUpcomingEvents(eventsObject).then(function() {
      vm.upcomingEvents = EventService.upcomingEventsGET;
      console.log(EventService.upcomingEventsGET);
      console.log(vm.upcomingEvents);
    });
  }; // end getUpcomingEvents

}]); // end controller

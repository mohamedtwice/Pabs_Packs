/**** Dashboard Service ****/

myApp.service('dashboardService', function($http) {
  console.log('in dashboard service');
  var sv = this;

  // getPieChart function
  sv.getPieChart = function(chart){
    return $http({
      method: 'GET',
      url: '/dashboard/donationData',
    }).then(function(response){
      sv.pieChartData = response.data;
      console.log(sv.pieChartData);
    });
  }; // end getPieChart


}); // end service

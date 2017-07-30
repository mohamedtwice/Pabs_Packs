/**** Dashboard Service ****/

myApp.service('dashboardService', function($http) {
  console.log('in dashboard service');
  var sv = this;

  // getPieChart function
  sv.getPieChart = function(){
    return $http({
      method: 'GET',
      url: '/dashboard/donationData',
    }).then(function(response){
      sv.pieChartData = response.data;
      console.log(sv.pieChartData);
    });
  }; // end getPieChart

  // getBarChart function
  sv.getBarChart = function(){
    return $http({
      method: 'GET',
      url: '/dashboard/inventoryData',
    }).then(function(response){
      sv.barChartData = response.data;
      console.log(response.data); // this log returns an array of 5 objects
      console.log(sv.barChartData); // this log returns the same array of 5 objects
    });
  }; // end getBarChart


}); // end service

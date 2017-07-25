/**** Dashboard Service ****/

myApp.service('DashboardService', function($http) {
  console.log('in dashboard service');
  var sv = this;

  sv.postPieChart = function(data){
    return $http({
      method: 'POST',
      url: '/dashboard',
      data: data
    }).then(function(response){
      console.log('back from postPieChart post:', response);
    });
  }; // end getPieChart


}); // end service

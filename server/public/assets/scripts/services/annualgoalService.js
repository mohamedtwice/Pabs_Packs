myApp.service('AnnualgoalService', function($http) {
  console.log('in AnnualgoalService');
  var sv = this;

  sv.getAnnualgoal = function() {
    console.log('in AnnualgoalService');
    return $http({
      method: 'GET',
      url: '/annualgoal'
    }).then(function(response) {
      console.log(response);
      sv.annualgoalData = response.data;
      console.log(sv.annualgoalData);
    });
  }; // end getAnnualgoal

  sv.updateAnnualGoal = function(updatedGoal) {
    console.log(updatedGoal);
    return $http({
      method: 'PUT',
      url: '/annualgoal/' + updatedGoal.id,
      params: {
        id: updatedGoal.id
      },
      data: updatedGoal
    }).then(function(response) {
      console.log('back from updateAnnualGoal:', response);
    });
  } // end updatePackEvents

  sv.addnewgoal = function(newGoal) {
    console.log(newGoal);
    return $http({
      method: 'POST',
      url: '/annualgoal',
      data: newGoal
    }).then(function(response) {
      console.log('back from addnewgoal:', response);
    });
  }; // end addnewgoal

}); // end of service

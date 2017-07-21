myApp.controller('LoginController', ['$scope', '$http', '$location', 'ui.bootstrap', function($scope, $http, $location) {

  $scope.getInventory = function(item) {
    // console.log('Getting the average rating for:', item.menu_item_name);
    InventoryService.getRating(item.menu_item_name).then(function() {
      $scope.inventory = InventoryService.ratingData;
      // push the ratings into an array
      // console.log('back in controller with avg rating for:', menuItem, item.avg, item.length);
    });
  } // end getRating

  $scope.postInventoryItem = function(item) {
    var ratingObject = {
      restaurant: $scope.restaurantName.restaurant_name,
      meal: item.menu_item_name,
      rating: last
    };
    console.log(ratingObject);
    InventoryService.postRating(ratingObject).then(function() {
      swal({
        type: 'success',
        title: 'Rating added!',
        timer: 2000
      }).then(
        function() {},
        // handling the promise rejection
        function(dismiss) {
          if (dismiss === 'timer') {
            console.log('I was closed by the timer');
          }
        })
    });
  } // end postRating
]});

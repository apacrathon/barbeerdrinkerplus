var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
  $scope.id = 0;
  $scope.barName = "Evil Roy Slades";
  $scope.barStreet = "7926 Nichols Avenue";
  $scope.barCity = "Austin";
  $scope.barState = "TX";
  $scope.barZipCode = "78730";
})

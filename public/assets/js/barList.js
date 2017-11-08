'use strict';

var serverUrl = 'http://localhost:3030';
const feathersClient = feathers()
  .configure(feathers.rest(serverUrl).fetch(fetch));

const bars = feathersClient.service('/bars');

bars.find({
    query: {
      id: {
        $ne: -1
      },
      $limit: 1000
  }
}).then(results => console.log('All results\n', results));

var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
  $scope.id = 0;
  $scope.barName = "Evil Roy Slades";
  $scope.barStreet = "7926 Nichols Avenue";
  $scope.barCity = "Austin";
  $scope.barState = "TX";
  $scope.barZipCode = "78730";
})

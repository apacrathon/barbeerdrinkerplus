'use strict';

let serverUrl = 'http://localhost:3030';
const feathersClient = feathers()
  .configure(feathers.rest(serverUrl).fetch(fetch));

const bars = feathersClient.service('/bars');

let app = angular.module('myApp', []);

app.controller('myCtrl', [
  '$scope',
  function($scope) {
    $scope.barList = [];
    jQuery('#mainSearchForm').submit(function(event) {
      var inputVal = document.getElementById('mainSearchBar').value;
      console.log(inputVal)
      bars.find({
        query: {
          name: inputVal,
          $limit: 1000
        }
      }).then(function(response) {
        $scope.$apply(() => {
          $scope.barList = response.data;
        });
      });
      console.log($scope.barList);
    });

  }
]);

app.controller('managerBarList', [
  '$scope',
  function($scope) {
    $scope.barList = [];
    bars.find({
      query: { id: { $ne: -1 }, $limit: 1000 }
    }).then(function(response) {
      $scope.$apply(() => {
        $scope.barList = response.data;

      });
    });
  }
]);

$(document).ready(function() {
  jQuery('#mainSearchForm').submit(function(event) {
    var inputVal = document.getElementById('mainSearchBar').value;
    console.log(inputVal)
  });
});

//'http://maps.googleapis.com/maps/api/distancematrix/json?origins=$postcode2&destinations=$postcode1&mode=driving&language=en-EN&sensor=false"'

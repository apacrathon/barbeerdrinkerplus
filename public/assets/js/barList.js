'use strict';

let serverUrl = 'http://localhost:3030';
const feathersClient = feathers()
  .configure(feathers.rest(serverUrl).fetch(fetch));

const bars = feathersClient.service('/bars');

let app = angular.module('myApp', []);

app.controller('myCtrl', [
  '$scope',
  function($scope) {

    jQuery('#mainSearchForm').submit(function(event) {
      var inputVal = document.getElementById('mainSearchBar').value;
      var inputVal2 = document.getElementById('mainSearchBar2').value;
      $scope.barList = [];
      console.log(inputVal)
      bars.find({
        query: {
          name: {
            $like: '%'+inputVal+'%'
          },
          city: {
            $like: '%'+inputVal2+'%'
          },
          $limit: 1000
        }
      }).then(function(response) {
        var i;
        for(i = 0; i < response.data.length; i++) {
          $scope.$apply(() => {
            if(inputVal == '') {

            }
            else {
              $scope.barList.push(response.data[i]);
            }

          });
        }
          console.log($scope.barList);
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
      query: {
        name: {
          $like: '%bar%'
        }, $limit: 1000 }
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

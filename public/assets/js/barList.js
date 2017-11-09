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
    bars.find({
      query: { id: { $ne: -1 }, $limit: 1000 }
    }).then(function(response) {
      $scope.$apply(() => {
        $scope.barList = response.data;
      });
    });
    console.log($scope.barList);
  }
]);

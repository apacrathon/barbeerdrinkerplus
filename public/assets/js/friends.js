'use strict'

let serverUrl = 'http://localhost:3030';
const feathersClient = feathers()
  .configure(feathers.rest(serverUrl).fetch(fetch));

const drinkers = feathersClient.service('/drinkers');

let app = angular.module('myApp', []);

app.controller('drinkersList', [
  '$scope',
  function($scope) {
    $scope.drinkersList = [];
    drinkers.find({
      query: {
        id: 0,
        $limit: 1000
      }
    }).then(
      function(response) {
        $scope.$apply(() => {
          $scope.drinkersList = response.data;
          console.log($scope.drinkersList);
        });
      });
  }
]);

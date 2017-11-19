'use strict'

const query = feathersClient.service('/query');

query.find({
  query: {
    rawQuery: "SELECT * FROM bars WHERE name like '%bar%'" // Insert query here
  }
}).then(response => {
  console.log(response);
});

let friendsApp = angular.module('friendsApp', []);

friendsApp.controller('drinkersList', [
  '$scope',
  function($scope) {
    $scope.drinkersList = [];
    drinkers.find({
      query: {
        id: {
          $ne: -1
        },
        $limit: 12000
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


friendsApp.controller('friendsList', [
  '$scope',
  function($scope) {
    $('select').on("change",function() {
      var drinkerVal = $(this).val();
      jQuery('html, body').animate({
        scrollTop: jQuery('#followingResults').offset().top - 85
      }, 1000);
      $scope.followingList = [];
      following.find({
        query: {
          drinkerId: drinkerVal,
          $limit: 12000
        }
      }).then(
        function(response) {
          $scope.$apply(() => {
            $scope.drinkersList = response.data;
            $scope.friendsList = [];
            let i;
            for(i = 0; i < $scope.drinkersList.length; i++) {
              ratings.find({
                query: {
                  drinkerId: $scope.drinkersList[i].followingId,
                  $sort: {
                    dateTime: -1
                  },
                  $limit: 1
                }
              }).then(
                function(response) {
                  $scope.$apply(() => {
                    $scope.friendsList.push(response.data);
                  });
                });
            }

          });
        });
    });

  }
]);


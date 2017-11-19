'use strict';

let serverUrl = 'http://localhost:3030';
const feathersClient = feathers()
  .configure(feathers.rest(serverUrl).fetch(fetch));

const bars = feathersClient.service('/bars');
const sells = feathersClient.service('/sells');
const ratings = feathersClient.service('/ratings');
const drinkers = feathersClient.service('/drinkers');
const frequents = feathersClient.service('/frequents');

let app = angular.module('myApp', []);

app.controller('myCtrl', [
  '$scope',
  function($scope) {
    jQuery(document).ready(function(){
      $scope.ratingClick = function(id,name) {
        //console.log("in modal click");
        var modalBarId = id;
        var modalBarName = name;
        jQuery("#ratingsModal").on("show", function () {
          jQuery("body").addClass("modal-open");
        }).on("hidden", function () {
          jQuery("body").removeClass("modal-open")
        });
        $scope.sellsList = [];
        drinkers.find({
          query: {
            id: {
              $ne: -1
            },
            $limit: 1000 }
        }).then(
          function(response) {
            $scope.$apply(() => {
              $scope.drinkersList = response.data;
              $scope.barName = modalBarName;
              $scope.barId = modalBarId;
              console.log($scope.drinkersList);
            });
          });
      };
    });
    jQuery('#mainSearchForm').submit(function(event) {
      var inputVal = document.getElementById('mainSearchBar').value;
      var inputVal2 = document.getElementById('mainSearchBar2').value;
      $scope.barList = [];
      //console.log(inputVal);
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
          $scope.$apply(() => {
            $scope.searchInitiated = {totalResults: response.data.length};
            $scope.barList = response.data;
            $scope.barList[response.data.length-1].lastBar = 1;
            let i;
            $scope.isLoading = 1;
            for(i = 0; i < $scope.barList.length; i++){
              //console.log(i);
              ratings.find({
                query: {
                  barId: $scope.barList[i].id,
                  $limit: 1000
                }
              }).then(function(response2) {
                $scope.$apply(()=> {

                  let j;
                  let m;
                  let ratingAvg = [];
                  for(j = 0; j < response2.data.length; j++) {
                    let ratingSum = 0;
                    for(m = 0; m < j+1; m++) {
                      ratingSum += response2.data[m].rating;
                    }
                    response2.data[j].ratingAvgAtPoint = (((ratingSum/m)*100)/5).toPrecision(4);
                  }
                  //console.log(response2.data);
                  //console.log(ratingAvg);
                  let k;
                  let l;
                  for(k=0;k<$scope.barList.length;k++){
                    for(l=0;l<response2.data.length;l++){
                      if($scope.barList[k].id == response2.data[l].barId) {
                          $scope.barList[k].averageRating = response2.data[response2.data.length-1].ratingAvgAtPoint;
                          $scope.barList[k].totalRatings = response2.data.length
                      }
                    }
                  }
                  //console.log($scope.barList);
                });
              });
            }
          });
          if($scope.barList.length > 10) {
            setTimeout(function(){
              $scope.isLoading = 0;
            }, 3000);
          }
          else {
            $scope.isLoading = 0;
          }
      });

      //console.log($scope.barList);

    });
    jQuery(document).ready(function(){
      $scope.menuClick = function(id) {
        //console.log("in modal click");
        var modalBarId = id;
        jQuery("#myModal").on("show", function () {
          jQuery("body").addClass("modal-open");
        }).on("hidden", function () {
          jQuery("body").removeClass("modal-open")
        });
        $scope.sellsList = [];
        sells.find({
          query: {
            barId: modalBarId,
            $limit: 1000 }
        }).then(
          function(response) {
            $scope.$apply(() => {
              $scope.sellsList = response.data;
              $scope.barName = $scope.sellsList[0].barName;
              //console.log($scope.barName);
            });
          });
      };
    });
  }
]);


$(document).ready(function() {
  jQuery('#oldDrinkerRatingForm').submit(function() {
    let drinkerId = jQuery('#drinkersDropdown').val();
    let rating = document.getElementById('inputOldRating').value;
    let barName = document.getElementById('ratingsModalBarName').innerHTML;
    let barId = document.getElementById('ratingsModalBarId').innerHTML;
    let ratingDate = new Date();
    console.log(drinkerId,rating, barName, barId, ratingDate);
  });

  jQuery('#newDrinkerRatingForm').submit(function() {
    let drinkerName = document.getElementById('inputName').value;
    let drinkerAge = document.getElementById('inputAge').value;
    let drinkerGender = jQuery('#inputGender').val();
    let drinkerCity = document.getElemengtById('inputCity').value;
    let drinkerState = jQuery('#inputState').val();
    let newRating = document.getElementById('inputNewRating').value;
    let ratingDate = new Date();
    console.log(drinkerName, drinkerAge, drinkerGender, drinkerCity, drinkerState, newRating, ratingDate);
  });
});

//'http://maps.googleapis.com/maps/api/distancematrix/json?origins=$postcode2&destinations=$postcode1&mode=driving&language=en-EN&sensor=false"'

'use strict';

let serverUrl = 'https://localhost';
const feathersClient = feathers()
  .configure(feathers.rest(serverUrl).fetch(fetch));

const bars = feathersClient.service('/bars');
const sells = feathersClient.service('/sells');
const ratings = feathersClient.service('/ratings');
const drinkers = feathersClient.service('/drinkers');
const frequents = feathersClient.service('/frequents');
const checkin = feathersClient.service('/checkin');
const following = feathersClient.service('/following');
const barTimes = feathersClient.service('/barTimes');
const happyHour = feathersClient.service('/happyhour');
const query = feathersClient.service('/query');

let app = angular.module('myApp', []);

app.controller('myCtrl', [
  '$scope',
  function($scope) {
    jQuery(document).ready(function(){
      $scope.ratingClick = function(id,name) {
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
            $limit: 15000
          }
        }).then(
          function(response) {
            $scope.$apply(() => {
              $scope.drinkersList = response.data;
              $scope.barName = modalBarName;
              $scope.barId = modalBarId;
            });
          });
      };
    });
    jQuery(document).ready(function(){
      $scope.checkInClick = function(id,name) {
        var modalBarId = id;
        var modalBarName = name;
        jQuery("#ratingsModal").on("show", function () {
          jQuery("body").addClass("modal-open");
        }).on("hidden", function () {
          jQuery("body").removeClass("modal-open")
        });
        drinkers.find({
          query: {
            id: {
              $ne: -1
            },
            $limit: 10000 }
        }).then(
          function(response) {
            $scope.$apply(() => {
              $scope.drinkersList = response.data;
              $scope.barName = modalBarName;
              $scope.barId = modalBarId;
            });
          });
      };
    });
    jQuery(document).ready(function() {
      $scope.topRatedClick = function () {
        jQuery('#topRatedSearchForm').toggleClass("modalFormHidden");
      };
      jQuery('#topRatedSearchForm').submit(function(event) {
        var inputCity = document.getElementById('topRatedSearch').value;
        jQuery("#topRatedSearchForm")[0].reset();
        jQuery('#topResultsSpinner').removeClass().addClass("modalFormShown");
        query.find({
          query: {
            rawQuery: "SELECT * , Avg(R.rating) as AvgRating " +
            "FROM test.ratings R, test.bars B  WHERE R.barName = B.name AND " +
            "B.city LIKE '%"+inputCity+"%' GROUP BY R.barName " +
            "ORDER by AvgRating DESC LIMIT 10\n"
          }
        }).then(function(response) {
          $scope.$apply(() => {
            $scope.searchInitiated = {totalResults: response[0].length};
            $scope.barList = response[0];
            $scope.barList[response[0].length-1].lastBar = 1;
            let i;
            $scope.isLoading = 1;
            for(i = 0; i < $scope.barList.length; i++){
              query.find({
                query: {
                  rawQuery: "SELECT AVG(rating) as ratingAvg, COUNT(rating) as ratingCount, barId FROM test.ratings WHERE barId = "+$scope.barList[i].id+";"
                }
              }).then(response2 =>  {
                $scope.$apply(()=> {
                  $scope.rating = response2[0];
                  let i;
                  for(i = 0; i < $scope.barList.length; i++){
                    if($scope.barList[i].id == $scope.rating[0].barId)  {
                      $scope.barList[i].averageRating = ((($scope.rating[0].ratingAvg)/5)*100).toPrecision(4);
                      $scope.barList[i].numRatings = $scope.rating[0].ratingCount;
                    }
                  }
                });
              });
              setTimeout(function(){
                jQuery('html, body').animate({
                  scrollTop: jQuery('#searchResults1').offset().top -85
                }, 1000);
                jQuery('#topResultsSpinner').removeClass().addClass("modalFormHidden");
              }, 0);
              barTimes.find({
                query: {
                  barId : $scope.barList[i].id
                }
              }).then(function(response) {
                $scope.$apply(() => {
                  for(i = 0; i < $scope.barList.length; i++) {
                    if($scope.barList[i].id === response.data[0].barId){
                      let openTime = new Date();
                      openTime.setHours(response.data[0].openTime[0]+''+response.data[0].openTime[1],response.data[0].openTime[3]+''+response.data[0].openTime[4],response.data[0].openTime[6]+''+response.data[0].openTime[7]);
                      let closeTime = new Date();
                      closeTime.setHours(response.data[0].closeTime[0]+''+response.data[0].closeTime[1],response.data[0].closeTime[3]+''+response.data[0].closeTime[4],response.data[0].closeTime[6]+''+response.data[0].closeTime[7]);

                      let currentTime = new Date();
                      if(closeTime.getHours() <= 5) {
                        closeTime.setDate(closeTime.getDate()+1);
                        currentTime.setDate(currentTime.getDate()+1);
                      }
                      if(currentTime > openTime && currentTime < closeTime) {
                        $scope.barList[i].isOpen = 1;
                      }
                      else {
                        $scope.barList[i].isOpen = 0;
                      }
                      $scope.barList[i].openTime = response.data[0].openTime[0]+''+response.data[0].openTime[1]+':'+response.data[0].openTime[3]+''+response.data[0].openTime[4];
                      $scope.barList[i].closeTime = response.data[0].closeTime[0]+''+response.data[0].closeTime[1]+':'+response.data[0].closeTime[3]+''+response.data[0].closeTime[4];
                    }
                  }
                });
              });
              happyHour.find({
                query: {
                  barId: $scope.barList[i].id
                }
              }).then(function(response) {
                $scope.$apply(()=> {
                  for(i = 0; i < $scope.barList.length; i++) {
                    if($scope.barList[i].id === response.data[0].barId){
                      $scope.barList[i].daysList = '';
                      for(var k = 0; k < response.data[0].day.length; k++){
                        if(response.data[0].day[k] == 1) {
                          switch(k) {
                            case 0:
                              $scope.barList[i].daysList += 'S ';
                              break;
                            case 1:
                              $scope.barList[i].daysList += 'M ';
                              break;
                            case 2:
                              $scope.barList[i].daysList += 'T ';
                              break;
                            case 3:
                              $scope.barList[i].daysList += "W ";
                              break;
                            case 4:
                              $scope.barList[i].daysList += "TH ";
                              break;
                            case 5:
                              $scope.barList[i].daysList += "F ";
                              break;
                            case 6:
                              $scope.barList[i].daysList += "SA ";
                          }
                        }
                      }
                      $scope.barList[i].startTime = response.data[0].startTime[0]+''+response.data[0].startTime[1]+':'+response.data[0].startTime[3]+''+response.data[0].startTime[4];
                      $scope.barList[i].endTime = response.data[0].endTime[0]+''+response.data[0].endTime[1]+':'+response.data[0].endTime[3]+''+response.data[0].endTime[4];

                      let openTime = new Date();
                      openTime.setHours(response.data[0].startTime[0]+''+response.data[0].startTime[1],response.data[0].startTime[3]+''+response.data[0].startTime[4],response.data[0].startTime[6]+''+response.data[0].startTime[7]);
                      let closeTime = new Date();
                      closeTime.setHours(response.data[0].endTime[0]+''+response.data[0].endTime[1],response.data[0].endTime[3]+''+response.data[0].endTime[4],response.data[0].endTime[6]+''+response.data[0].endTime[7]);
                      let j = 1;  //MONDAY
                      if(response.data[0].day[j]) {
                        let currentTime = new Date();
                        if(currentTime > openTime && currentTime < closeTime && currentTime.getDay() == j) {
                          $scope.barList[i].isHappyHour = 1;
                        }
                      }
                      j = 2;  //TUESDAY
                      if(response.data[0].day[j]) {
                        let currentTime = new Date();
                        if(currentTime > openTime && currentTime < closeTime && currentTime.getDay() == j) {
                          $scope.barList[i].isHappyHour = 1;
                        }
                      }
                      j = 3;  //WEDNESDAY
                      if(response.data[0].day[j]) {
                        let currentTime = new Date();
                        if(currentTime > openTime && currentTime < closeTime && currentTime.getDay() == j) {
                          $scope.barList[i].isHappyHour = 1;
                        }
                      }
                      j = 4;  //Thursday
                      if(response.data[0].day[j]) {
                        let currentTime = new Date();
                        if(currentTime > openTime && currentTime < closeTime && currentTime.getDay() == j) {
                          $scope.barList[i].isHappyHour = 1;
                        }
                      }
                      j = 5;  //FRIDAY
                      if(response.data[0].day[j]) {
                        let currentTime = new Date();
                        if(currentTime > openTime && currentTime < closeTime && currentTime.getDay() == j) {
                          $scope.barList[i].isHappyHour = 1;
                        }
                      }
                    }
                  }
                });
              });

            }

          });
          setTimeout(function(){
            $scope.isLoading = 0;
          }, ($scope.barList.length)*10);

        });
      });
    });

    jQuery('#mainSearchForm').submit(function(event) {
      var inputVal = document.getElementById('mainSearchBar').value;
      var inputVal2 = document.getElementById('mainSearchBar2').value;
      $scope.barList = [];
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
              query.find({
                query: {
                  rawQuery: "SELECT AVG(rating) as ratingAvg, COUNT(rating) as ratingCount, barId FROM test.ratings WHERE barId = "+$scope.barList[i].id+";"
                }
              }).then(response2 =>  {
                $scope.$apply(()=> {
                  $scope.rating = response2[0];
                  let i;
                  for(i = 0; i < $scope.barList.length; i++){
                    if($scope.barList[i].id == $scope.rating[0].barId)  {
                      $scope.barList[i].averageRating = ((($scope.rating[0].ratingAvg)/5)*100).toPrecision(4);
                      $scope.barList[i].numRatings = $scope.rating[0].ratingCount;
                    }
                  }
                });
              });
              barTimes.find({
                query: {
                  barId : $scope.barList[i].id
                }
              }).then(function(response) {
                $scope.$apply(() => {
                  for(i = 0; i < $scope.barList.length; i++) {
                    if($scope.barList[i].id === response.data[0].barId){
                      let openTime = new Date();
                      openTime.setHours(response.data[0].openTime[0]+''+response.data[0].openTime[1],response.data[0].openTime[3]+''+response.data[0].openTime[4],response.data[0].openTime[6]+''+response.data[0].openTime[7]);
                      let closeTime = new Date();
                      closeTime.setHours(response.data[0].closeTime[0]+''+response.data[0].closeTime[1],response.data[0].closeTime[3]+''+response.data[0].closeTime[4],response.data[0].closeTime[6]+''+response.data[0].closeTime[7]);
                      let currentTime = new Date();
                      if(closeTime.getHours() <= 5) {
                        closeTime.setDate(closeTime.getDate()+1);
                        currentTime.setDate(currentTime.getDate()+1);
                      }
                      if(currentTime > openTime && currentTime < closeTime) {
                        $scope.barList[i].isOpen = 1;
                      }
                      else {
                        $scope.barList[i].isOpen = 0;
                      }
                      $scope.barList[i].openTime = response.data[0].openTime[0]+''+response.data[0].openTime[1]+':'+response.data[0].openTime[3]+''+response.data[0].openTime[4];
                      $scope.barList[i].closeTime = response.data[0].closeTime[0]+''+response.data[0].closeTime[1]+':'+response.data[0].closeTime[3]+''+response.data[0].closeTime[4];
                    }
                  }
                });
              });
              happyHour.find({
                query: {
                  barId: $scope.barList[i].id
                }
              }).then(function(response) {
                $scope.$apply(()=> {
                  for(i = 0; i < $scope.barList.length; i++) {
                    if($scope.barList[i].id === response.data[0].barId){
                      $scope.barList[i].daysList = '';
                      for(var k = 0; k < response.data[0].day.length; k++){
                        if(response.data[0].day[k] == 1) {
                          switch(k) {
                            case 0:
                              $scope.barList[i].daysList += 'S ';
                              break;
                            case 1:
                              $scope.barList[i].daysList += 'M ';
                              break;
                            case 2:
                              $scope.barList[i].daysList += 'T ';
                              break;
                            case 3:
                              $scope.barList[i].daysList += "W ";
                              break;
                            case 4:
                              $scope.barList[i].daysList += "TH ";
                              break;
                            case 5:
                              $scope.barList[i].daysList += "F ";
                              break;
                            case 6:
                              $scope.barList[i].daysList += "SA ";
                          }
                        }
                      }
                      $scope.barList[i].startTime = response.data[0].startTime[0]+''+response.data[0].startTime[1]+':'+response.data[0].startTime[3]+''+response.data[0].startTime[4];
                      $scope.barList[i].endTime = response.data[0].endTime[0]+''+response.data[0].endTime[1]+':'+response.data[0].endTime[3]+''+response.data[0].endTime[4];

                      let openTime = new Date();
                      openTime.setHours(response.data[0].startTime[0]+''+response.data[0].startTime[1],response.data[0].startTime[3]+''+response.data[0].startTime[4],response.data[0].startTime[6]+''+response.data[0].startTime[7]);
                      let closeTime = new Date();
                      closeTime.setHours(response.data[0].endTime[0]+''+response.data[0].endTime[1],response.data[0].endTime[3]+''+response.data[0].endTime[4],response.data[0].endTime[6]+''+response.data[0].endTime[7]);
                      let j = 1;  //MONDAY
                      if(response.data[0].day[j]) {
                        let currentTime = new Date();
                        if(currentTime > openTime && currentTime < closeTime && currentTime.getDay() == j) {
                          $scope.barList[i].isHappyHour = 1;
                        }
                      }
                      j = 2;  //TUESDAY
                      if(response.data[0].day[j]) {
                        let currentTime = new Date();
                        if(currentTime > openTime && currentTime < closeTime && currentTime.getDay() == j) {
                          $scope.barList[i].isHappyHour = 1;
                        }
                      }
                      j = 3;  //WEDNESDAY
                      if(response.data[0].day[j]) {
                        let currentTime = new Date();
                        if(currentTime > openTime && currentTime < closeTime && currentTime.getDay() == j) {
                          $scope.barList[i].isHappyHour = 1;
                        }
                      }
                      j = 4;  //Thursday
                      if(response.data[0].day[j]) {
                        let currentTime = new Date();
                        if(currentTime > openTime && currentTime < closeTime && currentTime.getDay() == j) {
                          $scope.barList[i].isHappyHour = 1;
                        }
                      }
                      j = 5;  //FRIDAY
                      if(response.data[0].day[j]) {
                        let currentTime = new Date();
                        if(currentTime > openTime && currentTime < closeTime && currentTime.getDay() == j) {
                          $scope.barList[i].isHappyHour = 1;
                        }
                      }
                    }
                  }
                });
              });

            }

          });
        setTimeout(function(){
          jQuery('html, body').animate({
            scrollTop: jQuery('#searchResults1').offset().top -85
          }, 1000);
          $scope.isLoading = 0;
        }, 0);
        setTimeout(function(){
          $scope.isLoading = 0;
        }, ($scope.barList.length)*10);
      });


    });

    jQuery(document).ready(function(){
      $scope.menuClick = function(id) {
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
    let barName = document.getElementById('ratingsModalBarName').innerText;
    let barId = document.getElementById('ratingsModalBarId').innerHTML;
    ratings.create({
      barId: barId,
      barName: barName,
      drinkerId: drinkerId,
      rating: rating
    }).catch(error => {
      alert(error.message);
    }).then(response => {
      alert("Successfully submitted rating for " + barName + ".");
    });
  });
  jQuery('#newDrinkerRatingForm').submit(function() {
    const drinkerName = document.getElementById('inputName').value;
    const drinkerAge = Number.parseInt(document.getElementById('inputAge').value);
    const drinkerGender = jQuery('#inputGender').val();
    const drinkerCity = document.getElementById('inputCity').value;
    const drinkerZip = Number.parseInt(document.getElementById('inputZip').value);
    const drinkerState = jQuery('#inputState').val();
    const newRating = Number.parseInt(document.getElementById('inputNewRating').value);
    const barName = document.getElementById('ratingsModalBarName').innerText;
    const barId = Number.parseInt(document.getElementById('ratingsModalBarId').innerHTML);

    if (newRating < 1 || newRating > 5) {
      alert("Rating must be a value between 1 and 5.");
    } else if (!Number.isInteger(Number.parseInt(newRating))) {
      alert("Ratings must be an integer.");
    } else {
      drinkers.create({
        name: drinkerName,
        gender: drinkerGender,
        age: drinkerAge,
        city: drinkerCity,
        state: drinkerState,
        zipcode: drinkerZip
      }).catch(error => {
        alert(error.message);
      }).then(response => {
        ratings.create({
          barId: barId,
          barName: barName,
          drinkerId: response.id,
          rating: newRating
        }).then(response => {
          alert("Successfuly created drinker and submitted rating.");
        }).catch(error => {
          alert(error.message);
        });
      });
    }
  });

  jQuery('#oldDrinkerCheckInForm').submit(function() {
    let drinkerVal1 = jQuery('#drinkersCheckInDropdown').val();
    drinkerVal1 = drinkerVal1.split(',');
    const drinkerId = drinkerVal1[0];
    const drinkerName = drinkerVal1[1];
    const barName = document.getElementById('ratingsModalBarName').innerText;
    const barId = document.getElementById('ratingsModalBarId').innerHTML;
    checkin.create({
      barId: barId,
      barName: barName,
      drinkerId: drinkerId,
      drinkerName: drinkerName
    }).then(response => {
      alert("Successfully checked into " + barName);
    }).catch(error => {
      alert(error.message);
    });
  });

  jQuery('#newDrinkerCheckInForm').submit(function() {
    const drinkerName = document.getElementById('inputName2').value;
    const drinkerAge = Number.parseInt(document.getElementById('inputAge2').value);
    const drinkerGender = jQuery('#inputGender2').val();
    const drinkerCity = document.getElementById('inputCity2').value;
    const drinkerZip = Number.parseInt(document.getElementById('inputZip2').value);
    const drinkerState = jQuery('#inputState2').val();
    const barName = document.getElementById('ratingsModalBarName').innerText;
    const barId = document.getElementById('ratingsModalBarId').innerHTML;

    drinkers.create({
      name: drinkerName,
      gender: drinkerGender,
      age: drinkerAge,
      city: drinkerCity,
      state: drinkerState,
      zipcode: drinkerZip
    }).then(response => {
      checkin.create({
        barId: barId,
        barName: barName,
        drinkerId: response.id,
        drinkerName: drinkerName
      }).then(response => {
        alert("Sucessfully checked into " + barName);
      }).catch(error => {
        alert(error.message);
      });
    }).catch(error => {
      alert(error.message);
    });
  })
});

//'http://maps.googleapis.com/maps/api/distancematrix/json?origins=$postcode2&destinations=$postcode1&mode=driving&language=en-EN&sensor=false"'

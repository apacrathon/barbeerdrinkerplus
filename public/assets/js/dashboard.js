'use strict';


let managerApp = angular.module('myApp2', ['ngTable']);


managerApp.controller('managerBarList', [
  '$scope',
  function($scope) {
    $scope.barList = [];
    bars.find({
      query: {
        id: {
          $ne: -1
        },
        $limit: 1000 }
    }).then(
      function(response) {
        $scope.$apply(() => {
          $scope.barList = response.data;
        });
      });
  }
]);

managerApp.controller('managerGraphs', [
  '$scope', 'NgTableParams', '$filter',
  function($scope, NgTableParams, $filter) {
    $('select').on("change",function(){
      var barValue = $(this).val();
      jQuery('html, body').animate({
        scrollTop: jQuery('#myDiv').offset().top -85
      }, 1000);

      checkin.find({
        query: {
          barId: barValue,
          $limit: 1000
        }
      }).then(
        function(response) {
          $scope.$apply(() => {
            $scope.checkinData = response.data;
            let i;
            $scope.checkinData.sort(
              function(a,b) {
                var dateA = new Date(a.checkInTime);
                var dateB = new Date(b.checkInTime);

                return dateA - dateB;
              }
            );
            var offset = new Date().getTimezoneOffset();
            var offsetHours = offset/60;
            var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            var dayCounter = [0,0,0,0,0,0,0];
            for(i = 0; i < $scope.checkinData.length; i++){
              let dateList = new Date($scope.checkinData[i].checkInTime);
              // dateList.setHours(dateList.getHours()+offsetHours);
              // dateList = new Date(dateList);
              $scope.checkinData[i].dayOfWeek = days[dateList.getDay()];
              dayCounter[dateList.getDay()]++;
            };

            var data1 = [{
              x: days,
              y: dayCounter,
              type: 'bar'
            }];

            var layout1 =
              {
                title: $scope.checkinData[0].barName + ' Popularity',
                titlefont: {
                  size: 28,
                  family: 'Raleway, sans-serif'
                },
                xaxis: {
                  title: 'Time',
                  type: 'text'
                },
                yaxis: {
                  title: 'Rating',
                  type: 'linear'
                }
              }

            Plotly.newPlot('checkinDiv', data1, layout1);


          });
        }
      );


      frequents.find({
        query: {
          barId: barValue,
          $limit: 1000
        }
      }).then(
        function(response) {
          $scope.$apply(() => {
            $scope.frequentsList = response.data;
            $scope.frequentingDrinkers = [];
            let i;
            for(i = 0; i < $scope.frequentsList.length-1; i++) {
              drinkers.find({
                query: {
                  id: $scope.frequentsList[i].drinkerId,
                }
              }).then(
                function(response) {
                  $scope.$apply(() => {
                    //console.log(response.data[0]);
                    $scope.frequentingDrinkers.push(response.data[0]);
                    $scope.frequentsTable = new NgTableParams({
                      page: 1,
                      count: 15
                    }, {
                      total: $scope.frequentingDrinkers.length,
                      getData: function (params) {
                        $scope.data1 = params.sorting() ? $filter('orderBy')($scope.frequentingDrinkers, params.orderBy()) : $scope.frequentingDrinkers;
                        $scope.data1 = params.filter() ? $filter('filter')($scope.data1, params.filter()) : $scope.data1;
                        $scope.data1 = $scope.data1.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        return $scope.data1;
                      }
                    });
                  });
                });
            }
            console.log($scope.frequentingDrinkers.length);
          });
        });

      ratings.find({
        query: {
          barId: barValue,
          $limit: 1000
        }
      }).then(
        function(response) {
          $scope.$apply(() => {
            $scope.barData = response.data;
            var i = 0;
            var ratingDay = [];
            var ratingNum = [];
            $scope.barData.sort(
              function(a,b) {
                var dateA = new Date(a.dateTime);
                var dateB = new Date(b.dateTime);

                return dateA - dateB;
              }
            );

            //console.log($scope.barData);
            for(i = 0; i < $scope.barData.length; i++) {
              var dateList = $scope.barData[i].dateTime;
              var newDate = new Date(dateList);
              var sFullYear = newDate.getFullYear();
              var sMonth = newDate.getMonth()+1;
              var sDate = newDate.getDate();
              var sHours = newDate.getHours();
              var sMinutes = newDate.getMinutes();
              var sSeconds = newDate.getSeconds();
              if (sMonth < 10) sMonth = "0" + sMonth;
              if (sHours < 10) sHours = "0" + sHours;
              if (sDate < 10) sDate = "0" + sDate;
              if (sMinutes < 10) sMinutes = "0" + sMinutes;
              if (sSeconds < 10) sSeconds = "0" + sSeconds;
              var ratingDate = sFullYear+'-'+sMonth+'-'+sDate+' '+sHours+':'+sMinutes+':'+sSeconds;
              ratingDay.push(ratingDate);
              ratingNum.push($scope.barData[i].rating);
              //ratingSum += $scope.barData[i].rating;
              let ratingSum = 0;
              let m;
              for(m = 0; m < i+1; m++) {
                ratingSum += $scope.barData[m].rating;
              }
              $scope.barData[i].ratingAvgAtPoint = (ratingSum/m);
              $scope.barData[i].ratingDay = ratingDay[i].toString();
            }
            var ratingAvgArr = [];
            for(i = 0; i < $scope.barData.length; i++) {
              ratingAvgArr.push($scope.barData[i].ratingAvgAtPoint);
            }
            //console.log(ratingAvgArr);
            var data = [
              {
                x: ratingDay,
                y: ratingNum,
                type: 'scatter',
                mode: "lines",
                name: 'Rating'
              },
              {
                x: ratingDay,
                y: ratingAvgArr,
                type: 'scatter',
                mode: "lines",
                name: 'Average'
              }
            ];

            var layout =
              {
                title: 'Ratings for '+ $scope.barData[0].barName,
                titlefont: {
                  size: 28,
                  family: 'Raleway, sans-serif'
                },
                xaxis: {
                  title: 'Time',
                  autorange: true,
                  rangeslider: { range: [ratingDay[0], ratingDay[ratingDay.length-1]] },
                  type: 'date'
                },
                yaxis: {
                  title: 'Rating',
                  autorate: true,
                  range: [0,6],
                  type: 'linear'
                }
              }
              //console.log($scope.barData[5]);
            Plotly.newPlot('myDiv', data, layout);
            //console.log($scope.barData[0].drinkerId);
            for(i = 0; i < $scope.barData.length-1; i++) {
              drinkers.find({
                query: {
                  id: $scope.barData[i].drinkerId,
                }
              }).then(
                function (response3) {
                  $scope.$apply(() => {
                    //console.log(i + " ID " + response3.data[0].id + " " + response3.data[0].name);
                    for(i = 0; i < $scope.barData.length-1; i++) {
                      if($scope.barData[i].drinkerId == response3.data[0].id) {
                        $scope.barData[i].drinkerName = response3.data[0].name;
                      }
                    }
                  });
                });
            }
            console.log($scope.barData);
            $scope.ratingsTable = new NgTableParams({
              page: 1,
              count: 15
            }, {
              total: $scope.barData.length,
              getData: function (params) {
                $scope.data = params.sorting() ? $filter('orderBy')($scope.barData, params.orderBy()) : $scope.barData;
                $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
                $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                return $scope.data;
              }
            });
          });
        });
    });
  }
]);

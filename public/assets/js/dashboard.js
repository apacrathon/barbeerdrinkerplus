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
              var sFullYear = dateList.getFullYear();
              var sMonth = dateList.getMonth()+1;
              var sDate = dateList.getDate();
              var sHours = dateList.getHours();
              var sMinutes = dateList.getMinutes();
              var sSeconds = dateList.getSeconds();
              if (sMonth < 10) sMonth = "0" + sMonth;
              if (sHours < 10) sHours = "0" + sHours;
              if (sDate < 10) sDate = "0" + sDate;
              if (sMinutes < 10) sMinutes = "0" + sMinutes;
              if (sSeconds < 10) sSeconds = "0" + sSeconds;
              $scope.checkinData[i].checkedInAtDate = sFullYear+'-'+sMonth+'-'+sDate;
              $scope.checkinData[i].checkedInAtTime = sHours+':'+sMinutes;
            };

            var data = [{
              x: days,
              y: dayCounter,
              type: 'bar'
            }];

            var layout =
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

            Plotly.newPlot('checkinDiv', data, layout);
            console.log($scope.checkinData);
            $scope.checkInTable = new NgTableParams({
              page: 1,
              count: 15
            }, {
              total: $scope.checkinData.length,
              getData: function (params) {
                $scope.data3 = params.sorting() ? $filter('orderBy')($scope.checkinData, params.orderBy()) : $scope.checkinData;
                $scope.data3 = params.filter() ? $filter('filter')($scope.data3, params.filter()) : $scope.data3;
                $scope.data3 = $scope.data3.slice((params.page() - 1) * params.count(), params.page() * params.count());
                return $scope.data3;
              }
            });

          });
        }
      );

      // ratings.find({
      //   query: {
      //     barId: barValue,
      //     $limit: 1000
      //   }
      // }).then(
      //   function(response) {
      //     $scope.$apply(() => {
      //       $scope.barData = response.data;
      //       var i = 0;
      //       var ratingDay = [];
      //       var ratingNum = [];
      //
      //
      //       //console.log($scope.barData);
      //       for(i = 0; i < $scope.barData.length; i++) {
      //         var dateList = $scope.barData[i].dateTime;
      //         var newDate = new Date(dateList);
      //         var sFullYear = newDate.getFullYear();
      //         var sMonth = newDate.getMonth()+1;
      //         var sDate = newDate.getDate();
      //         var sHours = newDate.getHours();
      //         var sMinutes = newDate.getMinutes();
      //         var sSeconds = newDate.getSeconds();
      //         if (sMonth < 10) sMonth = "0" + sMonth;
      //         if (sHours < 10) sHours = "0" + sHours;
      //         if (sDate < 10) sDate = "0" + sDate;
      //         if (sMinutes < 10) sMinutes = "0" + sMinutes;
      //         if (sSeconds < 10) sSeconds = "0" + sSeconds;
      //         var ratingDate = sFullYear+'-'+sMonth+'-'+sDate+' '+sHours+':'+sMinutes+':'+sSeconds;
      //         ratingDay.push(ratingDate);
      //         ratingNum.push($scope.barData[i].rating);
      //         //ratingSum += $scope.barData[i].rating;
      //         let ratingSum = 0;
      //         let m;
      //         for(m = 0; m < i+1; m++) {
      //           ratingSum += $scope.barData[m].rating;
      //         }
      //         $scope.barData[i].ratingAvgAtPoint = (ratingSum/m);
      //         $scope.barData[i].ratingDay = ratingDay[i].toString();
      //       }
      //       var ratingAvgArr = [];
      //       for(i = 0; i < $scope.barData.length; i++) {
      //         ratingAvgArr.push($scope.barData[i].ratingAvgAtPoint);
      //       }
      //       //console.log(ratingAvgArr);
      //       var data = [
      //         {
      //           x: ratingDay,
      //           y: ratingNum,
      //           type: 'scatter',
      //           mode: "lines",
      //           name: 'Rating'
      //         },
      //         {
      //           x: ratingDay,
      //           y: ratingAvgArr,
      //           type: 'scatter',
      //           mode: "lines",
      //           name: 'Average'
      //         }
      //       ];
      //
      //       var layout =
      //         {
      //           title: 'Ratings for '+ $scope.barData[0].barName,
      //           titlefont: {
      //             size: 28,
      //             family: 'Raleway, sans-serif'
      //           },
      //           xaxis: {
      //             title: 'Time',
      //             autorange: true,
      //             rangeslider: { range: [ratingDay[0], ratingDay[ratingDay.length-1]] },
      //             type: 'date'
      //           },
      //           yaxis: {
      //             title: 'Rating',
      //             autorate: true,
      //             range: [0,6],
      //             type: 'linear'
      //           }
      //         }
      //         //console.log($scope.barData[5]);
      //       Plotly.newPlot('myDiv', data, layout);
      //       //console.log($scope.barData[0].drinkerId);
      //       for(i = 0; i < $scope.barData.length; i++) {
      //         drinkers.find({
      //           query: {
      //             id: $scope.barData[i].drinkerId,
      //           }
      //         }).then(
      //           function (response3) {
      //             $scope.$apply(() => {
      //               //console.log(i + " ID " + response3.data[0].id + " " + response3.data[0].name);
      //               for(i = 0; i < $scope.barData.length; i++) {
      //                 if($scope.barData[i].drinkerId == response3.data[0].id) {
      //                   $scope.barData[i].drinkerName = response3.data[0].name;
      //                 }
      //               }
      //             });
      //           });
      //       }
      //       console.log($scope.barData);
      //       $scope.ratingsTable = new NgTableParams({
      //         page: 1,
      //         count: 15
      //       }, {
      //         total: $scope.barData.length,
      //         getData: function (params) {
      //           $scope.data = params.sorting() ? $filter('orderBy')($scope.barData, params.orderBy()) : $scope.barData;
      //           $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
      //           $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
      //           return $scope.data;
      //         }
      //       });
      //     });
      //   });

      query.find({
        query: {
          rawQuery: "SELECT * FROM test.ratings R, test.drinkers D WHERE R.barId = "+barValue+" AND D.id = R.drinkerId ORDER BY dateTime ASC;"
        }
      }).then(response => {
        $scope.$apply(() => {
          console.log(response[0]);
          $scope.barData = response[0];
          var i = 0;
          var ratingDay = [];
          var ratingNum = [];
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

      query.find({
        query: {
          rawQuery: "SELECT * FROM test.drinkers D, test.frequents F WHERE barId = "+barValue+" AND D.id = F.drinkerId;"
        }
      }).then(response => {
        $scope.$apply(() => {
          $scope.frequentingDrinkers = response[0];
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
        })
      });
      query.find({
        query: {
          rawQuery: "SELECT L.drinkName, " +
          "COUNT(*) AS likesCount FROM test.likes L WHERE drinkerId IN " +
          "(SELECT F.drinkerId FROM test.frequents F WHERE barId = "+barValue+") " +
          "GROUP BY L.drinkName ORDER BY COUNT(*) DESC LIMIT 10;"
        }
      }).then(response => {
        $scope.$apply(() => {
          $scope.likesData = response[0];
          let i;
          let likesNames = [];
          let likesNum = [];
          let likesSum = 0;
          for(i = 0; i < $scope.likesData.length; i++) {
            likesSum += $scope.likesData[i].likesCount;
            likesNames.push($scope.likesData[i].drinkName);
            likesNum.push($scope.likesData[i].likesCount);
          }
          for(i = 0; i < $scope.likesData.length; i++) {
            likesNum[i] = ((likesNum[i])/(likesSum))*100;
          }
          console.log(likesNum);
          var data = [{
            values: likesNum,
            labels: likesNames,
            type: 'pie'
          }];

          var layout = {
            title: 'What Your Loyal Customers Like',
            titlefont: {
              size: 28,
              family: 'Raleway, sans-serif'
            },
            height: 400,
            width: 500
          };

          Plotly.newPlot('likesDiv', data, layout);
        });
      });



    });
  }
]);

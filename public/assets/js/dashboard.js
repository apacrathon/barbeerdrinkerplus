'use strict';

const ratings = feathersClient.service('/ratings');



app.controller('managerGraphs', [
  '$scope',
  function($scope) {
    $('select').on("change",function(){
      var barValue = $(this).val();
      jQuery('html, body').animate({
        scrollTop: jQuery('#myDiv').offset().top -85
      }, 1000);
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
            var ratingSum = 0;
            $scope.barData.sort(
              function(a,b) {
                var dateA = new Date(a.dateTime);
                var dateB = new Date(b.dateTime);

                return dateA - dateB;
              }
            );
            console.log($scope.barData);
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
              ratingSum += $scope.barData[i].rating;
            }
            var ratingAvg = ratingSum / $scope.barData.length;
            var ratingAvgArr = []
            console.log(ratingAvg);
            for(i = 0; i < $scope.barData.length; i++) {
              ratingAvgArr.push(ratingAvg);
            }
            console.log(ratingAvgArr);
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

            Plotly.newPlot('myDiv', data, layout);
          });
        });
    });
  }
]);

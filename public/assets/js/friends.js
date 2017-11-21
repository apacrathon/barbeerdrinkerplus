'use strict'

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
        });
      });
  }
]);


friendsApp.controller('friendsList', [
  '$scope',
  function($scope) {
    $('select').on("change",function() {
      var drinkerVal1 = $(this).val();
      drinkerVal1 = drinkerVal1.split(',');
      var drinkerVal = drinkerVal1[0];
      var drinkerCity = drinkerVal1[1];
      var drinkerName = drinkerVal1[2];

      jQuery('html, body').animate({
        scrollTop: jQuery('#followingResults').offset().top - 85
      }, 1000);

      jQuery(document).ready(function(){
        $scope.followClick = function(id,name) {
          following.create({
            drinkerId: drinkerVal,
            drinkerName: drinkerName,
            followingId: id,
            followingName: name
          }).then(response => {
            let followButton = document.getElementById('drinker'+id);
              followButton.className = "btn btn-success";
              followButton.innerHTML = "Following";
          });
        };
      });
      query.find({
        query: {
          rawQuery: "SELECT * FROM test.following WHERE drinkerId = "+drinkerVal+";"
        }
      }).then(response => {
        $scope.$apply(() => {
          $scope.drinkersList = response[0];
          $scope.followingList = [];
          $scope.followingCheckinList = [];
          $scope.networkSize = $scope.drinkersList.length;
          let i;

          for(i = 0; i < $scope.drinkersList.length; i++) {
            query.find({
              query: {
                rawQuery: "SELECT R.barId, R.barName, R.drinkerId, " +
                "X.followingId, X.followingName, R.rating, R.dateTime " +
                "FROM test.ratings R, (SELECT * FROM test.following F WHERE F.drinkerId = "+drinkerVal+") X " +
                "WHERE R.drinkerId = "+$scope.drinkersList[i].followingId+" AND X.followingId = "+$scope.drinkersList[i].followingId+" " +
                "ORDER BY dateTime DESC LIMIT 1;",
                $sort: {
                  followingId: 1
                }
              }
            }).then(response => {
              $scope.$apply(() => {
                $scope.responseAns = response[0];
                $scope.responseAns[0].rating = ((($scope.responseAns[0].rating)/5)*100);
                $scope.followingList.push($scope.responseAns[0]);
              });
            });

            query.find({
              query: {
                rawQuery: "SELECT C.barId, C.barName, X.followingId, X.followingName, C.checkInTime FROM" +
                " test.checkin C, (SELECT * FROM test.following F WHERE F.drinkerId = "+drinkerVal+") X WHERE " +
                "C.drinkerId = "+$scope.drinkersList[i].followingId+" AND " +
                "X.followingId = "+$scope.drinkersList[i].followingId+" ORDER BY C.checkInTime DESC LIMIT 1;",
                $sort: {
                  followingId: 1
                }
              }
            }).then(response => {
              $scope.$apply(() => {
                $scope.responseAns = response[0];
                $scope.responseAns[0].checkedInAt = new Date($scope.responseAns[0].checkInTime);
                var newDate = $scope.responseAns[0].checkedInAt;
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
                $scope.responseAns[0].checkedInAtDate = sFullYear+'-'+sMonth+'-'+sDate;
                $scope.responseAns[0].checkedInAtTime = sHours+':'+sMinutes+':'+sSeconds;
                $scope.followingCheckinList.push($scope.responseAns[0]);
              });
            });
          }
          query.find({
            query: {
              rawQuery: "SELECT * FROM test.drinkers " +
              "D WHERE D.city = '"+drinkerCity+"' AND D.id != "+drinkerVal+" AND D.id NOT IN " +
              "(SELECT followingId FROM test.following WHERE drinkerId = "+drinkerVal+");"
            }
          }).then(response => {
            $scope.$apply(() => {
              $scope.nearbyPeople = response[0];
            });
            });


        });
      });


    });

  }
]);


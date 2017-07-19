var app = angular.module('myApp', []);
var list = {};
app.controller('myCtrl', function($scope, $filter, $http) {
    $http.get("http://zadanie.laboratorium.ee/users.json")
    .then(function (response) {
        $scope.usersList = response.data;
        list = $scope.usersList;

        $scope.activeUsers = 0;
        $scope.activeFemales = 0;
        $scope.activeMales = 0;
        $scope.lastSixMonths = 0;

        $scope.now = new Date();
        $scope.nowConverted = $scope.now.toString("yyyy-MM-dd");
        $scope.sixMonthsFromNow = new Date($scope.now.setMonth($scope.now.getMonth() - 6));
        $scope.sixMonthsFromNowConverted = $scope.sixMonthsFromNow.toString("M/d/yyyy");

        $scope.containerColor = document.getElementsByClassName('container');
        for (var i=0, lL=list.length; i<lL; i++) {
          if (list[i].active == true) {
            $scope.activeUsers++;
          for (var j=0, gL = list[i].gender.length; j < gL; j++) {
           if (list[i].active == true && list[i].gender[j] == "Female") {
            $scope.activeFemales++;
          } else if (list[i].active == true && list[i].gender[j] == "Male") {
            $scope.activeMales++;
          }
        };
      }
    };
        for (var i=0, lL = list.length; i < lL; i++) {
          if (new Date(list[i].last_login) >= new Date($scope.sixMonthsFromNowConverted)) {
            $scope.lastSixMonths++
          }
        }

        $scope.favoriteColor = function(user) {
          $('body').css('background-color', user.favorites.color);
        }

       $scope.usersData = function(user) {
         $scope.latitude = user.coordinates.lat;
         $scope.longitude = user.coordinates.lng;
         $('.info-full-name').text(user.first_name + ' ' + user.last_name);
         $('.avatar-box').css('background-image', 'url(' + user.avatar + ')');
         $('.info-email').text('E-mail address:  ' + user.email);
         $('.info-drugs').text('Favorite drugs:  ' + user.favorites.drugs.join(', '));
         $('.map-box').css('background-image', 'url(' + 'https://maps.googleapis.com/maps/api/staticmap?size=350x220&key=AIzaSyDBph6lWJgmsCY2dCNo_hodgm_3CdbmJIA&zoom=14&markers=' + $scope.latitude + ',' + $scope.longitude + ')');
       }
})
});

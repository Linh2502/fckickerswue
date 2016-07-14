/**
 * Created by Linh on 02.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * - final -
 */
angular.module('module.spielplan', ['ionicLazyLoad', 'dateFilter'])
  .controller('SpielplanCtrl', function($rootScope, $scope, $ionicModal, SpielplanService, $ionicSideMenuDelegate, $location, $ionicScrollDelegate, $timeout){
    $ionicSideMenuDelegate.canDragContent(true);
    var getCurrentDay = new Date().getTime();
    var showContent = false;
    $scope.anchorDate = null;
    $scope.matchListing = [];

    $scope.$on('$ionicView.beforeEnter', function() {
      $ionicSideMenuDelegate.toggleLeft(false);
      $rootScope.$broadcast('show_loader');
      SpielplanService.fetchSpielPlanData();
    });

    $rootScope.$on('show_content_spielplan', function() {
      setMatchListingFeed(SpielplanService.getData());
      showContent = true;
      console.log("request success spielplan");
    });

    $scope.$on('$ionicView.afterEnter', function() {
      hideLoader();
    });

    $scope.refresh = function(){
      SpielplanService.fetchSpielPlanData();
      setMatchListingFeed(SpielplanService.getData());
      $scope.$broadcast('scroll.refreshComplete');
    };

    function setMatchListingFeed(matches){
      for(var i = 0; i < matches.match.length; i++) {
        var splitDate = matches.match[i].eventdate_start.split(" ");
        var date = splitDate[0];
        var time = splitDate[1];
        $scope.matchListing.push({
          matchday: matches.match[i].matchday,
          date: date, time: time,
          team_home: matches.match[i].team_home,
          team_away: matches.match[i].team_away,
          logo_home: matches.match[i].logo_home,
          logo_away: matches.match[i].logo_away,
          result: matches.match[i].result
        });
        setAnchorDate(date, matches);
      }
    }

    function setAnchorDate(date, matches){
      var setDate = date.split("-");
      var splitDate = setDate[1] + "/" + setDate[2] + "/" + setDate[0];
      var compareDate = new Date(splitDate).getTime();
      if(getCurrentDay > compareDate){
        for(var i = 0; i < matches.match.length; i++){
          var splitDate2 = matches.match[i].eventdate_start.split(" ");
          var date2 = splitDate2[0];
          if(date2 == date){
            var splitDate3 = matches.match[i+1].eventdate_start.split(" ");
            $scope.anchorDate = splitDate3[0];
          }
        }
      }
    }

    function goToNextGame(){
      $location.hash($scope.anchorDate);
      $ionicScrollDelegate.$getByHandle('spielplan-scroll').anchorScroll(true);
      $ionicScrollDelegate.$getByHandle('spielplan-scroll').freezeScroll(false);
      $ionicScrollDelegate.$getByHandle('spielplan-scroll').resize();
    }

    function hideLoader(){
      if(showContent){
        $rootScope.$broadcast('hide_loader');
        $timeout(function(){
          goToNextGame();
        }, 500);
      }else{
        $timeout(function(){
          hideLoader();
        }, 1000);
      }
    }
  });

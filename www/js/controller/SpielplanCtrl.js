/**
 * Created by Linh on 02.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * status: 14.07.2016 3:40 PM
 */
(function () {
  'use strict';

  angular
    .module('module.spielplan', ['ionicLazyLoad', 'dateFilter'])
    .controller('SpielplanCtrl', SpielplanController);

  SpielplanController.$inject = ['$rootScope', '$scope', 'SpielplanService', '$ionicSideMenuDelegate', '$location', '$ionicScrollDelegate', '$timeout'];

  function SpielplanController($rootScope, $scope, SpielplanService, $ionicSideMenuDelegate, $location, $ionicScrollDelegate, $timeout) {
    $ionicSideMenuDelegate.canDragContent(true);
    var vm = this;
    vm.getCurrentDay = new Date().getTime();
    vm.anchorDate = null;
    vm.matchListing = [];
    vm.initialFeed = 15;
    vm.loadNextFeed = 5;
    vm.currentFeed = 0;
    vm.canLoadFeed = false;
    vm.matchData = null;

    vm._init = _init;
    vm.refresh = refresh;
    vm.loadFeed = loadFeed;

    function _init() {
      $rootScope.$broadcast('show_loader');
      SpielplanService.fetchSpielPlanData()
        .then(function(success) {
          vm.matchData = success;
          setMatchListingFeed(success, vm.initialFeed, vm.currentFeed);
          $timeout(function () {
            $rootScope.$broadcast('hide_loader');
            goToNextGame();
            vm.canLoadFeed = true;
          }, 500);
        });

    }

    function refresh() {
      vm.matchListing = [];
      vm.initialFeed = 15;
      vm.currentFeed = 0;
      vm.canLoadFeed = true;
      SpielplanService.fetchSpielPlanData()
        .then(function(success) {
          setMatchListingFeed(success, vm.initialFeed, vm.currentFeed);
          $scope.$broadcast('scroll.refreshComplete');
        });
    }

    function setMatchListingFeed(matches, matchLength, currentLength) {
      for (var i = currentLength; i < matchLength; i++) {
        var splitDate = matches.match[i].eventdate_start.split(" ");
        var date = splitDate[0];
        var time = splitDate[1];
        vm.matchListing.push({
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

    function setAnchorDate(date, matches) {
      var setDate = date.split("-");
      var splitDate = setDate[1] + "/" + setDate[2] + "/" + setDate[0];
      var compareDate = new Date(splitDate).getTime();
      if (vm.getCurrentDay > compareDate) {
        for (var i = 0; i < matches.match.length; i++) {
          var splitDate2 = matches.match[i].eventdate_start.split(" ");
          var date2 = splitDate2[0];
          if (date2 == date) {
            var splitDate3 = matches.match[i + 1].eventdate_start.split(" ");
            vm.anchorDate = splitDate3[0];
          }
        }
      }
    }

    function goToNextGame() {
      $location.hash(vm.anchorDate);
      $ionicScrollDelegate.$getByHandle('spielplan-scroll').anchorScroll(true);
      $ionicScrollDelegate.$getByHandle('spielplan-scroll').freezeScroll(false);
      $ionicScrollDelegate.$getByHandle('spielplan-scroll').resize();
    }

    function loadFeed() {
      vm.currentFeed = vm.initialFeed;

      if((vm.matchData.match.length - vm.initialFeed) < 5) {
        vm.initialFeed += (vm.matchData.match.length - vm.initialFeed);
        setMatchListingFeed(vm.matchData, vm.initialFeed, vm.currentFeed);
        $scope.$broadcast('scroll.infiniteScrollComplete');
      } else {
        vm.initialFeed += vm.loadNextFeed;
        setMatchListingFeed(vm.matchData, vm.initialFeed, vm.currentFeed);
        $scope.$broadcast('scroll.infiniteScrollComplete');
      }

      if(vm.initialFeed === vm.matchData.match.length) {
        vm.canLoadFeed = false;
      }
    }

    vm._init();
  }
})();

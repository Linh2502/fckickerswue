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

    vm._init = _init;
    vm.refresh = refresh;

    function _init() {
      $rootScope.$broadcast('show_loader');
      SpielplanService.fetchSpielPlanData()
        .then(function(success) {
          setMatchListingFeed(success);
          $timeout(function () {
            $rootScope.$broadcast('hide_loader');
            goToNextGame();
          }, 500);
        });

    }

    function refresh() {
      SpielplanService.fetchSpielPlanData()
        .then(function(success) {
          setMatchListingFeed(success);
          $scope.$broadcast('scroll.refreshComplete');
        });
    }

    function setMatchListingFeed(matches) {
      for (var i = 0; i < matches.match.length; i++) {
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

    vm._init();
  }
})();

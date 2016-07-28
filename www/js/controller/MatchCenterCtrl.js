/**
 * Created by Linh on 02.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * status: 14.07.2016 6:10 PM
 */
(function () {
  'use strict';

  angular
    .module('module.matchcenter', [])
    .controller('MatchCenterCtrl', MatchCenterController);

  MatchCenterController.$inject = ['$rootScope', '$timeout', 'MatchcenterService', '$ionicSideMenuDelegate', '$ionicPopup', '$ionicSlideBoxDelegate', '$stateParams', '$ionicScrollDelegate'];

  function MatchCenterController($rootScope, $timeout, MatchcenterService, $ionicSideMenuDelegate, $ionicPopup, $ionicSlideBoxDelegate, $stateParams, $ionicScrollDelegate) {
    $ionicSideMenuDelegate.canDragContent(true);
    var vm = this;
    vm.matchCenterFeed = null;
    vm.liveTickerFeed = [];
    vm.detailsFeed = [];
    vm.videosFeed = [];
    vm.tableFeed = [];
    vm.html = [];
    vm.isLive = false;
    vm.enableLiveTickerInfiniteScroll = false;

    vm._init = _init;
    vm.playVideo = playVideo;
    vm.previousView = previousView;
    vm.nextView = nextView;
    vm.freezeScroll = freezeScroll;
    vm.disableSwipe = disableSwipe;

    function _init() {
      $rootScope.$broadcast('show_loader');
      MatchcenterService.refreshLiveTicker()
        .then(function (success) {
          vm.detailsFeed = success.data.details;
          setLiveTickerFeed(success.data.liveticker);
          setVideosFeed(success.data.videos);
          setTableFeed(success.data.table);

          if ($stateParams.game != null) {
            if ($stateParams.game.isLive) {
              vm.isLive = true;
              $rootScope.isLive = true;
              $ionicSlideBoxDelegate.$getByHandle('matchcenter').slide(2);
              $('#standard').hide();
              refreshLiveTickerFeed();
            } else {
              $('#spinner').hide();
              vm.isLive = false;
              $ionicSlideBoxDelegate.$getByHandle('matchcenter').slide(1);
              $ionicSlideBoxDelegate.$getByHandle('matchcenter').slide(0);
            }
          } else {
            $('#spinner').hide();
            vm.isLive = false;
            $ionicSlideBoxDelegate.$getByHandle('matchcenter').slide(1);
            $ionicSlideBoxDelegate.$getByHandle('matchcenter').slide(0);
          }

          $timeout(function() {
            $rootScope.$broadcast('hide_loader');
          }, 500);
        });
    }

    function setLiveTickerFeed(liveticker) {
      vm.liveTickerFeed = [];
      for (var i = 0; i < liveticker.item.length; i++) {
        if (i < liveticker.item.length) {
          vm.liveTickerFeed.push({
            minute: checkIfHasValue(liveticker.item[i].minute),
            type: checkIfHasValue(liveticker.item[i].type),
            text: liveticker.item[i].text
          });
        }
      }
    }

    function checkIfHasValue(value) {
      if (typeof value === 'object') {
        return null;
      } else {
        return value;
      }
    }

    function setVideosFeed(videos) {
      vm.videosFeed = [];
      if (videos == undefined) {
        vm.videosFeed = null;
      } else {
        if (!videos.item.length) {
          vm.videosFeed.push(videos.item);
        } else {
          for (var i = 0; i < videos.item.length; i++) {
            vm.videosFeed.push(videos.item[i]);
          }
        }
      }
    }

    function setTableFeed(tables) {
      vm.tableFeed = [];
      for (var i = 0; i < tables.row.length; i++) {
        vm.tableFeed.push(tables.row[i]);
      }
    }

    function refreshLiveTickerFeed() {
      if (vm.isLive) {
        $timeout(function () {
          $('#spinner').hide();
          $('#live').fadeTo(1000, 1);
        }, 1500);
        MatchcenterService.refreshLiveTicker()
          .then(function (success) {
            vm.detailsFeed = success.data.details;
            vm.liveTickerFeed = [];
            setLiveTickerFeed(success.data.liveticker);
            $timeout(function () {
              $('#spinner').show();
              $('#live').fadeTo(1000, 0.25);
              refreshLiveTickerFeed();
            }, 10000);
          });
      }
    }

    function playVideo(player, video) {
      if (navigator.connection.type == Connection.NONE || navigator.connection.type == Connection.UNKNOWN) {
        $ionicPopup.alert({
          title: "Keine Internetverbindung",
          content: "Beim Herstellen der Verbindung zum Würzburger Kickers - Server ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut."
        }).then(function (res) {
        });
      } else {
        if (window.localStorage['WifiEnabled'] == 'true') {
          if (navigator.connection.type == Connection.WIFI) {
            $('#matchcenter-' + video.id).hide();
            $('.video-z-index').show();
            player.playVideo();
          } else {
            $ionicPopup.alert({
              title: "Keine WiFi-Verbindung vorhanden",
              content: "Sie sind nicht mit dem WiFi verbunden. Um Videos dennoch abspielen zu können, überprüfen Sie erneut Ihre Einstellungen."
            }).then(function (res) {
            });
          }
        } else {
          $('#matchcenter-' + video.id).hide();
          $('.video-z-index').show();
          player.playVideo();
        }
      }
    }

    function freezeScroll() {
      $ionicScrollDelegate.freezeAllScrolls(true);
      $timeout(function () {
        $ionicScrollDelegate.freezeAllScrolls(false);
      }, 1000);
    }

    function previousView() {
      if (!vm.isLive) {
        $ionicSlideBoxDelegate.previous();
      }
    }

    function nextView() {
      if (!vm.isLive) {
        $ionicSlideBoxDelegate.next();
      }
    }

    function disableSwipe() {
      $ionicSlideBoxDelegate.enableSlide(false);
    }

    vm._init();
  }
})();

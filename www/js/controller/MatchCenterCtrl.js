/**
 * Created by Linh on 02.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * status: 28.07.2016 6:10 PM
 */
(function () {
  'use strict';

  angular
    .module('module.matchcenter', [])
    .controller('MatchCenterCtrl', MatchCenterController);

  MatchCenterController.$inject = ['$rootScope', '$timeout', 'MatchcenterService', '$ionicSideMenuDelegate', '$ionicPopup', '$ionicSlideBoxDelegate', '$stateParams', '$ionicScrollDelegate', '$q'];

  function MatchCenterController($rootScope, $timeout, MatchcenterService, $ionicSideMenuDelegate, $ionicPopup, $ionicSlideBoxDelegate, $stateParams, $ionicScrollDelegate, $q) {
    $ionicSideMenuDelegate.canDragContent(true);
    var vm = this;
    vm.matchCenterFeed = false;
    vm.liveTickerFeed = false;
    vm.detailsFeed = [];
    vm.videosFeed = false;
    vm.tableFeed = null;
    vm.html = [];
    vm.isLive = false;
    vm.enableLiveTickerInfiniteScroll = false;
    vm.showTable = false;

    vm._init = _init;
    vm.playVideo = playVideo;
    vm.previousView = previousView;
    vm.nextView = nextView;
    vm.freezeScroll = freezeScroll;
    vm.disableSwipe = disableSwipe;
    vm.loadLiveTicker = loadLiveTicker;
    vm.loadVideosData = loadVideosData;
    vm.loadTableData = loadTableData;

    function _init() {
      vm.showTable = false;
      $rootScope.$broadcast('show_loader');
      MatchcenterService.refreshLiveTicker()
        .then(function (success) {
          vm.matchCenterFeed = success;
          vm.detailsFeed = success.data.details;

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

          $rootScope.$broadcast('hide_loader');
        });
    }

    function setLiveTickerFeed(liveticker) {
      var defer = $q.defer();
      vm.liveTickerFeed = [];
      for (var i = 0; i < liveticker.item.length; i++) {
        var minute = liveticker.item[i].minute;
        var type = liveticker.item[i].type;
        if(!minute) {
          minute = minute.replace("<![CDATA[", "").replace("]]>", "");
        }
        if(!type) {
          type = type.replace("<![CDATA[", "").replace("]]>", "");
        }

        vm.liveTickerFeed.push({
          minute: checkIfHasValue(minute.__cdata),
          type: checkIfHasValue(type.__cdata),
          text: liveticker.item[i].text
        });
        if(i+1 === liveticker.item.length) {
          defer.resolve();
        }
      }
      return defer.promise;
    }

    function checkIfHasValue(value) {
      if (typeof value === 'object') {
        return null;
      } else {
        return value;
      }
    }

    function setVideosFeed(videos) {
      var defer = $q.defer();
      vm.videosFeed = [];
      if (videos == undefined) {
        vm.videosFeed = null;
        defer.resolve();
      } else {
        if (!videos.item.length) {
          vm.videosFeed.push(videos.item);
          defer.resolve();
        } else {
          for (var i = 0; i < videos.item.length; i++) {
            vm.videosFeed.push(videos.item[i]);
            if(i+1 === videos.item.length) {
              defer.resolve();
            }
          }
        }
      }
      return defer.promise;
    }

    function setTableFeed(tables) {
      vm.showTable = true;
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

    function loadLiveTicker() {
      if(!vm.liveTickerFeed) {
        $('#spinner').show();
        setLiveTickerFeed(vm.matchCenterFeed.data.liveticker)
          .then(function(success) {
            $('#spinner').hide();
          }, function(error) {
          });
      }
    }

    function loadVideosData() {
      vm.showTable = true;
      if(!vm.videosFeed) {
        setVideosFeed(vm.matchCenterFeed.data.videos)
          .then(function(success) {
          }, function(error) {
          });
      }
    }

    function loadTableData() {
      vm.showTable = true;
      if(!vm.tableFeed) {
        setTableFeed(vm.matchCenterFeed.data.table)
          .then(function(success) {
          }, function(error) {
          });
      }
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

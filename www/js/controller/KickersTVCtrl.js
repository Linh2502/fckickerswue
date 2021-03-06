/**
 * Created by Linh on 02.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * status: 14.07.2016 3:04 PM
 */
(function () {
  angular
    .module('module.kickerstv', ['ionicLazyLoad'])
    .controller('KickersTVCtrl', KTVController);

  KTVController.$inject = ['$scope', '$rootScope', 'KickersTVService', '$ionicSideMenuDelegate', '$ionicPopup', '$timeout'];

  function KTVController($scope, $rootScope, KickersTVService, $ionicSideMenuDelegate, $ionicPopup, $timeout) {
    $ionicSideMenuDelegate.canDragContent(true);
    var vm = this;
    vm.videosFeed = [];

    vm._init = _init;
    vm.refresh = refresh;
    vm.playVideo = playVideo;

    function _init() {
      $rootScope.$broadcast('show_loader');
      KickersTVService.fetchKickersTVData()
        .then(function (success) {
          setVideosFeed(success);
          $timeout(function() {
            $rootScope.$broadcast('hide_loader');
          }, 2500);
        });
    }

    function refresh() {
      vm.videosFeed = [];
      KickersTVService.fetchKickersTVData()
        .then(function (success) {
          setVideosFeed(success);
          $timeout(function() {
            $scope.$broadcast('scroll.refreshComplete');
          }, 2500);
        });
    }

    function setVideosFeed(videos) {
      for (var i = 0; i < videos.item.length; i++) {
        videos.item[i].videoLink = '';
        vm.videosFeed.push(videos.item[i]);
      }
    }

    function playVideo(player, video) {
      video.videoLink = video.link;
      if (navigator.connection.type == Connection.NONE || navigator.connection.type == Connection.UNKNOWN) {
        $ionicPopup.alert({
          title: "Keine Internetverbindung",
          content: "Beim Herstellen der Verbindung zum Würzburger Kickers - Server ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut."
        }).then(function (res) {
        });
      } else {
        if (window.localStorage['WifiEnabled'] == 'true') {
          if (navigator.connection.type == Connection.WIFI) {
            $('#kickerstv-' + video.id).hide();
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
          $('#kickerstv-' + video.id).hide();
          $('.video-z-index').show();
          player.playVideo();
        }
      }
    }

    vm._init();
  }
})();

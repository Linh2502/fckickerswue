/**
 * Created by Linh on 02.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * - final -
 */
angular.module('module.kickerstv', ['ionicLazyLoad', 'loadingInterceptor'])
  .controller('KickersTVCtrl', function($rootScope, $scope, $ionicModal, KickersTVService, $ionicSideMenuDelegate, $ionicPopup, $timeout){
    $ionicSideMenuDelegate.canDragContent(true);
    var showContent = false;
    $scope.videosFeed = [];

    $scope.$on('$ionicView.beforeEnter', function() {
      $ionicSideMenuDelegate.toggleLeft(false);
      $rootScope.$broadcast('show_loader');
      KickersTVService.fetchKickersTVData().then(function(success) {
        setVideosFeed(KickersTVService.getData());
        showContent = true;
        hideLoader();
      });
    });

    $scope.refresh = function() {
      $scope.videosFeed = [];
      KickersTVService.fetchKickersTVData().then(function(success) {
        setVideosFeed(KickersTVService.getData());
        $scope.$broadcast('scroll.refreshComplete');
      });
    };

    function setVideosFeed(videos){
      for(var i = 0; i < videos.item.length; i++) {
        $scope.videosFeed.push(videos.item[i]);
      }
    }

    $scope.playVideo = function(player, video){
      if(navigator.connection.type == Connection.NONE || navigator.connection.type == Connection.UNKNOWN) {
        $ionicPopup.alert({
          title: "Keine Internetverbindung",
          content: "Beim Herstellen der Verbindung zum Würzburger Kickers - Server ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut."
        }).then(function(res) {
        });
      }else{
        if(window.localStorage['WifiEnabled'] == 'true'){
          if(navigator.connection.type == Connection.WIFI){
            $('#kickerstv-' + video.id).hide();
            $('.video-z-index').show();
            player.playVideo();
          }else{
            $ionicPopup.alert({
              title: "Keine WiFi-Verbindung vorhanden",
              content: "Sie sind nicht mit dem WiFi verbunden. Um Videos dennoch abspielen zu können, überprüfen Sie erneut Ihre Einstellungen."
            }).then(function(res) {
            });
          }
        }else{
          $('#kickerstv-' + video.id).hide();
          $('.video-z-index').show();
          player.playVideo();
        }
      }
    };

    function hideLoader(){
      if(showContent){
        $rootScope.$broadcast('hide_loader');
      }else{
        $timeout(function(){
          hideLoader();
        }, 1000);
      }
    }
  })

/**
 * Created by Linh on 24.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * - final -
 */
angular.module('module.internet', ['ionic'])
  .run(function($ionicPlatform, $state, $ionicHistory, AdvertisementService, $cordovaFile){
    $ionicPlatform.ready(function(){
      $ionicHistory.nextViewOptions({
        disableAnimate: true
      });
      if(window.Connection){
        if(navigator.connection.type == Connection.NONE || navigator.connection.type == Connection.UNKNOWN) {
          $state.go('app.error');
        }else {
          $cordovaFile.checkFile(cordova.file.documentsDirectory, "adImage.png")
            .then(function (success) {
              AdvertisementService.skipFetching(cordova.file.documentsDirectory + "adImage.png");
            }, function (error) {
              AdvertisementService.fetchAdsData();
            });
        }
      }
    })
  })
  .controller('InternetConnectionCtrl', function($rootScope, $state) {
    $rootScope.$on('http_request_success_ads', function(){
      $state.go('werbepartner', {connection: {hasInternet: true}, localAd: false});
    });
    $rootScope.$on('http_skip_request_ads', function(){
      $state.go('werbepartner', {connection: {hasInternet: true}, localAd: true})
    });
  });

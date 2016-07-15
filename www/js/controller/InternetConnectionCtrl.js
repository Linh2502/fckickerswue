/**
 * Created by Linh on 24.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * status: 14.07.2016 6:41 PM
 */
(function () {
  angular
    .module('module.internet', ['ionic'])
    .run(function($ionicPlatform, $state, $ionicHistory, AdvertisementService, $cordovaFile){
      $ionicPlatform.ready(function() {
        $state.go('app.home');
      })
      //$ionicPlatform.ready(function(){
      //  $ionicHistory.nextViewOptions({
      //    disableAnimate: true
      //  });
      //  if(window.Connection){
      //    if(navigator.connection.type == Connection.NONE || navigator.connection.type == Connection.UNKNOWN) {
      //      $state.go('app.error');
      //    }else {
      //      $cordovaFile.checkFile(cordova.file.documentsDirectory, "adImage.png")
      //        .then(function (success) {
      //          AdvertisementService.skipFetching(cordova.file.documentsDirectory + "adImage.png")
      //            .then(function(success) {
      //              $state.go('werbepartner', {connection: {hasInternet: true}, localAd: false});
      //            });
      //        }, function (error) {
      //          AdvertisementService.fetchAdsData()
      //            .then(function(success) {
      //              $state.go('werbepartner', {connection: {hasInternet: true}, localAd: true})
      //            });
      //        });
      //    }
      //  }
      //})
    })
    .controller('InternetConnectionCtrl', function($rootScope, $state) {});
})();

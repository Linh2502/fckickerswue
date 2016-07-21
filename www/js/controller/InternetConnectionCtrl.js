/**
 * Created by Linh on 24.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * status: 14.07.2016 6:41 PM
 */
(function () {
  angular
    .module('module.internet', ['ionic'])
    .run(function ($ionicPlatform, $state, $ionicHistory, AdvertisementService, $cordovaFile, $cordovaNetwork) {
      $ionicPlatform.ready(function () {
        $state.go('werbepartner', {connection: true, localAd: null, data: null, locationPath: null})

        //$ionicHistory.nextViewOptions({
        //  disableAnimate: true
        //});
        //if (window.Connection) {
        //  if (navigator.connection.type == Connection.NONE || navigator.connection.type == Connection.UNKNOWN) {
        //    $state.go('app.error');
        //  } else {
        //    if (ionic.Platform.isIOS()) {
        //      $cordovaFile.checkFile(cordova.file.documentsDirectory, "adImage.png")
        //        .then(function (success) {
        //          AdvertisementService.skipFetching(cordova.file.documentsDirectory + "adImage.png")
        //            .then(function (success) {
        //              $state.go('werbepartner', {
        //                connection: true,
        //                localAd: cordova.file.documentsDirectory + "adImage.png",
        //                data: null,
        //                locationPath: cordova.file.documentsDirectory
        //              });
        //            });
        //        }, function (error) {
        //          AdvertisementService.fetchAdsData()
        //            .then(function (success) {
        //              $state.go('werbepartner', {connection: true, localAd: null, data: success, locationPath: cordova.file.documentsDirectory})
        //            });
        //        });
        //    } else {
        //      $cordovaFile.checkFile(cordova.file.externalDataDirectory, "adImage.png")
        //        .then(function (success) {
        //          AdvertisementService.skipFetching(cordova.file.externalDataDirectory + "adImage.png")
        //            .then(function (success) {
        //              $state.go('werbepartner', {
        //                connection: true,
        //                localAd: cordova.file.externalDataDirectory + "adImage.png",
        //                data: null,
        //                locationPath: cordova.file.externalDataDirectory
        //              });
        //            });
        //        }, function (error) {
        //          AdvertisementService.fetchAdsData()
        //            .then(function (success) {
        //              $state.go('werbepartner', {connection: true, localAd: null, data: success, locationPath: cordova.file.externalDataDirectory})
        //            });
        //        });
        //    }
        //  }
        //}
      })
    })
    .controller('InternetConnectionCtrl', function ($rootScope, $state) {
    });
})();

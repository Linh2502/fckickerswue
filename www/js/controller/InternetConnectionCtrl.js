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
        //$state.go('werbepartner', {connection: true, localAd: null, data: null, locationPath: null})

        $ionicHistory.nextViewOptions({
          disableAnimate: true
        });
        if (navigator.connection.type == "none" || navigator.connection.type == "unknown") {
          $state.go('app.error');
        } else {
          if (ionic.Platform.isIOS()) {
            AdvertisementService.fetchAdsData()
              .then(function (success) {
                $cordovaFile.checkFile(cordova.file.documentsDirectory, "adImage.png")
                  .then(function (checkFileSuccess) {
                    AdvertisementService.skipFetching(cordova.file.documentsDirectory + "adImage.png")
                      .then(function (skipFetchingSuccess) {
                        $state.go('werbepartner', {
                          connection: true,
                          localAd: cordova.file.documentsDirectory + "adImage.png",
                          locationPath: cordova.file.documentsDirectory,
                          newData: success
                        });
                      });
                  }, function (error) {
                    $state.go('werbepartner', {
                      connection: true,
                      localAd: null,
                      data: success,
                      locationPath: cordova.file.documentsDirectory
                    })
                  });
              }, function (error) {
                $state.go('app.error');
              });
          } else {
            AdvertisementService.fetchAdsData()
              .then(function (success) {
                $cordovaFile.checkFile(cordova.file.externalDataDirectory, "adImage.png")
                  .then(function (checkFileSuccess) {
                    AdvertisementService.skipFetching(cordova.file.externalDataDirectory + "adImage.png")
                      .then(function (skipFetchingSuccess) {
                        $state.go('werbepartner', {
                          connection: true,
                          localAd: cordova.file.externalDataDirectory + "adImage.png",
                          locationPath: cordova.file.externalDataDirectory,
                          newData: success
                        });
                      });
                  }, function (error) {
                    $state.go('werbepartner', {
                      connection: true,
                      localAd: null,
                      data: success,
                      locationPath: cordova.file.externalDataDirectory
                    })
                  });
              }, function (error) {
                $state.go('app.error');
              });
          }
        }
      })
    })
    .controller('InternetConnectionCtrl', function ($rootScope, $state) {
    });
})();

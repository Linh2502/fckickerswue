/**
 * Created by Linh on 25.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * status: 14.07.2016 6:41 PM
 */
(function () {
  'use strict';

  angular
    .module('service.advertisement', ['ionic'])
    .service('AdvertisementService', AdvertisementService);

  AdvertisementService.$inject = ['$rootScope', '$http', 'ApiEndpoint', '$state', '$ionicPlatform', '$cordovaFileTransfer', '$q'];

  function AdvertisementService($rootScope, $http, ApiEndpoint, $state, $ionicPlatform, $cordovaFileTransfer, $q) {
      var dates = null;

      return {
        setData: function (data) {
          dates = data;
        },
        getAdsData: function () {
          var defer = $q.defer();
          defer.resolve(dates);
          return defer.promise;
        },
        fetchAdsData: function() {
          var defer = $q.defer();
          $http.get(ApiEndpoint.url + 'app--adscreen' + ApiEndpoint.version + '&uuid=' + ionic.Platform.device().uuid)
            .then(function(response){
              dates = x2js.xml_str2json(response.data);
              defer.resolve(dates);
            }, function(error){
              $state.go('app.error');
            });
          return defer.promise;
        },
        skipFetching: function(pathToImage) {
          var defer = $q.defer();
          dates = pathToImage;
          defer.resolve(pathToImage);
          return defer.promise;
        },
        saveToLocalSystem: function() {
          var defer = $q.defer();
          $ionicPlatform.ready(function() {
            var targetPath = cordova.file.documentsDirectory + "adImage.png";
            var options = {};
            var bool = true;

            $cordovaFileTransfer.download(dates.data.image[0].url, targetPath, options, bool)
              .then(function(result) {
                defer.resolve(result);
              }, function(err) {
              }, function (progress) {
              });
          });
          return defer.promise;
        }
      }
    }
})();

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

      return {
        fetchAdsData: function() {
          var defer = $q.defer();
          $http.get(ApiEndpoint.url + 'app--adscreen' + ApiEndpoint.version + '&uuid=' + ionic.Platform.device().uuid + '&deviceWidth=' + ((window.innerWidth > 0) ? window.innerWidth : screen.width) + '&deviceHeight=' + ((window.innerHeight > 0) ? window.innerHeight : screen.height))
            .then(function(response){
              defer.resolve(x2js.xml_str2json(response.data));
            }, function(error){
              $state.go('app.error');
            });
          return defer.promise;
        },
        skipFetching: function(pathToImage) {
          var defer = $q.defer();
          defer.resolve(pathToImage);
          return defer.promise;
        },
        saveToLocalSystem: function(data, locationPath) {
          var defer = $q.defer();
          $ionicPlatform.ready(function() {
            var targetPath = locationPath + "adImage.png";
            var options = {};
            var bool = true;

            $cordovaFileTransfer.download(data.data.image[0].url, targetPath, options, bool)
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

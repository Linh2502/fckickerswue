/**
 * Created by Linh on 25.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 */
angular.module('service.advertisement', ['ionic'])
  .service('AdvertisementService', function ($rootScope, $http, ApiEndpoint, $state, $ionicPlatform, $cordovaFileTransfer) {
    var dates = null;

    return {
      setData: function (data) {
        dates = data;
      },
      getAdsData: function () {
        return dates;
      },
      fetchAdsData: function() {
          $http.get(ApiEndpoint.url + 'app--adscreen' + ApiEndpoint.version + '&uuid=' + ionic.Platform.device().uuid)
            .then(function(response){
              dates = x2js.xml_str2json(response.data);
              $rootScope.$broadcast('http_request_success_ads');
            }, function(error){
              $state.go('app.error');
            });
      },
      skipFetching: function(pathToImage) {
        dates = pathToImage;
        $rootScope.$broadcast('http_skip_request_ads');
      },
      saveToLocalSystem: function() {
        $ionicPlatform.ready(function() {
          var targetPath = cordova.file.documentsDirectory + "adImage.png";
          var options = {};
          var bool = true;

          $cordovaFileTransfer.download(dates.data.image[0].url, targetPath, options, bool)
            .then(function(result) {
            }, function(err) {
            }, function (progress) {
            });
        });
      }
    }
  })

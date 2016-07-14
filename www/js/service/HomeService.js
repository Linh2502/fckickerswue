/**
 * Created by Linh on 15.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 */
angular.module('service.home', [])
  .service('HomeService', function ($rootScope, $http, ApiEndpoint, $q) {
    var dates = null;

    return {
      setData: function (data) {
        dates = data;
      },
      getNewsData: function () {
        return dates.data.news;
      },
      getMatchesData: function () {
        return dates.data.matches;
      },
      getVideosData: function () {
        return dates.data.videos;
      },
      fetchHomeData: function () {
        var defer = $q.defer();
        $http.get(ApiEndpoint.url + 'app--start' + ApiEndpoint.version + $rootScope.uuid)
          .then(function(response){
            dates = x2js.xml_str2json(response.data);
            defer.resolve();
          }, function(error){
          });
        return defer.promise;
      }
    }
  })

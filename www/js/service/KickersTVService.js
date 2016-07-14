/**
 * Created by Linh on 15.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 */
angular.module('service.kickerstv', [])
  .service('KickersTVService', function ($rootScope, $http, ApiEndpoint, $state, $q) {
    var dates = null;

    return {
      setData: function (data) {
        dates = data;
      },
      getData: function () {
        return dates.data.videos;
      },
      fetchKickersTVData: function () {
        var defer = $q.defer();
        $http.get(ApiEndpoint.url + 'app--videos' + ApiEndpoint.version + $rootScope.uuid)
          .then(function(response){
            dates = x2js.xml_str2json(response.data);
            $rootScope.$broadcast('http_request_success_kickerstv');
            defer.resolve();
          }, function(error){
            $state.go('app.error');
          });
        return defer.promise;
      }
    }
  })

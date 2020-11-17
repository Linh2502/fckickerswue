/**
 * Created by Linh on 15.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * status: 14.07.2016 2:32 PM
 */
(function () {
  'use strict';

  angular
    .module('service.kickerstv', [])
    .service('KickersTVService', KTVService);

  KTVService.$inject = ['$rootScope', '$log', '$http', 'ApiEndpoint', '$state', '$q'];

  function KTVService($rootScope, $log, $http, ApiEndpoint, $state, $q) {
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
          .then(function (response) {
            $log.info("Succeeded in requesting kickers videos data", response);
            dates = x2js.xml_str2json(response.data);
            defer.resolve(dates.data.videos);
          }, function (error) {
            $log.info("Failed in requesting kickers videos data", error);
            $state.go('app.error');
          });
        return defer.promise;
      }
    }
  }
})();

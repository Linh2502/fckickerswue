/**
 * Created by Linh on 15.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * status: 14.07.2016 4:55 PM
 */
(function () {
  'use strict';

  angular
    .module('service.matchcenter', [])
    .service('MatchcenterService', MatchcenterService);

  MatchcenterService.$inject = ['$rootScope', '$http', 'ApiEndpoint', '$state', '$log', '$q'];

  function MatchcenterService($rootScope, $http, ApiEndpoint, $state, $log, $q) {
    var dates = null;

    return {
      setData: function (data) {
        dates = data;
      },
      getLiveTickerData: function () {
        return dates.data.liveticker;
      },
      getDetailsData: function () {
        return dates.data.details;
      },
      getVideosData: function () {
        return dates.data.videos;
      },
      getTableData: function () {
        return dates.data.table;
      },
      refreshLiveTicker: function () {
        var defer = $q.defer();
        $http.get(ApiEndpoint.url + 'app--matchcenter' + ApiEndpoint.version + $rootScope.uuid)
          .then(function (response) {
            $log.info("Succeeded in requesting matchcenter data", response);
            dates = x2js.xml_str2json(response.data);
            defer.resolve(dates);
          }, function (error) {
            $log.info("Failed in requesting home data", error);
            $state.go('app.error');
          });
        return defer.promise;
      }
    }
  }
})();

/**
 * Created by Linh on 15.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * status: 14.07.2016 3:12 PM
 */
(function () {
  'use strict';

  angular
    .module('service.tabelle', [])
    .service('TabelleService', TabelleService);

  TabelleService.$inject = ['$rootScope', '$log', '$http', 'ApiEndpoint', '$state', '$q'];

  function TabelleService($rootScope, $log, $http, ApiEndpoint, $state, $q) {
    var dates = null;

    return {
      fetchTableData: function () {
        var defer = $q.defer();
        $http.get(ApiEndpoint.url + 'app--table' + ApiEndpoint.version + $rootScope.uuid)
          .then(function (response) {
            $log.info("Succeeded in requesting table data", response);
            dates = x2js.xml_str2json(response.data);
            defer.resolve(dates.data.table);
          }, function (error) {
            $log.info("Failed in requesting table data", error);
            $state.go('app.error');
          });
        return defer.promise;
      }
    }
  }
})();

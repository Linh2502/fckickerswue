/**
 * Created by Linh on 15.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * status: 14.07.2016 3:28 PM
 */
(function () {
  'use strict';

  angular
    .module('service.spielplan', [])
    .service('SpielplanService', SpielplanService);

  SpielplanService.$inject = ['$rootScope', '$http', 'ApiEndpoint', '$state', '$log', '$q'];

  function SpielplanService($rootScope, $http, ApiEndpoint, $state, $log, $q) {
    var dates = null;

    return {
      fetchSpielPlanData: function () {
        var defer = $q.defer();
        $http.get(ApiEndpoint.url + 'app--matchlisting' + ApiEndpoint.version + $rootScope.uuid)
          .then(function (response) {
            $log.info("Succeeded in requesting schedule data", response);
            dates = x2js.xml_str2json(response.data);
            defer.resolve(dates.data);
          }, function (error) {
            $log.info("Failed in requesting schedule data", error);
            $state.go('app.error');
          });
        return defer.promise;
      }
    }
  }
})();

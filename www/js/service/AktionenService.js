/**
 * Created by Linh on 15.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * status: 28.07.2016 13:55 PM
 */
(function () {
  'use strict';

  angular
    .module('service.aktionen', [])
    .service('AktionenService', AktionenService);

  AktionenService.$inject = ['$rootScope', '$http', 'ApiEndpoint', '$state', '$q', '$log'];

  function AktionenService($rootScope, $http, ApiEndpoint, $state, $q, $log) {
    var dates = null;

    return {
      fetchAktionenData: function () {
        var defer = $q.defer();
        $http.get(ApiEndpoint.url + 'app--promotions' + ApiEndpoint.version + $rootScope.uuid)
          .then(function (response) {
            $log.info("Succeeded in requesting aktionen data", response);
            dates = x2js.xml_str2json(response.data);
            defer.resolve(dates.data.promotions);
          }, function (error) {
            $log.info("Succeeded in requesting aktionen data", error);
            $state.go('app.error');
          });
        return defer.promise;
      }
    }
  }
})();

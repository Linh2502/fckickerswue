/**
 * Created by Linh on 15.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * status: 14.07.2016 4:00 PM
 */
(function () {
  'use strict';

  angular
    .module('service.home', [])
    .service('HomeService', HomeService);

  HomeService.$inject = ['$rootScope', '$http', 'ApiEndpoint', '$q', '$log'];

  function HomeService($rootScope, $http, ApiEndpoint, $q, $log) {
    var dates = null;

    return {
      fetchHomeData: function () {
        var defer = $q.defer();
        $http.get(ApiEndpoint.url + 'app--start' + ApiEndpoint.version + $rootScope.uuid)
          .then(function (response) {
            $log.info("Succeeded in requesting home data", response);
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

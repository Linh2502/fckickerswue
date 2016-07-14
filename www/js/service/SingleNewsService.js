/**
 * Created by Linh on 17.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * status: 14.07.2016 4:17 PM
 */
(function () {
  'use strict';

  angular
    .module('service.singlenews', [])
    .service('SingleNewsService', SNService);

  SNService.$inject = ['$rootScope', '$http', '$state', 'ApiEndpoint', '$q', '$log'];

  function SNService($rootScope, $http, $state, ApiEndpoint, $q, $log) {
    var singleNews = null;

    return {
      fetchSingleNewsData: function (id) {
        var defer = $q.defer();
        $http.get(ApiEndpoint.url + 'app--newsdetails/id:' + id + ApiEndpoint.version + $rootScope.uuid)
          .then(function (response) {
            $log.info("Succeeded in requesting single news data", response);
            singleNews = x2js.xml_str2json(response.data);
            defer.resolve(singleNews);
          }, function (error) {
            $log.info("Failed in requesting single news data", error);
            $state.go('app.error')
          });
        return defer.promise;
      }
    }
  }
})();

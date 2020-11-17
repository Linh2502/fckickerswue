/**
 * Created by Linh on 15.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * status: 14.07.2016 3:38 PM
 */
(function () {
  'use strict';

  angular
    .module('service.news', [])
    .service('NewsService', NewsService);

  NewsService.$inject = ['$rootScope', '$http', 'ApiEndpoint', '$state', '$q', '$log'];

  function NewsService($rootScope, $http, ApiEndpoint, $state, $q, $log) {
    var dates = null;

    return {
      fetchNewsData: function () {
        var defer = $q.defer();
        $http.get(ApiEndpoint.url + 'app--news' + ApiEndpoint.version + $rootScope.uuid)
          .then(function (response) {
            $log.info("Succeeded in requesting news data", response);
            dates = x2js.xml_str2json(response.data);
            defer.resolve(dates.data.news);
          }, function (error) {
            $log.info("Succeeded in requesting news data", error);
            $state.go('app.error');
          });
        return defer.promise;
      }
    }
  }
})();

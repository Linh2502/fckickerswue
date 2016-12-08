/**
 * Created by Linh on 17.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 */
(function () {
    'use strict';

    angular
        .module('service.kader', [])
        .service('KaderService', KaderService);

    KaderService.$inject = ['$rootScope', '$http', 'ApiEndpoint', '$state', '$q', '$log'];

    function KaderService($rootScope, $http, ApiEndpoint, $state, $q, $log) {
        var dates = null;

        return {
            fetchKaderData: function () {
                var defer = $q.defer();
                $http.get(ApiEndpoint.url + 'app--squad' + ApiEndpoint.version + $rootScope.uuid)
                    .then(function (response) {
                        $log.info("Succeeded in requesting kader data", response);
                        dates = x2js.xml_str2json(response.data);
                        defer.resolve(dates.data.squad);
                    }, function (error) {
                        $log.info("Failed in requesting kader data", response);
                        $state.go('app.error');
                    });
                return defer.promise;
            }
        }
    }
})();

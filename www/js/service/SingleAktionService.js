/**
 * Created by Linh on 08.08.16.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * status: 08.08.2016 9:32 AM
 */
(function () {
    'use strict';

    angular
        .module('service.singleaktion', [])
        .service('SingleAktionService', SAService);

    SAService.$inject = ['$rootScope', '$http', '$state', 'ApiEndpoint', '$q', '$log'];

    function SAService($rootScope, $http, $state, ApiEndpoint, $q, $log) {
        var singleAktion = null;

        return {
            fetchSingleAktionData: function (id) {
                var defer = $q.defer();
                $http.get(ApiEndpoint.url + 'app--promotiondetails/id:' + id + ApiEndpoint.version + $rootScope.uuid)
                    .then(function (response) {
                        $log.info("Succeeded in requesting single aktion data", response);
                        singleAktion = x2js.xml_str2json(response.data);
                        defer.resolve(singleAktion);
                    }, function (error) {
                        $log.info("Failed in requesting single aktion data", error);
                        $state.go('app.error')
                    });
                return defer.promise;
            }
        }
    }
})();
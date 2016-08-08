/**
 * Created by Linh on 08.08.16.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * status: 08.08.2016 2:44 PM
 */
(function () {
    'use strict';

    angular
        .module('service.miscellaneous', [])
        .service('MiscellaneousService', MiscellaneousService);

    MiscellaneousService.$inject = ['$rootScope', '$http', 'ApiEndpoint', '$state', '$log', '$q'];

    function MiscellaneousService($rootScope, $http, ApiEndpoint, $state, $log, $q) {
        return {
            fetchMiscellaneousData: function () {
                var defer = $q.defer();
                $http.get(ApiEndpoint.url + 'app--static' + ApiEndpoint.version + $rootScope.uuid)
                    .then(function (response) {
                        $log.info("Succeeded in requesting miscellaneous data", response);
                        defer.resolve(x2js.xml_str2json(response.data));
                    }, function (error) {
                        $log.info("Failed in requesting miscellaneous data", error);
                        $state.go('app.error');
                    });
                return defer.promise;
            }
        }
    }
})();

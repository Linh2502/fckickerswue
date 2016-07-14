/**
 * Created by Linh on 15.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * - final -
 */
angular.module('service.tabelle', [])
  .service('TabelleService', function ($rootScope, $http, ApiEndpoint, $state) {
    var dates = null;

    return {
      setData: function (data) {
        dates = data;
      },
      getData: function () {
        return dates.data.table;
      },
      fetchTableData: function () {
        $http.get(ApiEndpoint.url + 'app--table' + ApiEndpoint.version + $rootScope.uuid)
          .then(function(response){
            dates = x2js.xml_str2json(response.data);
            $rootScope.$broadcast('http_request_success_tabelle');
          }, function(error){
            $state.go('app.error');
          });
      }
    }
  })


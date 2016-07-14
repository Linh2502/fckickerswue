/**
 * Created by Linh on 17.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 */
angular.module('service.kader', [])
  .service('KaderService', function ($rootScope, $http, ApiEndpoint, $state) {
    var dates = null;

    return {
      setData: function (data) {
        dates = data;
      },
      getGoalPlayerData: function () {
        return dates.data.squad.goal;
      },
      getDefensePlayerData: function () {
        return dates.data.squad.defense;
      },
      getMidFieldPlayerData: function () {
        return dates.data.squad.midfield;
      },
      getOffensePlayerData: function () {
        return dates.data.squad.offense;
      },
      fetchKaderData: function () {
        $http.get(ApiEndpoint.url + 'app--squad' + ApiEndpoint.version + $rootScope.uuid)
          .then(function(response){
            dates = x2js.xml_str2json(response.data);
            $rootScope.$broadcast('http_request_success_kader');
          }, function(error){
            $state.go('app.error');
          });
      }
    }
  })

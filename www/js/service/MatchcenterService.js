/**
 * Created by Linh on 15.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 */
angular.module('service.matchcenter', [])
  .service('MatchcenterService', function ($rootScope, $http, ApiEndpoint, $state) {
    var dates = null;

    return {
      setData: function (data) {
        dates = data;
      },
      getLiveTickerData: function () {
        return dates.data.liveticker;
      },
      getDetailsData: function () {
        return dates.data.details;
      },
      getVideosData: function () {
        return dates.data.videos;
      },
      getTableData: function () {
        return dates.data.table;
      },
      refreshLiveTicker: function () {
        $http.get(ApiEndpoint.url + 'app--matchcenter' + ApiEndpoint.version + $rootScope.uuid)
          .then(function(response){
            dates = x2js.xml_str2json(response.data);
            $rootScope.$broadcast('http_request_success_matchcenter');
          }, function(error){
            $state.go('app.error');
          });
      }
    }
  })


/**
 * Created by Linh on 15.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 */
angular.module('service.news', [])
  .service('NewsService', function ($rootScope, $http, ApiEndpoint, $state, $q) {
    var dates = null;

    return {
      setData: function (data) {
        dates = data;
      },
      getData: function () {
        return dates.data.news;
      },
      fetchNewsData: function(){
        var defer = $q.defer();
        $http.get(ApiEndpoint.url + 'app--news' + ApiEndpoint.version + $rootScope.uuid)
          .then(function(response){
            dates = x2js.xml_str2json(response.data);
            $rootScope.$broadcast('http_request_success_news');
            defer.resolve();
          }, function(error){
            $state.go('app.error');
          });
        return defer.promise;
      }
    }
  })


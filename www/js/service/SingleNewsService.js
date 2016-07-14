/**
 * Created by Linh on 17.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 */
angular.module('service.singlenews', [])
  .service('SingleNewsService', function ($rootScope, $http, $state, ApiEndpoint) {
    var singleNews = null;

    return {
      getSingleNews: function() {
        return singleNews;
      },
      fetchSingleNewsData: function(id){
        $http.get(ApiEndpoint.url + 'app--newsdetails/id:' + id + ApiEndpoint.version + $rootScope.uuid)
          .then(function(response){
            singleNews = x2js.xml_str2json(response.data);
            $rootScope.$broadcast('http_request_success_singlenews');
          }, function(error){
            $state.go('app.error')
          });
      }
    }
  })

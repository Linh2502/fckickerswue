/**
 * Created by Linh on 11.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * - final -
 */
angular.module('dateFilter', [])
  .filter('dateFilter', function($filter){
    return function(input) {
      return $filter('date')(new Date(input), 'dd.MM.yyyy');
    }
  })
  .filter('timeFilter', function($filter){
    return function(input) {
      var split = input.split(":");
      var time = split[0] + ":" + split[1];
      return time;
    }
  })

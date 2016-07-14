/**
 * Created by Linh on 30.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * - final -
 */
angular.module('module.reloadcontent', [])
  .controller('ReloadContentCtrl', function($scope, $state, $stateParams, $timeout){
    if($stateParams.connection.hasInternet){
      $state.transitionTo('app.home');
    }else{
      $state.transitionTo('app.error');
    }
  })

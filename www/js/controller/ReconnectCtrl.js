/**
 * Created by Linh on 30.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * - final -
 */
angular.module('module.reconnect', [])
  .controller('ReconnectCtrl', function($ionicPlatform, $state, $ionicHistory) {
    $ionicPlatform.ready(function(){
      $ionicHistory.nextViewOptions({
        disableAnimate: true
      })
      if(window.Connection){
        if(navigator.connection.type == Connection.NONE || navigator.connection.type == Connection.UNKNOWN) {
          $state.go('app.error');
        }else {
          $state.go('reload', {connection: {hasInternet: true}});
        }
      }
    })
  })

/**
 * Created by Linh on 30.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * status: 14.07.2016 6:45 PM
 */
(function () {
  'use strict';

  angular
    .module('module.reconnect', [])
    .controller('ReconnectCtrl', ReconnectController);

  ReconnectController.$inject = ['$ionicPlatform', '$state', '$ionicHistory'];

  function ReconnectController($ionicPlatform, $state, $ionicHistory) {
    $ionicPlatform.ready(function () {
      $ionicHistory.nextViewOptions({
        disableAnimate: true
      });
      if (window.Connection) {
        if (navigator.connection.type == Connection.NONE || navigator.connection.type == Connection.UNKNOWN) {
          $state.go('app.error');
        } else {
          $state.go('reload', {connection: true});
        }
      }
    })
  }
})();

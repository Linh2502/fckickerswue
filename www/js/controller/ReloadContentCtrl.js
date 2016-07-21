/**
 * Created by Linh on 30.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * status: 14.07.2016 6:45 PM
 */
(function () {
  'use strict';

  angular
    .module('module.reloadcontent', [])
    .controller('ReloadContentCtrl', ReloadContentController);

  ReloadContentController.$inject = ['$state', '$stateParams'];

  function ReloadContentController($state, $stateParams) {
    if ($stateParams.connection) {
      $state.transitionTo('app.home');
    } else {
      $state.transitionTo('app.error');
    }
  }
})();

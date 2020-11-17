/**
 * Created by Linh on 02.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * status: 08.08.2016 2:58 PM
 */
(function () {
  'use strict';

  angular
      .module('module.datenschutz', [])
      .controller('DatenschutzCtrl', DatenschutzController);

  DatenschutzController.$inject = ['$rootScope', '$state', 'MiscellaneousService'];

  function DatenschutzController($rootScope, $state, MiscellaneousService) {
    var vm = this;
    vm.disclaimer = null;

    vm._init = _init;

    function _init() {
      $rootScope.$broadcast('show_loader');
      MiscellaneousService.fetchMiscellaneousData()
          .then(function(success) {
            vm.disclaimer = success.data.disclaimer;
            $rootScope.$broadcast('hide_loader');
          }, function(error) {
            $state.go('app.error');
          })
    }

    vm._init();
  }
})();

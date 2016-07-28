/**
 * Created by Linh on 28/07/16.
 */
(function () {
  'use strict';

  angular
    .module('module.aktionen', [])
    .controller('AktionenCtrl', AktionenController);

  AktionenController.$inject = ['$rootScope', '$scope', 'AktionenService', '$state', '$timeout', '$ionicSideMenuDelegate'];

  function AktionenController($rootScope, $scope, AktionenService, $state, $timeout, $ionicSideMenuDelegate) {
    $ionicSideMenuDelegate.canDragContent(true);

    var vm = this;
  }
})();
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
    vm.aktionenFeed = [];

    vm._init = _init;
    vm.refresh = refresh;
    vm.navigateToAktion = navigateToAktion;

    function _init() {
      $rootScope.$broadcast('show_loader');
      AktionenService.fetchAktionenData()
        .then(function(success) {
          setAktionenFeed(success);
          $rootScope.$broadcast('hide_loader');
        })
    }

    function setAktionenFeed(aktionen) {
      for (var i = 0; i < aktionen.item.length; i++) {
        vm.aktionenFeed.push({
          //Feed
        });
      }
    }

    function refresh() {
      vm.aktionenFeed = [];
      AktionenService.fetchAktionenData()
        .then(function(success) {
          setAktionenFeed(success);
          $scope.$broadcast('scroll.refreshComplete');
        });
    }

    function navigateToAktion(id) {
      $state.go('app.singleaktion', {aktionId: id});
    }

    vm._init();
  }
})();
/**
 * Created by Linh on 02.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * status: 14.07.2016 3:14 PM
 */
(function () {
  'use strict';

  angular
    .module('module.tabelle', [])
    .controller('TabelleCtrl', TabelleController);

  TabelleController.$inject = ['$rootScope', '$scope', 'TabelleService', '$ionicSideMenuDelegate', '$timeout'];

  function TabelleController($rootScope, $scope, TabelleService, $ionicSideMenuDelegate, $timeout) {
    $ionicSideMenuDelegate.canDragContent(true);
    var vm = this;
    vm.tableFeed = [];

    vm._init = _init;
    vm.refresh = refresh;

    function _init() {
      $rootScope.$broadcast('show_loader');
      TabelleService.fetchTableData()
        .then(function(success) {
          console.error(success);
          setTableFeed(success);
          $rootScope.$broadcast('hide_loader');
        });
    }

    function refresh() {
      TabelleService.fetchTableData()
        .then(function(success) {
          setTableFeed(success);
          $scope.$broadcast('scroll.refreshComplete');
        });
    }

    function setTableFeed(table) {
      for (var i = 0; i < table.row.length; i++) {
        vm.tableFeed.push(table.row[i]);
      }
    }

    vm._init();
  }
})();

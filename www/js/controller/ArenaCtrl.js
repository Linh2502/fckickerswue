/**
 * Created by Linh on 02.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * status: 14.07.2016 1:29 PM
 */

(function () {
  'use strict';

  angular
    .module('module.arena', [])
    .controller('ArenaCtrl', ArenaController);

  ArenaController.$inject = ['$ionicSideMenuDelegate', '$sce', '$ionicScrollDelegate', '$ionicPlatform'];

  function ArenaController($ionicSideMenuDelegate, $sce, $ionicScrollDelegate, $ionicPlatform) {
    $ionicSideMenuDelegate.canDragContent(true);
    var vm = this;
    vm.tab = 1;
    vm.map = $sce.trustAsResourceUrl("https://www.google.com/maps/embed/v1/place?q=place_id:ChIJG8dtrwSQokcRI3Yz9JM74bQ&key=AIzaSyDfj3L6uol8snNiexWQ2aa1wTA6sg2Doag");
    vm.setTab = setTab;
    vm.showTab = showTab;

    function setTab(tab) {
      if (tab == "1") {
        $ionicScrollDelegate.$getByHandle('resize').resize();
      } else if (tab == "2") {
        $ionicScrollDelegate.$getByHandle('resize').resize();
      } else {
        $ionicScrollDelegate.$getByHandle('resize').resize();
      }
      vm.tab = tab;
    }

    function showTab (tab) {
      return vm.tab === tab;
    }
  }
})();

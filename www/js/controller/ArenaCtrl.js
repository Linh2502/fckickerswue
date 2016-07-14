/**
 * Created by Linh on 02.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * - final -
 */

(function() {
  'use strict';

  angular
    .module('module.arena', [])
    .controller('ArenaCtrl', ArenaController);

  ArenaController.$inject = ['$scope', $ionicSideMenuDelegate, $sce, $ionicScrollDelegate];

  function ArenaController($scope, $ionicSideMenuDelegate, $sce, $ionicScrollDelegate){
      $ionicSideMenuDelegate.canDragContent(true);
      $scope.tab = 1;
      $scope.setTab = function(tab){
        if(tab == "1"){
          $ionicScrollDelegate.$getByHandle('resize').resize();
        }else if(tab == "2"){
          $ionicScrollDelegate.$getByHandle('resize').resize();
        }else {
          $ionicScrollDelegate.$getByHandle('resize').resize();
        }
        $scope.tab = tab;
      };
      $scope.showTab = function(tab){
        return $scope.tab === tab;
      };
      $scope.map = $sce.trustAsResourceUrl("https://www.google.com/maps/embed/v1/place?q=place_id:ChIJG8dtrwSQokcRI3Yz9JM74bQ&key=AIzaSyDfj3L6uol8snNiexWQ2aa1wTA6sg2Doag");
    }
});

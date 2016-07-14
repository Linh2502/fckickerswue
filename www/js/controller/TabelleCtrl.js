/**
 * Created by Linh on 02.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * - final -
 */
angular.module('module.tabelle', [])
  .controller('TabelleCtrl', function($rootScope, $scope, $ionicModal, TabelleService, $ionicSideMenuDelegate, $timeout){
    $ionicSideMenuDelegate.canDragContent(true);
    var showContent = false;
    $scope.tableFeed = [];

    $scope.$on('$ionicView.beforeEnter', function() {
      $ionicSideMenuDelegate.toggleLeft(false);
      $rootScope.$broadcast('show_loader');
      TabelleService.fetchTableData();
    });

    $rootScope.$on('show_content_tabelle', function() {
      setTableFeed(TabelleService.getData());
      showContent = true;
      console.log("request success tabelle");
    });

    $scope.$on('$ionicView.afterEnter', function() {
      hideLoader();
    });

    $scope.refresh = function(){
      TabelleService.fetchTableData();
      setTableFeed(TabelleService.getData());
      $scope.$broadcast('scroll.refreshComplete');
    };

    function setTableFeed(table){
      for(var i = 0; i < table.row.length; i++) {
        $scope.tableFeed.push(table.row[i]);
      }
    }

    function hideLoader(){
      if(showContent){
        $rootScope.$broadcast('hide_loader');
      }else{
        $timeout(function(){
          hideLoader();
        }, 1000);
      }
    }
  })

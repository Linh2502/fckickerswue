/**
 * Created by Linh on 24.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * - final -
 */
angular.module('module.error', ['ionic'])
  .controller('ErrorCtrl', function($state, $scope, $rootScope, $ionicPopup, $ionicHistory) {
    $rootScope.$broadcast('hide_loader');
    $ionicHistory.nextViewOptions({
      disableAnimate: true
    })
    $ionicPopup.alert({
      title: "Keine Internetverbindung",
      content: "Beim Herstellen der Verbindung zum Würzburger Kickers - Server ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut."
    }).then(function(res) {
      });

    $scope.refreshContent = function(){
      $state.go('app.reconnect');
    }
  })

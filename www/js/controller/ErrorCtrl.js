/**
 * Created by Linh on 24.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * status: 14.07.2016 6:50 PM
 */
(function () {
  'use strict';

  angular
    .module('module.error', ['ionic'])
    .controller('ErrorCtrl', ErrorController);

  ErrorController.$inject = ['$state','$ionicPopup', '$ionicHistory'];

  function ErrorController($state, $ionicPopup, $ionicHistory) {
    var vm = this;
    vm.refreshContent = refreshContent;

    $ionicHistory.nextViewOptions({
      disableAnimate: true
    });
    $ionicPopup.alert({
      title: "Keine Internetverbindung",
      content: "Beim Herstellen der Verbindung zum Würzburger Kickers - Server ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut."
    }).then(function (res) {
    });

    function refreshContent() {
      $state.go('app.reconnect');
    }
  }
})();

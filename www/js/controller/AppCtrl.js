/**
 * Created by Linh on 15.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * status: 14.07.2016 7:00 PM
 */
(function () {
  'use strict';

  angular
    .module('module.app', ['ionic'])
    .controller('AppCtrl', AppController);

  AppController.$inject = ['$location', '$rootScope', '$timeout', '$state', '$ionicSideMenuDelegate',
    '$ionicHistory', '$ionicScrollDelegate', '$ionicPlatform'];

  function AppController($location, $rootScope, $timeout, $state, $ionicSideMenuDelegate,
                         $ionicHistory, $ionicScrollDelegate, $ionicPlatform) {
    $ionicSideMenuDelegate.edgeDragThreshold(20);
    $ionicSideMenuDelegate.canDragContent(true);
    $ionicHistory.nextViewOptions({
      historyRoot: true,
      disableAnimate: true,
      expire: 100
    });

    var vm = this;

    vm.closeSettings = closeSettings;
    vm.navigateToSettings = navigateToSettings;
    vm.closeMenu = closeMenu;
    vm.navigateBack = navigateBack;
    vm.openSideMenu = openSideMenu;
    vm.clearHistory = clearHistory;
    vm.resizeContent = resizeContent;
    vm.navigateToLiveTicker = navigateToLiveTicker;
    vm.navigateToHome = navigateToHome;

    $rootScope.devWidth = ((window.innerWidth > 0) ? window.innerWidth : screen.width);
    $rootScope.$on('show_loader', function () {
      $('#loaderInterceptor').show();
    });
    $rootScope.$on('hide_loader', function () {
      $('#loaderInterceptor').hide();
    });

    var lockButton = false;
    $('#submenu').hide();

    checkSettingsNotification();
    function checkSettingsNotification() {
      if (window.localStorage['showSettingsNotificationOnce']) {
        window.localStorage['showSettingsNotificationCounter'] = +window.localStorage['showSettingsNotificationCounter'] + 1;
      } else {
        window.localStorage['showSettingsNotificationCounter'] = 1;
        $timeout(function () {
          $('#settings-notification').show();
        }, 5000);
      }
    }

    function closeSettings() {
      window.localStorage['showSettingsNotificationOnce'] = 'true';
      $('#settings-notification').hide();
    }

    function navigateToSettings() {
      window.localStorage['showSettingsNotificationOnce'] = 'true';
      $('#settings-notification').hide();
      handleNavigation("app.settings");
    }

    function closeMenu() {
      $ionicSideMenuDelegate.toggleLeft(false);
    }

    function navigateBack() {
      if (/\d/.test($location.path()) && $location.path().indexOf("kader") > -1) {
        handleNavigation("app.kader");
      }
      if (/\d/.test($location.path()) && $location.path().indexOf("news") > -1) {
        if ($ionicHistory.backView().stateName == "app.home") {
          handleNavigation("app.home");
        } else {
          handleNavigation("app.news");
        }
      }
      if ($location.path().indexOf("settings") > -1) {
        handleNavigation("app.home");
      }
      if (/\d/.test($location.path()) && $location.path().indexOf("aktionen") > -1) {
        handleNavigation("app.aktionen");
      }
    }

    function openSideMenu() {
      if($location.path() !== '/app/error')
        if(!$ionicSideMenuDelegate.isOpenLeft())
          $ionicSideMenuDelegate.toggleLeft(true);
        else
          $ionicSideMenuDelegate.toggleLeft(false);
    }

    function handleNavigation(state) {
      if (lockButton == false) {
        $state.transitionTo(state);
        lockButton = true;
        setTimeout(function () {
          lockButton = false;
        }, 1000);
      }
    }

    function clearHistory() {
      $ionicHistory.nextViewOptions({
        historyRoot: true,
        disableBack: true
      })
    }

    function navigateToHome() {
      clearHistory();
      if($location.path() !== '/app/error')
        $state.go('app.home');
    }

    function resizeContent() {
      $ionicScrollDelegate.$getByHandle('resize').resize();
    }

    function navigateToLiveTicker() {
      if ($rootScope.isLive) {
        $state.go('app.matchcenter', {game: {isLive: true}});
      } else {
        $state.go('app.matchcenter', {game: {isLive: false}});
      }
    }

    //@only Android
    $ionicPlatform.registerBackButtonAction(function (event) {
      if ($ionicHistory.backView() == undefined) {
        ionic.Platform.exitApp();
      } else {
        handleNavigation($ionicHistory.backView().stateName);
      }
    }, 100);
  }
})();

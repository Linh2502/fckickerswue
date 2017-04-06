/**
 * Created by Linh on 02.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * status: 14.07.2016 2:26 PM
 */
(function () {
  'use strict';

  angular
    .module('module.settings', ['ionic'])
    .controller('SettingsCtrl', SettingsController);

  SettingsController.$inject = ['$timeout', '$ionicSideMenuDelegate'];

  function SettingsController($timeout, $ionicSideMenuDelegate) {
    $ionicSideMenuDelegate.canDragContent(true);
    var vm = this;
    vm.goals = window.localStorage['LiveTickerChannelSubscription'];
    vm.game = window.localStorage['GameChannelSubscription'];
    vm.news = window.localStorage['TopNewsChannelSubscription'];
    vm.kickerstv = window.localStorage['KickersTVChannelSubscription'];
    vm.offer = window.localStorage['OffersChannelSubscription'];
    vm.wifi = window.localStorage['WifiEnabled'];

    vm._init = _init;
    vm.goalsChange = goalsChange;
    vm.gameChange = gameChange;
    vm.newsChange = newsChange;
    vm.kickerstvChange = kickerstvChange;
    vm.offerChange = offerChange;
    vm.wifiChange = wifiChange;

    function _init() {
      $('#loaderInterceptor').hide();
      if (ionic.Platform.isAndroid()) {
        if (window.localStorage['resetNotificationOnceForAndroid']) {
          vm.goals = window.localStorage['LiveTickerChannelSubscription'] === 'true';
          vm.game = window.localStorage['GameChannelSubscription'] === 'true';
          vm.news = window.localStorage['TopNewsChannelSubscription'] === 'true';
          vm.kickerstv = window.localStorage['KickersTVChannelSubscription'] === 'true';
          vm.offer = window.localStorage['OffersChannelSubscription'] === 'true';
          vm.wifi = window.localStorage['WifiEnabled'] === 'true';
        } else {
          vm.goals = false;
          vm.game = false;
          vm.news = false;
          vm.kickerstv = false;
          vm.offer = false;
          vm.wifi = false;
          window.localStorage['resetNotificationOnceForAndroid'] = 'true';
        }
      } else {
        vm.goals = window.localStorage['LiveTickerChannelSubscription'] === 'true';
        vm.game = window.localStorage['GameChannelSubscription'] === 'true';
        vm.news = window.localStorage['TopNewsChannelSubscription'] === 'true';
        vm.kickerstv = window.localStorage['KickersTVChannelSubscription'] === 'true';
        vm.offer = window.localStorage['OffersChannelSubscription'] === 'true';
        vm.wifi = window.localStorage['WifiEnabled'] === 'true';
      }
    }

    function goalsChange() {
      $timeout(function () {
        if (vm.goals) {
          window.localStorage['LiveTickerChannelSubscription'] = 'true';
          window.plugins.OneSignal.sendTag('LiveTickerChannel', true);
        }
        if (!vm.goals) {
          window.localStorage['LiveTickerChannelSubscription'] = 'false';
          window.plugins.OneSignal.deleteTag('LiveTickerChannel');
        }
      }, 0);
    }

    function gameChange() {
      $timeout(function () {
        if (vm.game) {
          window.localStorage['GameChannelSubscription'] = 'true';
          window.plugins.OneSignal.sendTag('GameChannel', true);
        }
        if (!vm.game) {
          window.localStorage['GameChannelSubscription'] = 'false';
          window.plugins.OneSignal.deleteTag('GameChannel');
        }
      }, 0);
    }

    function newsChange() {
      $timeout(function () {
        if (vm.news) {
          window.localStorage['TopNewsChannelSubscription'] = 'true';
          window.plugins.OneSignal.sendTag('TopNewsChannel', true);
        }
        if (!vm.news) {
          window.localStorage['TopNewsChannelSubscription'] = 'false';
          window.plugins.OneSignal.deleteTag('TopNewsChannel');
        }
      }, 0);
    }

    function kickerstvChange() {
      $timeout(function () {
        if (vm.kickerstv) {
          window.localStorage['KickersTVChannelSubscription'] = 'true';
          window.plugins.OneSignal.sendTag('KickersTVChannel', true);
        }
        if (!vm.kickerstv) {
          window.localStorage['KickersTVChannelSubscription'] = 'false';
          window.plugins.OneSignal.deleteTag('KickersTVChannel');
        }
      }, 0);
    }

    function offerChange() {
      $timeout(function () {
        if (vm.offer) {
          window.localStorage['OffersChannelSubscription'] = 'true';
          window.plugins.OneSignal.sendTag('OffersChannel', true);
        }
        if (!vm.offer) {
          window.localStorage['OffersChannelSubscription'] = 'false';
          window.plugins.OneSignal.deleteTag('OffersChannel');
        }
      }, 0);
    }

    function wifiChange() {
      $timeout(function () {
        if (vm.wifi) {
          window.localStorage['WifiEnabled'] = 'true';
        }
        if (!vm.wifi) {
          window.localStorage['WifiEnabled'] = 'false';
        }
      }, 0);
    }

    _init();
  }
})();

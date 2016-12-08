/**
 * Created by Linh on 02.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * status: 14.07.2016 2:26 PM
 */
(function () {
  'use strict';

  angular
    .module('module.settings', [])
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
      vm.goals = window.localStorage['LiveTickerChannelSubscription'] === 'true';
      vm.game = window.localStorage['GameChannelSubscription'] === 'true';
      vm.news = window.localStorage['TopNewsChannelSubscription'] === 'true';
      vm.kickerstv = window.localStorage['KickersTVChannelSubscription'] === 'true';
      vm.offer = window.localStorage['OffersChannelSubscription'] === 'true';
      vm.wifi = window.localStorage['WifiEnabled'] === 'true';
    }

    function goalsChange() {
      $timeout(function () {
        if (vm.goals) {
          window.localStorage['LiveTickerChannelSubscription'] = 'true';
          window.parsePlugin.subscribe('LiveTickerChannel', function () {
          }, function (e) {
          });
          window.parsePlugin.subscribe('subscribed', function () {
          }, function (e) {
          });
        }
        if (!vm.goals) {
          window.localStorage['LiveTickerChannelSubscription'] = 'false';
          window.parsePlugin.unsubscribe('LiveTickerChannel', function () {
          }, function (e) {
          });
        }
      }, 0);
    }

    function gameChange() {
      $timeout(function () {
        if (vm.game) {
          window.localStorage['GameChannelSubscription'] = 'true';
          window.parsePlugin.subscribe('GameChannel', function () {
          }, function (e) {
          });
          window.parsePlugin.subscribe('subscribed', function () {
          }, function (e) {
          });
        }
        if (!vm.game) {
          window.localStorage['GameChannelSubscription'] = 'false';
          window.parsePlugin.unsubscribe('GameChannel', function () {
          }, function (e) {
          });
        }
      }, 0);
    }

    function newsChange() {
      $timeout(function () {
        if (vm.news) {
          window.localStorage['TopNewsChannelSubscription'] = 'true';
          window.parsePlugin.subscribe('TopNewsChannel', function () {
          }, function (e) {
          });
          window.parsePlugin.subscribe('subscribed', function () {
          }, function (e) {
          });
        }
        if (!vm.news) {
          window.localStorage['TopNewsChannelSubscription'] = 'false';
          window.parsePlugin.unsubscribe('TopNewsChannel', function () {
          }, function (e) {
          });
        }
      }, 0);
    }

    function kickerstvChange() {
      $timeout(function () {
        if (vm.kickerstv) {
          window.localStorage['KickersTVChannelSubscription'] = 'true';
          window.parsePlugin.subscribe('KickersTVChannel', function () {
          }, function (e) {
          });
          window.parsePlugin.subscribe('subscribed', function () {
          }, function (e) {
          });
        }
        if (!vm.kickerstv) {
          window.localStorage['KickersTVChannelSubscription'] = 'false';
          window.parsePlugin.unsubscribe('KickersTVChannel', function () {
          }, function (e) {
          });
        }
      }, 0);
    }

    function offerChange() {
      $timeout(function () {
        if (vm.offer) {
          window.localStorage['OffersChannelSubscription'] = 'true';
          window.parsePlugin.subscribe('OffersChannel', function () {
          }, function (e) {
          });
          window.parsePlugin.subscribe('subscribed', function () {
          }, function (e) {
          });
        }
        if (!vm.offer) {
          window.localStorage['OffersChannelSubscription'] = 'false';
          window.parsePlugin.unsubscribe('OffersChannel', function () {
          }, function (e) {
          });
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

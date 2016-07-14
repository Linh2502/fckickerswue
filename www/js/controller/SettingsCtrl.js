/**
 * Created by Linh on 02.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * - final -
 */
angular.module('module.settings', [])
  .controller('SettingsCtrl', function($scope, $ionicModal, $timeout, $ionicSideMenuDelegate){
    $ionicSideMenuDelegate.canDragContent(true);
    $scope.$on('$ionicView.beforeEnter', function() {
      if(window.localStorage['LiveTickerChannelSubscription'] == 'true'){
        $scope.goals = { checked: true };
      }else {
        $scope.goals = { checked: false };
      }

      if(window.localStorage['GameChannelSubscription'] == 'true'){
        $scope.game = { checked: true };
      }else {
        $scope.game = { checked: false };
      }

      if(window.localStorage['TopNewsChannelSubscription'] == 'true'){
        $scope.news = { checked: true };
      }else {
        $scope.news = { checked: false };
      }

      if(window.localStorage['KickersTVChannelSubscription'] == 'true'){
        $scope.kickerstv = { checked: true };
      }else {
        $scope.kickerstv = { checked: false };
      }

      if(window.localStorage['OffersChannelSubscription'] == 'true'){
        $scope.offer = { checked: true };
      }else {
        $scope.offer = { checked: false };
      }

      if(window.localStorage['WifiEnabled'] == 'true'){
        $scope.wifi = { checked: true };
      }else {
        $scope.wifi = { checked: false };
      }
    });

    $scope.goalsChange = function() {
      $timeout(function() {
        if($scope.goals.checked){
          window.localStorage['LiveTickerChannelSubscription'] = 'true';
          window.parsePlugin.subscribe('LiveTickerChannel', function() {}, function(e) {});
          window.parsePlugin.subscribe('subscribed', function() {}, function(e) {});
        }
        if(!$scope.goals.checked){
          window.localStorage['LiveTickerChannelSubscription'] = 'false';
          window.parsePlugin.unsubscribe('LiveTickerChannel', function() {}, function(e) {});
        }
      }, 0);
    }
    $scope.gameChange = function() {
      $timeout(function() {
        if($scope.game.checked){
          window.localStorage['GameChannelSubscription'] = 'true';
          window.parsePlugin.subscribe('GameChannel', function() {}, function(e) {});
          window.parsePlugin.subscribe('subscribed', function() {}, function(e) {});
        }
        if(!$scope.game.checked){
          window.localStorage['GameChannelSubscription'] = 'false';
          window.parsePlugin.unsubscribe('GameChannel', function() {}, function(e) {});
        }
      }, 0);
    }

    $scope.newsChange = function() {
      $timeout(function() {
        if($scope.news.checked){
          window.localStorage['TopNewsChannelSubscription'] = 'true';
          window.parsePlugin.subscribe('TopNewsChannel', function() {}, function(e) {});
          window.parsePlugin.subscribe('subscribed', function() {}, function(e) {});
        }
        if(!$scope.news.checked){
          window.localStorage['TopNewsChannelSubscription'] = 'false';
          window.parsePlugin.unsubscribe('TopNewsChannel', function() {}, function(e) {});
        }
      }, 0);
    }

    $scope.kickerstvChange = function() {
      $timeout(function() {
        if($scope.kickerstv.checked){
          window.localStorage['KickersTVChannelSubscription'] = 'true';
          window.parsePlugin.subscribe('KickersTVChannel', function() {}, function(e) {});
          window.parsePlugin.subscribe('subscribed', function() {}, function(e) {});
        }
        if(!$scope.kickerstv.checked){
          window.localStorage['KickersTVChannelSubscription'] = 'false';
          window.parsePlugin.unsubscribe('KickersTVChannel', function() {}, function(e) {});
        }
      }, 0);
    }

    $scope.offerChange = function() {
      $timeout(function() {
        if($scope.offer.checked){
          window.localStorage['OffersChannelSubscription'] = 'true';
          window.parsePlugin.subscribe('OffersChannel', function() {}, function(e) {});
          window.parsePlugin.subscribe('subscribed', function() {}, function(e) {});
        }
        if(!$scope.offer.checked){
          window.localStorage['OffersChannelSubscription'] = 'false';
          window.parsePlugin.unsubscribe('OffersChannel', function() {}, function(e) {});
        }
      }, 0);
    }

    $scope.wifiChange = function() {
      $timeout(function() {
        if($scope.wifi.checked) {
          window.localStorage['WifiEnabled'] = 'true';
        }
        if(!$scope.wifi.checked) {
          window.localStorage['WifiEnabled'] = 'false';
        }
      }, 0);
    }
  })

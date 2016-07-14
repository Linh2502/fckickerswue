/**
 * Created by Linh on 15.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * - final -
 */
angular.module('module.app', ['ionic', 'loadingInterceptor'])
  .controller('AppCtrl', function($location, $rootScope, $scope, $http, $ionicModal, $timeout, $state, $ionicSideMenuDelegate,
                                  $ionicHistory, $ionicScrollDelegate, $ionicPlatform) {
    $ionicSideMenuDelegate.edgeDragThreshold(20);
    $ionicSideMenuDelegate.canDragContent(true);
    $ionicHistory.nextViewOptions({
      historyRoot: true,
      disableAnimate: true,
      expire: 100
    });

    $rootScope.devWidth = ((window.innerWidth > 0) ? window.innerWidth : screen.width);
    $rootScope.$on('show_loader', function(){
      $('#loaderInterceptor').show();
    });
    $rootScope.$on('hide_loader', function(){
      $('#loaderInterceptor').hide();
    });

    $rootScope.$on('http_request_success_home', function(){
      $rootScope.$broadcast('show_content_home');
    });
    $rootScope.$on('http_request_success_kader', function(){
      $rootScope.$broadcast('show_content_kader');
    });
    $rootScope.$on('http_request_success_matchcenter', function(){
      $rootScope.$broadcast('show_content_matchcenter');
    });
    $rootScope.$on('http_request_success_news', function(){
      $rootScope.$broadcast('show_content_news');
    });
    $rootScope.$on('http_request_success_singlenews', function(){
      $rootScope.$broadcast('show_content_singlenews');
    });
    $rootScope.$on('http_request_success_spielplan', function(){
      $rootScope.$broadcast('show_content_spielplan');
    });
    $rootScope.$on('http_request_success_tabelle', function(){
      $rootScope.$broadcast('show_content_tabelle');
    });

    var lockButton = false;
    $('#submenu').hide();
    $scope.detailsFeed = [];

    checkSettingsNotification();
    function checkSettingsNotification(){
      if(window.localStorage['showSettingsNotificationOnce']){
        window.localStorage['showSettingsNotificationCounter'] = +window.localStorage['showSettingsNotificationCounter'] + 1;
      }else{
        window.localStorage['showSettingsNotificationCounter'] = 1;
        $timeout(function(){
          $('#settings-notification').show();
        }, 5000);
      }
    }

    $scope.closeSettings = function (){
      window.localStorage['showSettingsNotificationOnce'] = 'true';
      $('#settings-notification').hide();
    }

    $scope.navigateToSettings = function (){
      window.localStorage['showSettingsNotificationOnce'] = 'true';
      $('#settings-notification').hide();
      handleNavigation("app.settings");
    }

    $scope.closeMenu = function() {
      $ionicSideMenuDelegate.toggleLeft(false);
    }

    $scope.navigateBack = function() {
      if(/\d/.test($location.path()) && $location.path().indexOf("kader") > -1){
        handleNavigation("app.kader");
      }
      if (/\d/.test($location.path()) && $location.path().indexOf("news") > -1){
        if($ionicHistory.backView().stateName == "app.home") {
          handleNavigation("app.home");
        }else{
          handleNavigation("app.news");
        }
      }
      if ($location.path().indexOf("settings") > -1){
        handleNavigation("app.home");
      }
    }

    function handleNavigation(state){
      if(lockButton == false){
        $state.transitionTo(state);
        lockButton = true;
        setTimeout(function(){ lockButton = false; }, 1000);
      }
    }

    $scope.clearHistory = function(){
      $ionicHistory.nextViewOptions({
        historyRoot: true,
        disableBack: true
      })
    }

    $scope.resizeContent = function() {
      $ionicScrollDelegate.$getByHandle('resize').resize();
    }

    $scope.navigateToLiveTicker = function(){
      if($rootScope.isLive){
        $state.go('app.matchcenter', {game: {isLive: true}});
      }else{
        $state.go('app.matchcenter', {game: {isLive: false}});
      }
    }

    //@only Android
    $ionicPlatform.registerBackButtonAction(function (event) {
      if($ionicHistory.backView() == undefined){
        ionic.Platform.exitApp();
      }else{
        handleNavigation($ionicHistory.backView().stateName);
      }
    }, 100);
  })

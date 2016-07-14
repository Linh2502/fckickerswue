/**
 * Created by Linh on 25.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * - final -
 */
angular.module('module.advertisement', [])
  .controller('AdvertisementCtrl', function($rootScope, $scope, $state, $stateParams, $timeout, AdvertisementService, $cordovaSplashscreen){
    var ads = AdvertisementService.getAdsData();
    var time = new Date().getTime();
    var boolean = false;
    $scope.showBanner = null;

    checkBanner();
    function checkBanner(){
      //if($stateParams.localAd){
      //  $scope.showBanner = ads;
      //  boolean = true;
      //}else{
      //  if(ads.data.image[0].valid_from*1000 <= time) {
      //    $scope.showBanner = ads.data.image[0].url;
      //    AdvertisementService.saveToLocalSystem();
      //    boolean = true;
      //  }
      //}
      nextState();
    }

    function nextState(){
      $state.transitionTo('app.home');
      //if(boolean){
      //  $timeout(function(){
      //    $cordovaSplashscreen.hide();
      //  }, 500);
      //  if($stateParams.connection.hasInternet){
      //    $('#advertisement').delay(3000).fadeOut(400);
      //    $timeout(function(){
      //      $state.transitionTo('app.home');
      //    }, 3500);
      //  }else{
      //    $cordovaSplashscreen.hide();
      //    $state.transitionTo('app.error');
      //  }
      //}else{
      //  $scope.showBanner = null;
      //  if($stateParams.connection.hasInternet){
      //    $state.transitionTo('app.home');
      //  }else{
      //    $cordovaSplashscreen.hide();
      //    $state.transitionTo('app.error');
      //  }
      //}
    }
  })

/**
 * Created by Linh on 25.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * status: 14.07.2016 6:25 PM
 */
(function () {
  'use strict';

  angular
    .module('module.advertisement', [])
    .controller('AdvertisementCtrl', AdvertisementController);

  AdvertisementController.$inject = ['$state', '$stateParams', '$timeout', 'AdvertisementService', '$cordovaSplashscreen'];

  function AdvertisementController($state, $stateParams, $timeout, AdvertisementService, $cordovaSplashscreen) {
    var vm = this;

    vm.time = new Date().getTime();
    vm.boolean = false;
    vm.showBanner = null;

    vm._init = _init;

    function _init() {
      AdvertisementService.getAdsData()
        .then(function(success) {
          if($stateParams.localAd){
            vm.showBanner = success;
            vm.boolean = true;
            nextState();
          }else{
            if(success.data.image[0].valid_from*1000 <= time) {
              vm.showBanner = success.data.image[0].url;
              AdvertisementService.saveToLocalSystem()
                .then(function(success) {
                  vm.boolean = true;
                  nextState();
                });
            }
          }
          nextState();
        }, function(error) {
          vm.boolean = false;
          nextState();
        });
    }

    function nextState() {
      if(boolean){
        $timeout(function(){
          $cordovaSplashscreen.hide();
        }, 500);
        if($stateParams.connection.hasInternet){
          $('#advertisement').delay(3000).fadeOut(400);
          $timeout(function(){
            $state.transitionTo('app.home');
          }, 3500);
        }else{
          $cordovaSplashscreen.hide();
          $state.transitionTo('app.error');
        }
      }else{
        vm.showBanner = null;
        if($stateParams.connection.hasInternet){
          $state.transitionTo('app.home');
        }else{
          $cordovaSplashscreen.hide();
          $state.transitionTo('app.error');
        }
      }
    }
  }
})();

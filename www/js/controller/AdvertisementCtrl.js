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
            if ($stateParams.data) {
                vm.showBanner = $stateParams.data.data.image[0].url;
                AdvertisementService.saveToLocalSystem($stateParams.data, $stateParams.locationPath)
                    .then(function (success) {
                        vm.boolean = true;
                        nextState();
                    });
            } else {
                vm.showBanner = $stateParams.localAd;
                AdvertisementService.saveToLocalSystem($stateParams.newData, $stateParams.locationPath)
                    .then(function (success) {
                        vm.boolean = false;
                        nextState();
                    });
            }
        }

        function nextState() {
            if (vm.boolean) {
                $timeout(function () {
                    $cordovaSplashscreen.hide();
                }, 500);
                if ($stateParams.connection) {
                    $('#advertisement').delay(3000).fadeOut(400);
                    $timeout(function () {
                        $state.go('app.home');
                    }, 3000);
                } else {
                    $cordovaSplashscreen.hide();
                    $state.go('app.error');
                }
            } else {
                $timeout(function () {
                    $cordovaSplashscreen.hide();
                }, 500);
                if ($stateParams.connection) {
                    $timeout(function () {
                        $state.go('app.home');
                    }, 3000);
                } else {
                    $cordovaSplashscreen.hide();
                    $state.go('app.error');
                }
            }
        }

        vm._init();
    }
})();

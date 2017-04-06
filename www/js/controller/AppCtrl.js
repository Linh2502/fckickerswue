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
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('timeoutHttpIntercept');
        }])
        .factory('timeoutHttpIntercept', function ($rootScope, $q) {
            return {
                'request': function(config) {
                    config.timeout = 10000;
                    return config;
                }
            };
        })
        .controller('AppCtrl', AppController);

    AppController.$inject = ['$location', '$scope', '$rootScope', '$timeout', '$state', '$ionicSideMenuDelegate',
        '$ionicHistory', '$ionicScrollDelegate', '$ionicPlatform'];

    function AppController($location, $scope, $rootScope, $timeout, $state, $ionicSideMenuDelegate,
                           $ionicHistory, $ionicScrollDelegate, $ionicPlatform) {
        $ionicSideMenuDelegate.edgeDragThreshold(20);
        $ionicSideMenuDelegate.canDragContent(true);
        $ionicHistory.nextViewOptions({
            historyRoot: true,
            disableAnimate: true,
            expire: 100
        });

        var vm = this;
        vm.showBackButton = true;
        vm.isSideMenuOpen = false;

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

        $scope.$watch(function () {
                return $ionicSideMenuDelegate.isOpenLeft();
            },
            function (isOpen) {
                vm.isSideMenuOpen = isOpen;
            });

        var lockButton = false;
        $('#submenu').hide();

        checkSettingsNotification();
        function checkSettingsNotification() {
            if(ionic.Platform.isAndroid()) {
                if (window.localStorage['showSettingsNotificationOnceForAndroid']) {
                    window.localStorage['showSettingsNotificationCounterForAndroid'] = +window.localStorage['showSettingsNotificationCounterForAndroid'] + 1;
                } else {
                    window.localStorage['showSettingsNotificationCounterForAndroid'] = 1;
                    $timeout(function () {
                        $('#settings-notification').show();
                    }, 5000);
                }
            } else {
                if (window.localStorage['showSettingsNotificationOnce']) {
                    window.localStorage['showSettingsNotificationCounter'] = +window.localStorage['showSettingsNotificationCounter'] + 1;
                } else {
                    window.localStorage['showSettingsNotificationCounter'] = 1;
                    $timeout(function () {
                        $('#settings-notification').show();
                    }, 5000);
                }
            }
        }

        function closeSettings() {
            window.localStorage['showSettingsNotificationOnce'] = 'true';
            if(ionic.Platform.isAndroid()) {
                window.localStorage['showSettingsNotificationOnceForAndroid'] = 'true';
            }
            $('#settings-notification').hide();
        }

        function navigateToSettings() {
            window.localStorage['showSettingsNotificationOnce'] = 'true';
            if(ionic.Platform.isAndroid()) {
                window.localStorage['showSettingsNotificationOnceForAndroid'] = 'true';
            }
            $('#settings-notification').hide();
            handleNavigation("app.settings");
        }

        function closeMenu() {
            vm.showBackButton = true;
            vm.isSideMenuOpen = false;
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
                if ($ionicHistory.backView().stateName == "app.home") {
                    handleNavigation("app.home");
                } else {
                    handleNavigation("app.aktionen");
                }
            }
        }

        function openSideMenu() {
            vm.showBackButton = false;
            if ($location.path() !== '/app/error' && $location.path() !== '/app/reconnect')
                if (!$ionicSideMenuDelegate.isOpenLeft()) {
                    vm.showBackButton = false;
                    vm.isSideMenuOpen = true;
                    $ionicSideMenuDelegate.toggleLeft(true);
                } else {
                    vm.showBackButton = true;
                    vm.isSideMenuOpen = false;
                    $ionicSideMenuDelegate.toggleLeft(false);
                }
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
            if ($location.path() !== '/app/error' && $location.path() !== '/app/reconnect')
                if ($ionicSideMenuDelegate.isOpenLeft()) {
                    $ionicSideMenuDelegate.toggleLeft(false);
                    $state.go('app.home');
                } else {
                    $state.go('app.home');
                }
        }

        function resizeContent() {
            $ionicScrollDelegate.$getByHandle('resize').resize();
        }

        function navigateToLiveTicker() {
            vm.isSideMenuOpen = false;
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

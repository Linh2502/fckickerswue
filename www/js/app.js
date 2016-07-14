/**
 * Created by Linh on 02.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 */
angular.module('starter', [
  'ionic',
  'ngCordova',
  'tabSlideBox',
  'loadingInterceptor',
  'ionicLazyLoad',
  'dateFilter',
  'ngSanitize',
  'youtube-embed',
  'directive.countdown',
  'directive.externallink',
  'directive.logo',
  'directive.slideboxheight',
  'ngIOS9UIWebViewPatch',
  'factory.splash',
  'service.advertisement',
  'service.home',
  'service.kader',
  'service.kickerstv',
  'service.matchcenter',
  'service.news',
  'service.singlenews',
  'service.singleplayer',
  'service.spielplan',
  'service.tabelle',
  'module.app',
  'module.advertisement',
  'module.arena',
  'module.datenschutz',
  'module.error',
  'module.home',
  'module.internet',
  'module.kader',
  'module.kickerstv',
  'module.matchcenter',
  'module.news',
  'module.singlenews',
  'module.singleplayer',
  'module.newsletter',
  'module.settings',
  'module.spielplan',
  'module.tabelle',
  'module.reconnect',
  'module.reloadcontent'
])
  .constant('ApiEndpoint', {
    url: 'https://www.wuerzburger-kickers.de/ajax/kickers/',
    version: '?app_version=1.0.30'
  })

  .run(function($rootScope, $ionicLoading, $ionicPlatform) {
    $rootScope.uuid = '&uuid=' + ionic.Platform.device().uuid;
    //$ionicPlatform.ready(function() {
    //  $rootScope.uuid = '&uuid=' + ionic.Platform.device().uuid;
    //  if (window.cordova && window.cordova.plugins.Keyboard) {
    //    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    //    cordova.plugins.Keyboard.disableScroll(true);
    //  }
    //  window.parsePlugin.initialize('H68ppzb0DIIIujrb2obzFuv66sclqsPLTuBprOoG', 'AyGtfTXRzcvVYMnCfZmPkjTK7TPVcfzmPcEkTOUt', function() {
    //    console.log('Parse initialized successfully.');
    //    window.parsePlugin.getInstallationId(function(id) {}, function(e) {});
    //  }, function(e) {
    //    console.log('Failure to initialize Parse.');
    //  });
    //});
  })

  .filter('trusted', ['$sce', function($sce){
    return function(url) {
      if(url!=undefined){
        var splitLinkAtEmbed = url.split("/embed/");
        var newLink = splitLinkAtEmbed[1].split("?");
        return $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + newLink[0] + "?rel=0&showinfo=0&controls=0&ps=docs&modestbranding=1");
      }else{
        return undefined;
      }
    }
  }])

  .config(function($ionicConfigProvider, $stateProvider, $urlRouterProvider) {
    $ionicConfigProvider.backButton.previousTitleText(false).text('');
    $ionicConfigProvider.views.swipeBackEnabled(false);
    $ionicConfigProvider.views.transition('ios');
    $ionicConfigProvider.navBar.alignTitle('center');
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.tabs.style('standard');
    $stateProvider

      .state('root', {
        url: '/',
        controller: 'InternetConnectionCtrl'
      })

      .state('werbepartner', {
        cache: true,
        url: '/werbepartner',
        templateUrl: 'templates/werbepartner.html',
        controller: 'AdvertisementCtrl',
        params: {connection: null, localAd: null}
      })

      .state('reload', {
        cache: true,
        url: '/reload',
        controller: 'ReloadContentCtrl',
        params: {connection: null}
      })

      .state('app', {
        cache: true,
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })

      .state('app.arena', {
        cache: false,
        url: '/arena',
        views: {
          'menuContent': {
            templateUrl: 'templates/arena.html',
            controller: 'ArenaCtrl as arenaVM'
          }
        }
      })

      .state('app.datenschutz', {
        cache: false,
        url: '/datenschutz',
        views: {
          'menuContent': {
            templateUrl: 'templates/datenschutz.html',
            controller: 'DatenschutzCtrl'
          }
        }
      })

      .state('app.error', {
        cache: false,
        url: '/error',
        views: {
          'menuContent': {
            templateUrl: 'templates/error.html',
            controller: 'ErrorCtrl',
            resolve: {
              splash: function(SplashScreen){
                return SplashScreen.removeSplash();
              }
            }
          }
        }
      })

      .state('app.home', {
        cache: false,
        url: '/home',
        views: {
          'menuContent': {
            templateUrl: 'templates/home.html',
            controller: 'HomeCtrl'
          }
        }
      })

      .state('app.impressum', {
        cache: false,
        url: '/impressum',
        views: {
          'menuContent': {
            templateUrl: 'templates/impressum.html'
          }
        }
      })

      .state('app.kader', {
        cache: true,
        url: '/kader',
        views: {
          'menuContent': {
            templateUrl: 'templates/kader.html',
            controller: 'KaderCtrl'
          }
        }
      })

      .state('app.kickerstv', {
        cache: true,
        url: '/kickerstv',
        views: {
          'menuContent': {
            templateUrl: 'templates/kickerstv.html',
            controller: 'KickersTVCtrl as ktvVM'
          }
        }
      })

      .state('app.kontakt', {
        cache: false,
        url: '/kontakt',
        views: {
          'menuContent': {
            templateUrl: 'templates/kontakt.html'
          }
        }
      })

      .state('app.matchcenter', {
        cache: false,
        url: '/matchcenter',
        params: {game: null},
        views: {
          'menuContent': {
            templateUrl: 'templates/matchcenter.html',
            controller: 'MatchCenterCtrl'
          }
        }
      })

      .state('app.news', {
        cache: true,
        url: '/news',
        views: {
          'menuContent': {
            templateUrl: 'templates/news.html',
            controller: 'NewsCtrl'
          }
        }
      })

      .state('app.singlenews', {
        cache: false,
        url: '/news/:newsId',
        views: {
          'menuContent': {
            templateUrl: 'templates/singlenews.html',
            controller: 'SingleNewsCtrl',
            params: {newsId: null}
          }
        }
      })

      .state('app.singleplayer', {
        cache: false,
        url: '/kader/:playerId',
        views: {
          'menuContent': {
            templateUrl: 'templates/singleplayer.html',
            controller: 'SinglePlayerCtrl',
            resolve: {
              singlePlayer: function($stateParams){
                return $stateParams.playerId;
              }
            }
          }
        }
      })

      .state('app.newsletter', {
        cache: false,
        url: '/newsletter',
        views: {
          'menuContent': {
            templateUrl: 'templates/newsletter.html',
            controller: 'NewsletterCtrl as newsLetterVM'
          }
        }
      })

      .state('app.settings', {
        cache: true,
        url: '/settings',
        views: {
          'menuContent': {
            templateUrl: 'templates/settings.html',
            controller: 'SettingsCtrl as settingsVM'
          }
        }
      })

      .state('app.spielplan', {
        cache: false,
        url: '/spielplan',
        views: {
          'menuContent': {
            templateUrl: 'templates/spielplan.html',
            controller: 'SpielplanCtrl'
          }
        }
      })

      .state('app.tabelle', {
        cache: false,
        url: '/tabelle',
        views: {
          'menuContent': {
            templateUrl: 'templates/tabelle.html',
            controller: 'TabelleCtrl'
          }
        }
      })

      .state('app.reconnect', {
        cache: false,
        url: '/reconnect',
        views: {
          'menuContent': {
            controller: 'ReconnectCtrl'
          }
        }
      })
    $urlRouterProvider.otherwise('/');
  });

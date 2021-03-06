/**
 * Created by Linh on 02.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * status: 14.07.2016 4:20 PM
 */
(function () {
    'use strict';

    angular
        .module('module.home', ['ionicLazyLoad', 'dateFilter'])
        .controller('HomeCtrl', HomeController);

    HomeController.$inject = ['$rootScope', '$scope', '$timeout', 'HomeService', 'MatchcenterService', '$ionicSideMenuDelegate', '$ionicSlideBoxDelegate', '$state', '$ionicPopup', '$cordovaSplashscreen'];

    function HomeController($rootScope, $scope, $timeout, HomeService, MatchcenterService, $ionicSideMenuDelegate, $ionicSlideBoxDelegate, $state, $ionicPopup, $cordovaSplashscreen) {
        $ionicSideMenuDelegate.canDragContent(true);
        var vm = this;
        vm.newsFeed = [];
        vm.gamesFeed = [];
        vm.promotionFeed = [];
        vm.videosFeed = [];
        vm.matchCenterFeed = [];
        vm.doublepoint = ':';
        vm.liveDate = null;
        vm.liveDateDay = null;
        vm.liveDateTime = null;
        vm.detailsFeed = null;
        vm.getHomeData = null;
        vm.getMatchCenterData = null;

        vm.activeSlideNews, vm.activeSlideGames, vm.activeSlidePromotions, vm.activeSlideVideos = 0;

        vm._init = _init;
        vm.autoPlay = autoPlay;
        vm.switchView = switchView;
        vm.playVideo = playVideo;
        vm.navigateToNews = navigateToNews;
        vm.navigateToMatchCenter = navigateToMatchCenter;
        vm.navigateToLiveTicker = navigateToLiveTicker;
        vm.navigateToPromotion = navigateToPromotion;
        vm.reslideNews = reslideNews;
        vm.reslidePromotions = reslidePromotions;

        function _init() {
            //$cordovaSplashscreen.hide();
            $rootScope.$broadcast('show_loader');
            HomeService.fetchHomeData()
                .then(function (success) {
                    vm.getHomeData = success;
                    setNewsFeed(success.data.news);
                    setGamesFeed(success.data.matches);
                    setPromotionFeed(success.data.promotions);
                    setVideosFeed(success.data.videos);

                    $ionicSlideBoxDelegate.$getByHandle('news').update();
                    $ionicSlideBoxDelegate.$getByHandle('spiel').update();
                    $ionicSlideBoxDelegate.$getByHandle('promotion').update();
                    $ionicSlideBoxDelegate.$getByHandle('video').update();
                    MatchcenterService.refreshLiveTicker()
                        .then(function (success) {
                            vm.getMatchCenterData = success;
                            vm.detailsFeed = success.data.details;
                            setLiveTickerTime(success.data.details);
                            checkLiveTicker();
                            $rootScope.$broadcast('hide_loader');
                        });
                });
        }

        $rootScope.$on('isLive', function () {
            checkLiveTicker();
        });

        $rootScope.$on('isNotLive', function () {
            vm.gamesFeed = [];
            vm.detailsFeed = [];
            vm.detailsFeed = vm.getMatchCenterData.data.details;
            setGamesFeed(vm.getHomeData.data.matches);
            $timeout.cancel();
        });

        function setLiveTickerTime(details) {
            var splitLiveDate = details.eventdate_start.split(" ");
            var liveDate = splitLiveDate[0];
            var liveTime = splitLiveDate[1];
            vm.liveDateDay = liveDate;
            vm.liveDateTime = liveTime;
            vm.liveDate = liveDate + "T" + liveTime;
        }

        function setNewsFeed(news) {
            vm.newsFeed = [];
            for (var i = 0; i < news.item.length; i++) {
                var splitDate = news.item[i].eventdate_start.split(" ");
                var date = splitDate[0];
                var time = splitDate[1];
                vm.newsFeed.push({
                    id: news.item[i].id,
                    title: news.item[i].title,
                    date: date,
                    time: time,
                    image: news.item[i].image,
                    slug: news.item[i].slug
                })
            }
        }

        function setGamesFeed(matches) {
            var splitDate = matches.next.eventdate_start.split(" ");
            var date = splitDate[0];
            var time = splitDate[1];
            $scope.date = date + "T" + time;

            vm.gamesFeed.push(
                {
                    title: 'Nächstes Spiel', date: date, time: time, tickets: 'Tickets',
                    soccerTeam: {
                        team_away: {name: matches.next.team_away, image: matches.next.logo_away},
                        team_home: {name: matches.next.team_home, image: matches.next.logo_home}
                    },
                    result: matches.next.result
                },
                {
                    title: 'Letztes Spiel', matchCenter: 'Match Center',
                    soccerTeam: {
                        team_away: {name: matches.previous.team_away, image: matches.previous.logo_away},
                        team_home: {name: matches.previous.team_home, image: matches.previous.logo_home}
                    },
                    result: matches.previous.result
                }
            )
        }

        function setPromotionFeed(promotions) {
            vm.promotionFeed = [];
            for (var i = 0; i < promotions.item.length; i++) {
                var splitDate = promotions.item[i].eventdate_start.split(" ");
                var date = splitDate[0];
                var time = splitDate[1];
                vm.promotionFeed.push({
                    id: promotions.item[i].id,
                    title: promotions.item[i].title,
                    date: date,
                    time: time,
                    image: promotions.item[i].image,
                    slug: promotions.item[i].slug
                })
            }
        }

        function setVideosFeed(videos) {
            for (var i = 0; i < videos.item.length; i++) {
                videos.item[i].videoLink = '';
                vm.videosFeed.push(videos.item[i]);
            }
        }

        function checkLiveTicker() {
          MatchcenterService.refreshLiveTicker()
            .then(function (success) {
              if (success.data.details.live === 'true') {
                $rootScope.isLive = true;
                vm.gamesFeed = [];
                vm.detailsFeed = [];
                vm.detailsFeed = success.data.details;
                $timeout(function () {
                  checkLiveTicker();
                }, 30000);
              }
            })
        }

        function autoPlay() {
            return true;
        }

        function switchView(index) {
            if (index === 1) {
                $timeout(function () {
                    vm.activeSlideGames = 0;
                }, 5000);
            } else {
                $timeout(function () {
                }, 5000);
            }
        }

        function playVideo(player, video) {
            video.videoLink = video.link;
            if (navigator.connection.type == Connection.NONE || navigator.connection.type == Connection.UNKNOWN) {
                $ionicPopup.alert({
                    title: "Keine Internetverbindung",
                    content: "Beim Herstellen der Verbindung zum Würzburger Kickers - Server ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut."
                }).then(function (res) {
                });
            } else {
                if (window.localStorage['WifiEnabled'] == 'true') {
                    if (navigator.connection.type == Connection.WIFI) {
                        $('#home-' + video.id).hide();
                        $('.video-z-index').show();
                        player.playVideo();
                    } else {
                        $ionicPopup.alert({
                            title: "Keine WiFi-Verbindung vorhanden",
                            content: "Sie sind nicht mit dem WiFi verbunden. Um Videos dennoch abspielen zu können, überprüfen Sie erneut Ihre Einstellungen."
                        }).then(function (res) {
                        });
                    }
                } else {
                    $('#home-' + video.id).hide();
                    $('.video-z-index').show();
                    player.playVideo();
                }
            }
        }

        function navigateToNews(id) {
            $state.go('app.singlenews', {newsId: id});
        }

        function navigateToMatchCenter() {
            $ionicSideMenuDelegate.toggleLeft(false);
            $state.go('app.matchcenter', {game: {isLive: false}});
        }

        function navigateToLiveTicker() {
            if (vm.getMatchCenterData.data.details.live === 'true') {
                $state.go('app.matchcenter', {game: {isLive: true}});
            } else {
                $state.go('app.matchcenter', {game: {isLive: false}});
            }
        }

        function navigateToPromotion(id) {
            $state.go('app.singleaktion', {aktionId: id});
        }

        function reslideNews(index) {
            if (index === 4) {
                $timeout(function () {
                    vm.activeSlideNews = 0;
                }, 5000);
            } else {
                $timeout(function () {
                }, 5000);
            }
        }

        function reslidePromotions(index) {
            if (index === 4) {
                $timeout(function () {
                    vm.activeSlidePromotions = 0;
                }, 5000);
            } else {
                $timeout(function () {
                }, 5000);
            }
        }

        function reslideVideos(index) {
            if (index === 2) {
                $timeout(function () {
                    vm.activeSlideVideos = 0;
                }, 5000);
            } else {
                $timeout(function () {
                }, 5000);
            }
        }

        vm._init();
    }
})();

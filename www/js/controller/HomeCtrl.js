/**
 * Created by Linh on 02.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 */
angular.module('module.home', ['ionicLazyLoad', 'dateFilter'])
  .controller('HomeCtrl', function($rootScope, $scope, $ionicModal, $timeout, HomeService, MatchcenterService, $ionicSideMenuDelegate, $ionicSlideBoxDelegate, $state, $ionicHistory, $ionicPopup, $cordovaSplashscreen){
    $ionicSideMenuDelegate.canDragContent(true);
    $scope.newsFeed = [];
    $scope.gamesFeed = [];
    $scope.videosFeed = [];
    $scope.matchCenterFeed = [];
    $scope.doublepoint = ':';
    $scope.liveDate = null;
    $scope.liveDateDay = null;
    $scope.liveDateTime = null;
    $scope.detailsFeed = null;
    var showContent = false;
    $scope.$on('$ionicView.beforeEnter', function() {
      $cordovaSplashscreen.hide();
      $rootScope.$broadcast('show_loader');
      MatchcenterService.refreshLiveTicker();
      HomeService.fetchHomeData().then(function(success) {
        setNewsFeed(HomeService.getNewsData());
        setGamesFeed(HomeService.getMatchesData());
        setVideosFeed(HomeService.getVideosData());
        $ionicSlideBoxDelegate.$getByHandle('news').update();
        $ionicSlideBoxDelegate.$getByHandle('spiel').update();
        $ionicSlideBoxDelegate.$getByHandle('video').update();
        $scope.detailsFeed = MatchcenterService.getDetailsData();
        setLiveTickerTime();
        checkLiveTicker();
        showContent = true;
      });
    });

    $scope.$on('$ionicView.afterEnter', function() {
      hideLoader();
    });

    $rootScope.$on('isLive', function(){
      checkLiveTicker();
    });

    $rootScope.$on('isNotLive', function() {
      $scope.gamesFeed = [];
      $scope.detailsFeed = [];
      $scope.detailsFeed = MatchcenterService.getDetailsData();
      setGamesFeed(HomeService.getMatchesData());
      $timeout.cancel();
    });

    function setLiveTickerTime(){
      var splitLiveDate = MatchcenterService.getDetailsData().eventdate_start.split(" ");
      var liveDate = splitLiveDate[0];
      var liveTime = splitLiveDate[1];
      $scope.liveDateDay = liveDate;
      $scope.liveDateTime = liveTime;
      $scope.liveDate = liveDate + "T" + liveTime;
    }

    function setNewsFeed(news){
      $scope.newsFeed1 = [];
      for(var i = 0; i < news.item.length; i++){
        var splitDate = news.item[i].eventdate_start.split(" ");
        var date = splitDate[0];
        var time = splitDate[1];
        $scope.newsFeed1.push({
          id: news.item[i].id, title: news.item[i].title, date: date, time: time, image: news.item[i].image, slug: news.item[i].slug
        })
      };
      $scope.newsFeed = [];
      $scope.newsFeed = $scope.newsFeed1;
    }

    function setGamesFeed(matches){
      var splitDate = matches.next.eventdate_start.split(" ");
      var date = splitDate[0];
      var time = splitDate[1];
      $scope.date = date + "T" + time;

      $scope.gamesFeed.push(
        { title: 'Nächstes Spiel', date: date, time: time, tickets: 'Tickets',
          soccerTeam: {
            team_away: { name: matches.next.team_away, image: matches.next.logo_away },
            team_home: { name: matches.next.team_home, image: matches.next.logo_home }
          },
          result: matches.next.result
        },
        { title: 'Letztes Spiel', matchCenter: 'Match Center',
          soccerTeam: {
            team_away: { name: matches.previous.team_away, image: matches.previous.logo_away },
            team_home: { name: matches.previous.team_home, image: matches.previous.logo_home }
          },
          result: matches.previous.result
        }
      )
    }

    function setVideosFeed(videos){
      for(var i = 0; i < videos.item.length; i++) {
        $scope.videosFeed.push(videos.item[i]);
      }
    }

    function checkLiveTicker(){
      if($rootScope.isLive){
        MatchcenterService.refreshLiveTicker();
        $scope.gamesFeed = [];
        $scope.detailsFeed = [];
        $scope.detailsFeed = MatchcenterService.getDetailsData();
        setGamesFeed(HomeService.getMatchesData());
        $timeout(function(){
          console.log("live ticker refreshed");
          checkLiveTicker();
        }, 30000);
      }
    }

    $scope.autoPlay = function(){
      return true;
    };

    $scope.switch = function(index){
      if(index == 0){
        $timeout(function(){
          $ionicSlideBoxDelegate.$getByHandle('spiel').next();
        }, 6000);
      }else if(index == 1){
        $timeout(function() {
          $ionicSlideBoxDelegate.$getByHandle('spiel').previous();
        }, 6000);
      }
    };

    $scope.playVideo = function(player, video){
      if(navigator.connection.type == Connection.NONE || navigator.connection.type == Connection.UNKNOWN) {
        $ionicPopup.alert({
          title: "Keine Internetverbindung",
          content: "Beim Herstellen der Verbindung zum Würzburger Kickers - Server ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut."
        }).then(function(res) {
        });
      }else{
        if(window.localStorage['WifiEnabled'] == 'true'){
          if(navigator.connection.type == Connection.WIFI){
            $('#home-' + video.id).hide();
            $('.video-z-index').show();
            player.playVideo();
          }else{
            $ionicPopup.alert({
              title: "Keine WiFi-Verbindung vorhanden",
              content: "Sie sind nicht mit dem WiFi verbunden. Um Videos dennoch abspielen zu können, überprüfen Sie erneut Ihre Einstellungen."
            }).then(function(res) {
            });
          }
        }else{
          $('#home-' + video.id).hide();
          $('.video-z-index').show();
          player.playVideo();
        }
      }
    };

    $scope.navigateToNews = function(id){
      $state.go('app.singlenews', {newsId:id});
    };

    $scope.navigateToMatchCenter = function(){
      $ionicSideMenuDelegate.toggleLeft(false);
      $state.go('app.matchcenter', {game: {isLive: false}});
    };

    function hideLoader(){
      if(showContent){
        $rootScope.$broadcast('hide_loader');
      }else{
        $timeout(function(){
          hideLoader();
        }, 1000);
      }
    }
  });

/**
 * Created by Linh on 02.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 */
angular.module('module.matchcenter', [])
  .controller('MatchCenterCtrl', function($rootScope, $scope, $ionicModal, $timeout, MatchcenterService, $ionicSideMenuDelegate, $ionicPopup, $ionicSlideBoxDelegate, $stateParams, $ionicScrollDelegate){
    $ionicSideMenuDelegate.canDragContent(true);
    $scope.matchCenterFeed = null;
    $scope.liveTickerFeed = [];
    $scope.detailsFeed = [];
    $scope.videosFeed = [];
    $scope.tableFeed = [];
    $scope.html = [];
    $scope.isLive = false;
    $scope.enableLiveTickerInfiniteScroll = false;
    var showContent = false;

    $scope.$on('$ionicView.beforeEnter', function() {
      $ionicSideMenuDelegate.toggleLeft(false);
      $rootScope.$broadcast('show_loader');
      $('#spielbericht').hide();
      $('#live').hide();
      $('#kickersTV').hide();
      $('#tabelle').hide();
      MatchcenterService.refreshLiveTicker();
    });

    $rootScope.$on('show_content_matchcenter', function() {
      $scope.detailsFeed = MatchcenterService.getDetailsData();
      setLiveTickerFeed(MatchcenterService.getLiveTickerData());
      setVideosFeed(MatchcenterService.getVideosData());
      showContent = true;
      console.log("request success matchcenter");
    });

    $scope.$on('$ionicView.afterEnter', function(){
      $('#tabelle').show();
      $('#spielbericht').show();
      hideLoader();
    });

    function setLiveTickerFeed(liveticker){
      $scope.liveTickerFeed = [];
      for(var i = 0; i < liveticker.item.length; i++){
        if(i < liveticker.item.length){
          $scope.liveTickerFeed.push({
            minute: checkIfHasValue(liveticker.item[i].minute), type: checkIfHasValue(liveticker.item[i].type), text: liveticker.item[i].text
          });
        }
      }
    }

    function checkIfHasValue(value){
      if(typeof value === 'object'){
        return null;
      }else {
        return value;
      }
    }

    function setVideosFeed(videos){
      $scope.videosFeed = [];
      if(videos == undefined){
        $scope.videosFeed = null;
      }else{
        if(!videos.item.length){
          $scope.videosFeed.push(videos.item);
        }else{
          for(var i = 0; i < videos.item.length; i++){
            $scope.videosFeed.push(videos.item[i]);
          }
        }
      }
    }

    function setTableFeed(tables){
      $scope.tableFeed = [];
      for(var i = 0; i < tables.row.length; i++){
        $scope.tableFeed.push(tables.row[i]);
      }
    }

    function refreshLiveTickerFeed(){
      if($scope.isLive){
        $timeout(function(){
          $('#spinner').hide();
          $('#live').fadeTo(1000, 1);
        }, 1500);
        MatchcenterService.refreshLiveTicker();
        $scope.liveTickerFeed = [];
        $scope.detailsFeed = [];
        $scope.detailsFeed = MatchcenterService.getDetailsData();
        setLiveTickerFeed(MatchcenterService.getLiveTickerData());
        $timeout(function(){
          $('#spinner').show();
          $('#live').fadeTo(1000, 0.25);
          refreshLiveTickerFeed();
        }, 30000);
      }
    }

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
            $('#matchcenter-' + video.id).hide();
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
          $('#matchcenter-' + video.id).hide();
          $('.video-z-index').show();
          player.playVideo();
        }
      }
    }

    $scope.previousView = function() {
      if(!$scope.isLive) {
        $ionicSlideBoxDelegate.previous();
        loadContent($ionicSlideBoxDelegate.currentIndex());
      }
    }

    $scope.nextView = function() {
      if(!$scope.isLive) {
        $ionicSlideBoxDelegate.next();
        loadContent($ionicSlideBoxDelegate.currentIndex());
      }
    }

    $timeout(function () {
      $('.ex-link').click(function () {
        var url = $(this).attr('href');
        window.open(encodeURI(url), '_system', 'location=yes');
        return false;
      })
    })

    $scope.loadLiveTicker = function() {
      $('#spinner').show();
      $('#live').fadeTo(1000, 0.25);
      $timeout(function(){
        setLiveTickerFeed(MatchcenterService.getLiveTickerData());
        $('#spinner').hide();
        $('#live').fadeTo(1000, 1);
      }, 1000);
      refreshLiveTickerFeed();
    }

    $scope.loadDetailsFeed = function() {
      $ionicScrollDelegate.freezeAllScrolls(true);
      $('#live').show();
      $('#kickersTV').show();
      $scope.detailsFeed = MatchcenterService.getDetailsData();
      $timeout(function(){
        $ionicScrollDelegate.freezeAllScrolls(false);
      }, 1000);
    }

    $scope.loadVideosFeed = function() {
      $ionicScrollDelegate.freezeAllScrolls(true);
      setVideosFeed(MatchcenterService.getVideosData());
      $timeout(function(){
        $ionicScrollDelegate.freezeAllScrolls(false);
      }, 1000);
    }

    $scope.loadTableFeed = function() {
      $ionicScrollDelegate.freezeAllScrolls(true);
      setTableFeed(MatchcenterService.getTableData());
      $timeout(function(){
        $ionicScrollDelegate.freezeAllScrolls(false);
      }, 1000);
    }

    $scope.disableSwipe = function() {
      $ionicSlideBoxDelegate.enableSlide(false);
    };

    function loadContent(index){
      if(index == 0 || index == 1){
        $scope.loadDetailsFeed();
      }else if(index == 2){
        $scope.loadLiveTicker();
      }else if(index == 3){
        $scope.loadVideosFeed();
      }else if(index == 4){
        $scope.loadTableFeed();
      }
    }

    function hideLoader(){
      if(showContent){
        $rootScope.$broadcast('hide_loader');
        if($stateParams.game != null){
          if($stateParams.game.isLive){
            $scope.isLive = true;
            $rootScope.isLive = true;
            $ionicSlideBoxDelegate.$getByHandle('matchcenter').slide(2);
            $('#standard').hide();
            refreshLiveTickerFeed();
          }else{
            $('#spinner').hide();
            $scope.isLive = false;
            $ionicSlideBoxDelegate.$getByHandle('matchcenter').slide(1);
            $ionicSlideBoxDelegate.$getByHandle('matchcenter').slide(0);
          }
        }else{
          $('#spinner').hide();
          $scope.isLive = false;
          $ionicSlideBoxDelegate.$getByHandle('matchcenter').slide(1);
          $ionicSlideBoxDelegate.$getByHandle('matchcenter').slide(0);
        }
      }else{
        $timeout(function(){
          hideLoader();
        }, 1000);
      }
    }
  });

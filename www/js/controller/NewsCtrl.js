/**
 * Created by Linh on 02.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * - final -
 */
angular.module('module.news', ['ionicLazyLoad', 'dateFilter'])
  .controller('NewsCtrl', function($rootScope, $scope, $ionicModal, NewsService, HomeService, $state, $timeout, $ionicSideMenuDelegate){
    $ionicSideMenuDelegate.canDragContent(true);
    var lockButton = false;
    var showContent = false;
    $scope.newsFeed = [];
    $scope.game = [];

    $scope.$on('$ionicView.beforeEnter', function() {
      $('#news').hide();
      $ionicSideMenuDelegate.toggleLeft(false);
      $rootScope.$broadcast('show_loader');
      NewsService.fetchNewsData().then(function(success) {
        setGamesFeed(HomeService.getMatchesData());
        setNewsFeed(NewsService.getData());
        showContent = true;
        hideLoader();
      });
    });

    $rootScope.$on('show_content_news', function() {
      console.log("request success news");
    });

    function setNewsFeed(news){
      for(var i = 0; i < news.item.length; i++){
        var splitDate = news.item[i].eventdate_start.split(" ");
        var date = splitDate[0];
        var time = splitDate[1];
        $scope.newsFeed.push({
          id: news.item[i].id, title: news.item[i].title, date: date, time: time, image: news.item[i].image, slug: news.item[i].slug
        });
      }
    }
    function setGamesFeed(matches){
      var splitDate = matches.next.eventdate_start.split(" ");
      var date = splitDate[0];
      var time = splitDate[1];
      $scope.date = date + "T" + time;
      $scope.game.push(
        { title: 'Nächstes Spiel', date: date, time: time, type: 'Uhr', tickets: 'Tickets',
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

    $scope.refresh = function() {
      $scope.newsFeed = [];
      NewsService.fetchNewsData();
      setNewsFeed(NewsService.getData());
      $scope.$broadcast('scroll.refreshComplete');
    };

    $scope.navigateToNews = function(id){
      if(lockButton == false){
        $state.go('app.singlenews', {newsId:id});
        lockButton = true;
        setTimeout(function(){ lockButton = false; }, 1000);
      }
    };

    function hideLoader(){
      if(showContent){
        $('#news').show();
        $rootScope.$broadcast('hide_loader');
      }else{
        $timeout(function(){
          hideLoader();
        }, 1000);
      }
    }
  });

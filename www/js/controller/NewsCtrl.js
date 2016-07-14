/**
 * Created by Linh on 02.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * status: 14.07.2016 3:49 PM
 */
(function () {
  'use strict';

  angular
    .module('module.news', ['ionicLazyLoad', 'dateFilter'])
    .controller('NewsCtrl', NewsController);

  NewsController.$inject = ['$rootScope', '$scope', 'NewsService', 'HomeService', '$state', '$timeout', '$ionicSideMenuDelegate'];

  function NewsController($rootScope, $scope, NewsService, HomeService, $state, $timeout, $ionicSideMenuDelegate) {
    $ionicSideMenuDelegate.canDragContent(true);
    var vm = this;

    vm.lockButton = false;
    vm.newsFeed = [];
    vm.game = [];

    vm._init = _init;
    vm.refresh = refresh;
    vm.navigateToNews = navigateToNews;

    function _init() {
      $rootScope.$broadcast('show_loader');
      HomeService.fetchHomeData()
        .then(function(success) {
          setGamesFeed(success);
          NewsService.fetchNewsData()
            .then(function(success) {
              setNewsFeed(success);
              $rootScope.$broadcast('hide_loader');
            });
        });
    }

    function setNewsFeed(news) {
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
        });
      }
    }

    function setGamesFeed(matches) {
      var splitDate = matches.next.eventdate_start.split(" ");
      var date = splitDate[0];
      var time = splitDate[1];
      $scope.date = date + "T" + time;
      vm.game.push(
        {
          title: 'Nächstes Spiel', date: date, time: time, type: 'Uhr', tickets: 'Tickets',
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

    function refresh() {
      vm.newsFeed = [];
      NewsService.fetchNewsData()
        .then(function(success) {
          setNewsFeed(success);
          $scope.$broadcast('scroll.refreshComplete');
        });
    }

    function navigateToNews(id) {
      if (vm.lockButton == false) {
        $state.go('app.singlenews', {newsId: id});
        vm.lockButton = true;
        setTimeout(function () {
          vm.lockButton = false;
        }, 1000);
      }
    }

    vm._init();
  }
})();

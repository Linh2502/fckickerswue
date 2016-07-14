/**
 * Created by Linh on 16.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * - final -
 */
angular.module('module.singlenews', [])
  .controller('SingleNewsCtrl', function($rootScope, $scope, $timeout, $stateParams, SingleNewsService){
    var showContent = false;
    $scope.news = [{
      text: ''
    }];

    $scope.$on('$ionicView.beforeEnter', function() {
      $rootScope.$broadcast('show_loader');
      SingleNewsService.fetchSingleNewsData($stateParams.newsId);
    });

    $rootScope.$on('http_request_success_singlenews', function() {
      setNewsFeed(SingleNewsService.getSingleNews());
      $timeout(function () {
        $('.ex-link').click(function () {
          var url = $(this).attr('href');
          window.open(encodeURI(url), '_system', 'location=yes');
          return false;
        })
      });
      showContent = true;
    });

    $scope.$on('$ionicView.afterEnter', function () {
      hideLoader();
    });

    function setNewsFeed(news){
      $scope.news = [];
      var splitDate = news.data.news.item.eventdate_start.split(" ");
      var date = splitDate[0];
      var time = splitDate[1];
      $scope.news.push({
        id: news.data.news.item.id, title: news.data.news.item.title, date: date, time: time, text: news.data.news.item.text, image: news.data.news.item.image, slug: news.data.news.item.slug
      })
    }

    $timeout(function () {
      $('.ex-link').click(function () {
        var url = $(this).attr('href');
        window.open(encodeURI(url), '_system', 'location=yes');
        return false;
      })
    });

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
  })

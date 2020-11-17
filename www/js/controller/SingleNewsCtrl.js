/**
 * Created by Linh on 16.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * status: 14.07.2016 4:30 PM
 */
(function () {
  'use strict';

  angular
    .module('module.singlenews', [])
    .controller('SingleNewsCtrl', SingleNewsController);

  SingleNewsController.$inject = ['$rootScope', '$timeout', '$stateParams', 'SingleNewsService'];

  function SingleNewsController($rootScope, $timeout, $stateParams, SingleNewsService) {
    var vm = this;
    vm.news = [{
      text: ''
    }];

    vm._init = _init;

    function _init() {
      $rootScope.$broadcast('show_loader');
      SingleNewsService.fetchSingleNewsData($stateParams.newsId)
        .then(function (success) {
          setNewsFeed(success);
          $timeout(function () {
            $('.ex-link').click(function () {
              var url = $(this).attr('href');
              window.open(encodeURI(url), '_system', 'location=yes');
              return false;
            })
          });
          $rootScope.$broadcast('hide_loader');
        });
    }


    function setNewsFeed(news) {
      vm.news = [];
      var splitDate = news.data.news.item.eventdate_start.split(" ");
      var date = splitDate[0];
      var time = splitDate[1];
      vm.news.push({
        id: news.data.news.item.id,
        title: news.data.news.item.title,
        date: date,
        time: time,
        text: news.data.news.item.text,
        image: news.data.news.item.image,
        slug: news.data.news.item.slug
      })
    }

    vm._init();
  }
})();

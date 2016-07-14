/**
 * Created by Linh on 17.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * - final -
 */
angular.module('directive.externallink', [])
  .directive('browseTo', function ($ionicGesture) {
    return {
      restrict: 'A',
      link: function ($scope, $element, $attrs) {
        var handleTap = function (e) {
          var inAppBrowser = window.open(encodeURI($attrs.browseTo), '_system');
        };
        var tapGesture = $ionicGesture.on('tap', handleTap, $element);
        $scope.$on('$destroy', function () {
          $ionicGesture.off(tapGesture, 'tap', handleTap);
        });
      }
    }
  })
  .filter('externalLinks', function($sce) {
    return function(text) {
      var youtubeLink1 = String(text).replace(/autoplay=1" rel="lightbox">/g, 'autoplay=1&start=0&enablejsapi=1" class="fancybox.iframe ex-link"></iframe></div></a><a class="display-none">');
      var youtubeLink2 = String(youtubeLink1).replace(/autoplay=1" target="_blank" rel="lightbox">/g, 'autoplay=1&start=0&enablejsapi=1" class="fancybox.iframe ex-link"></iframe></div></a><a class="display-none">');
      var youtubeLink3 = String(youtubeLink2).replace(/autoplay=1" target="_blank" rel="lightbox" class="fancybox.iframe ex-link">/g, 'autoplay=1&start=0&enablejsapi=1" class="fancybox.iframe ex-link"></iframe></div></a><a class="display-none">');
      var modText = String(youtubeLink3).replace(/a browse-to=/gm, 'a class="ex-link" href=');
      var modText2 = String(modText).replace(/class="fancybox.iframe" browse-to=/gm, 'class="ex-link" href=');
      var youtubeLink4 = String(modText2).replace(/href="https:\/\/www.youtube.com\/embed/gm, '><div class="video-height"><iframe class="home-video-image" player="player" id="unique-youtube-embed-id-16" frameborder="0" allowfullscreen="1" title="YouTube video player" width="640" height="390" src="https://www.youtube.com/embed');
      return $sce.trustAsHtml(youtubeLink4);
    }
  })
  .filter('trustHTML', function($sce) {
    return function(text) {
      return $sce.trustAsHtml(text);
    };
  })

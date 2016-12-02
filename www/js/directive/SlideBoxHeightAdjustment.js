/**
 * Created by Linh on 02.12.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 */
/**
 * Credits: tannerlinsley @ forum.ionicframework.com
 */
angular.module('directive.slideboxheight', [])
  .directive('dynamicSlides', function() {
    return {
      require: ['^ionSlideBox'],
      link: function(scope, elem, attrs, slider) {
        scope.$watch(function() {
          return scope.$eval(attrs.dynamicSlides);
        }, function(val) {
          slider[0].__slider.update();
        });
      }
    };
  })
  .directive('dynamicHeight', function($timeout, $rootScope) {
    return {
      require: ['ionSlideBox'],
      link: function(scope, elem, attrs, slider) {
        scope.$watch(function() {
          return slider[0].__slider.selected();
        }, function(val) {
          var newHeight;
          if($rootScope.isLive){
            $timeout(function(){
              newHeight = $('.slider-slide', elem).eq(val).innerHeight();
              if (newHeight) {
                elem.animate({
                  height: newHeight + 'px'
                }, 500);
              }
            }, 1500);
          }else{
            $timeout(function(){
              newHeight = $('.slider-slide', elem).eq(val).innerHeight();
              if (newHeight) {
                elem.animate({
                  height: newHeight + 'px'
                }, 500);
              }
            }, 1000);
          }
        });
      }
    };
  });

/**
 * Created by Linh on 15.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * - final -
 */
angular.module('directive.countdown', [])
  .directive('myCurrentTime', ['$interval', '$rootScope', function($interval, $rootScope) {
    return function(scope, element, attrs) {
      var format, stopTimer;
      scope.zeroCountdown = false;
      $rootScope.isLive = false;
      var broadCastOnce = false;

      function updateTime() {
        element.text(CountDownTimer(scope.date));
      }

      scope.$watch(attrs.myCurrentTime, function(value) {
        format = value;
        updateTime();
      });

      stopTimer = $interval(updateTime, 1000);

      function CountDownTimer(dt)
      {
        if(scope.detailsFeed === null || scope.detailsFeed === undefined) {
          scope.detailsFeed = false;
          scope.detailsFeed.live = false;
        }
        var _second = 1000;
        var _minute = _second * 60;
        var _hour = _minute * 60;
        var _day = _hour * 24;

        var distance = new Date(dt) - new Date() - (36000*100);

        if(distance < 1 || scope.detailsFeed.live == 'true'){
          scope.zeroCountdown = true;
          $rootScope.isLive = true;
          if(!broadCastOnce){
            $rootScope.$broadcast('isLive');
            broadCastOnce = true;
          }
        }else{
          scope.zeroCountdown = false;
          $rootScope.isLive = false;
          if(broadCastOnce){
            broadCastOnce = false;
            $rootScope.$broadcast('isNotLive');
          }
        }

        scope.days = replaceGameFeedNumberWithImages(n(Math.floor(distance / _day)));
        scope.hours = replaceGameFeedNumberWithImages(n(Math.floor((distance % _day) / _hour)));
        scope.minutes = replaceGameFeedNumberWithImages(n(Math.floor((distance % _hour) / _minute)));
        scope.seconds = replaceGameFeedNumberWithImages((Math.floor((distance % _minute) / _second)));

        return distance;
      }

      function n(n){
        return n > 9 ? "" + n: "0" + n;
      }

      element.on('$destroy', function() {
        $interval.cancel(stopTimer);
      });

      function replaceGameFeedNumberWithImages(number){
        var replaceFull;
        var replaceDecimal;
        if(number < 10){
          replaceFull = "img/countdown-Zahlen/3x/" + 0 + "@3x.png";
          replaceDecimal = "img/countdown-Zahlen/3x/" + number/10*10 + "@3x.png";
        }else{
          var full = number.toString().split("");
          replaceFull = "img/countdown-Zahlen/3x/" + full[0] + "@3x.png";
          replaceDecimal = "img/countdown-Zahlen/3x/" + full[1] + "@3x.png";
        }
        scope.numbers = [];
        scope.numbers.push(replaceFull, replaceDecimal);
        return scope.numbers;
      }
    }
  }])

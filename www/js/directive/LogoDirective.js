/**
 * Created by Linh on 15.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * - final -
 */

angular.module('directive.logo', [])
  .directive('logoSwitcher', ['$location', '$ionicHistory', '$timeout', function(location){
    return {
      link: function(scope, $element){
        scope.$location = location;
        scope.$watch('$location.path()', function(locationPath) {
          if(locationPath == '/app/arena'){
            $element.html('<div class="image-logo image-arena kickers-slogan"></div>')
          }else if(locationPath == '/app/datenschutz'){
            $element.html('<div class="image-logo image-datenschutz kickers-slogan"></div>')
          }else if(locationPath == '/app/impressum'){
            $element.html('<div class="image-logo image-impressum kickers-slogan"></div>')
          }else if(locationPath == '/app/kader' || /\d/.test(locationPath) && locationPath.indexOf("kader") > -1){
            $element.html('<div class="image-logo image-kader kickers-slogan"></div>')
          }else if(locationPath == '/app/kickerstv'){
            $element.html('<div class="image-logo image-kickerstv kickers-slogan"></div>')
          }else if(locationPath == '/app/kontakt'){
            $element.html('<div class="image-logo image-kontakt kickers-slogan"></div>')
          }else if(locationPath == '/app/news' || /\d/.test(locationPath) && locationPath.indexOf("news") > -1){
            $element.html('<div class="image-logo image-news kickers-slogan"></div>')
          }else if(locationPath == '/app/newsletter'){
            $element.html('<div class="image-logo image-newsletter kickers-slogan"></div>')
          }else if(locationPath == '/app/spielplan'){
            $element.html('<div class="image-logo image-spielplan kickers-slogan"></div>')
          }else if(locationPath == '/app/tabelle'){
            $element.html('<div class="image-logo image-tabelle kickers-slogan"></div>')
          }else if(locationPath == '/app/settings'){
            $element.html('<div style="color: black"><div class="custom-title text-align-center" style="font-size: 13px !important;"><span class="vertical-align-mid"">Einstellungen</span><i class="fa fa-cog navigation-cog"></i></div></div>')
          }else {
            $element.html('<div class="image-logo image-home kickers-slogan"></div>');
          }
        });
      }
    }
  }])

/**
 * Created by Linh on 02.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * - final -
 */
angular.module('module.newsletter', [])
  .controller('NewsletterCtrl', function($scope, $http, $ionicSideMenuDelegate){
    $ionicSideMenuDelegate.canDragContent(true);
    $('#success').hide();
    $scope.subscribe = function(subscriptionForm){
      if(subscriptionForm.$invalid) {
        if (!subscriptionForm.email.$valid) {
          $('#emailError').show();
          subscriptionForm.email.$error.required = true;
        }
        if (!subscriptionForm.subscribe.$valid) {
          $('#subscriptionError').show();
          subscriptionForm.subscribe.$error.required = true;
        }
      }
      else{
        var data = {
          'anrede': subscriptionForm.gender.$viewValue,
          'firstname': subscriptionForm.surname.$viewValue,
          'lastname': subscriptionForm.name.$viewValue,
          'email': subscriptionForm.email.$viewValue,
          'datenschutz[]': 'aktzeptiert'
        };
        var transform = function(data){
          return $.param(data);
        }

        $http.post("https://www.wuerzburger-kickers.de/de/newsletter", data, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
          transformRequest: transform
        }).success(function(responseData) {
          $('#form').hide();
          $('#success').show();
        }).error(function(response) {
        });
      }
    }
  })

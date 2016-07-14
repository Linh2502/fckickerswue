/**
 * Created by Linh on 02.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * - final -
 */
(function () {
  angular
    .module('module.newsletter', [])
    .controller('NewsletterCtrl', NewsLetterController);

  NewsLetterController.$inject = ['$http', '$ionicSideMenuDelegate'];

  function NewsLetterController($http, $ionicSideMenuDelegate) {
    $ionicSideMenuDelegate.canDragContent(true);
    var vm = this;
    vm.showSuccess = false;
    vm.showSubscriptionForm = true;

    vm.subscribe = subscribe;

    function subscribe(subscriptionForm) {
      console.log(subscriptionForm);
      if (subscriptionForm.$invalid) {
        if (!subscriptionForm.email.$valid) {
          $('#emailError').show();
          subscriptionForm.email.$error.required = true;
        }
        if (!subscriptionForm.subscribe.$valid) {
          $('#subscriptionError').show();
          subscriptionForm.subscribe.$error.required = true;
        }
      }
      else {
        var data = {
          'anrede': subscriptionForm.gender.$viewValue,
          'firstname': subscriptionForm.surname.$viewValue,
          'lastname': subscriptionForm.name.$viewValue,
          'email': subscriptionForm.email.$viewValue,
          'datenschutz[]': 'aktzeptiert'
        };
        var transform = function (data) {
          return $.param(data);
        };
        vm.showSubscriptionForm = false;
        vm.showSuccess = true;

        //$http.post("https://www.wuerzburger-kickers.de/de/newsletter", data, {
        //  headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        //  transformRequest: transform
        //}).success(function (responseData) {
        //  vm.showSubscriptionForm = false;
        //  vm.showSuccess = true;
        //}).error(function (response) {
        //});
      }
    }
  }
})();

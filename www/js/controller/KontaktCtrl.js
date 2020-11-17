/**
 * Created by Linh on 02.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * status: 08.08.2016 2:58 PM
 */
(function () {
    'use strict';

    angular
        .module('module.contact', [])
        .controller('KontaktCtrl', ContactController);

    ContactController.$inject = ['$rootScope', '$state', 'MiscellaneousService'];

    function ContactController($rootScope, $state, MiscellaneousService) {
        var vm = this;
        vm.contact = null;

        vm._init = _init;

        function _init() {
            $rootScope.$broadcast('show_loader');
            MiscellaneousService.fetchMiscellaneousData()
                .then(function(success) {
                    vm.contact = success.data.contact;
                    $rootScope.$broadcast('hide_loader');
                }, function(error) {
                    $state.go('app.error');
                })
        }

        vm._init();
    }
})();

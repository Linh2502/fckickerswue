/**
 * Created by Linh on 02.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * status: 08.08.2016 2:58 PM
 */
(function () {
    'use strict';

    angular
        .module('module.impressum', [])
        .controller('ImpressumCtrl', ImpressumController);

    ImpressumController.$inject = ['$rootScope', '$state', 'MiscellaneousService'];

    function ImpressumController($rootScope, $state, MiscellaneousService) {
        var vm = this;
        vm.imprint = null;

        vm._init = _init;

        function _init() {
            $rootScope.$broadcast('show_loader');
            MiscellaneousService.fetchMiscellaneousData()
                .then(function(success) {
                    vm.imprint = success.data.imprint;
                    $rootScope.$broadcast('hide_loader');
                }, function(error) {
                    $state.go('app.error');
                })
        }

        vm._init();
    }
})();

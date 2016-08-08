/**
 * Created by Linh on 08.08.16.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * status: 08.08.2016 9:24 AM
 */
(function () {
    'use strict';

    angular
        .module('module.singleaktion', [])
        .controller('SingleAktionCtrl', SingleAktionController);

    SingleAktionController.$inject = ['$rootScope', 'SingleAktionService', '$timeout', '$stateParams'];

    function SingleAktionController($rootScope, SingleAktionService, $timeout, $stateParams) {
        var vm = this;
        vm.aktion = [{
            text: ''
        }];

        vm._init = _init;

        function _init() {
            $rootScope.$broadcast('show_loader');
            SingleAktionService.fetchSingleAktionData($stateParams.aktionId)
                .then(function (success) {
                    setAktionFeed(success);
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


        function setAktionFeed(aktion) {
            vm.aktion = [];
            var splitDate = aktion.data.promotion.item.eventdate_start.split(" ");
            var date = splitDate[0];
            var time = splitDate[1];
            vm.aktion.push({
                id: aktion.data.promotion.item.id,
                title: aktion.data.promotion.item.title,
                date: date,
                time: time,
                text: aktion.data.promotion.item.text,
                image: aktion.data.promotion.item.image,
                slug: aktion.data.promotion.item.slug
            })
        }

        vm._init();
    }
})();
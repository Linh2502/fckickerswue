/**
 * Created by Linh on 02.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * status: 08.12.2016 7:39 PM
 */
(function () {
    'use strict';

    angular
        .module('module.kader', ['ionicLazyLoad'])
        .controller('KaderCtrl', KaderController);

    KaderController.$inject = ['$rootScope', 'KaderService', 'SinglePlayerService', '$state', '$ionicSideMenuDelegate', '$ionicScrollDelegate'];

    function KaderController($rootScope, KaderService, SinglePlayerService, $state, $ionicSideMenuDelegate, $ionicScrollDelegate) {
        $ionicSideMenuDelegate.canDragContent(true);
        var vm = this;
        vm.tab = 3;
        vm.getSquadGoal = [];
        vm.getSquadOffense = [];
        vm.getSquadDefense = [];
        vm.getSquadMidfield = [];
        vm.goal = [];
        vm.offense = [];
        vm.defense = [];
        vm.midfield = [];

        var playerPair = [];
        var lockButton = false;

        vm._init = _init;
        vm.setTab = setTab;
        vm.showTab = showTab;
        vm.splitIntoHalf = splitIntoHalf;
        vm.setPlayer = setPlayer;
        vm.replaceNumberWithImage = replaceNumberWithImage;
        vm.viewPlayer = viewPlayer;

        function _init() {
            $rootScope.$broadcast('show_loader');
            KaderService.fetchKaderData()
                .then(function(success) {
                    vm.getSquadGoal = success.goal;
                    vm.getSquadDefense = success.defense;
                    vm.getSquadMidfield = success.midfield;
                    vm.getSquadOffense = success.offense;
                    vm.midfield = splitIntoHalf(vm.getSquadMidfield);
                    $ionicScrollDelegate.$getByHandle('resize').resize();
                    $rootScope.$broadcast('hide_loader');
                });
        }

        function setTab(tab) {
            if(tab == "1"){
                vm.goal = splitIntoHalf(vm.getSquadGoal);
                $ionicScrollDelegate.$getByHandle('resize').resize();
            }else if(tab == "2"){
                vm.defense = splitIntoHalf(vm.getSquadDefense);
                $ionicScrollDelegate.$getByHandle('resize').resize();
            }else if(tab == "3"){
                vm.midfield = splitIntoHalf(vm.getSquadMidfield);
                $ionicScrollDelegate.$getByHandle('resize').resize();
            }else{
                vm.offense = splitIntoHalf(vm.getSquadOffense);
                $ionicScrollDelegate.$getByHandle('resize').resize();
            }
            vm.tab = tab;
        }

        function showTab(tab) {
            $ionicScrollDelegate.$getByHandle('resize').resize();
            return vm.tab === tab;
        }

        function setPlayer(i, players){
            playerPair.push({
                number: i,
                id: players.player[i].id,
                title: players.player[i].title,
                trikotno: replaceNumberWithImage(players.player[i].trikotno),
                birthday: players.player[i].birthday,
                height: players.player[i].height,
                nationality: players.player[i].nationality,
                kicker_since: players.player[i].kicker_since,
                history: players.player[i].history,
                image: players.player[i].image,
                image_large: players.player[i].image_large
            });
        }

        function splitIntoHalf(players){
            var playerPool = [];
            var i = 0;
            for(i; i < players.player.length; i++){
                setPlayer(i, players);
                i++;
                if(i < players.player.length){
                    setPlayer(i, players);
                }
                playerPool.push(playerPair);
                playerPair = [];
            }
            return playerPool;
        }

        function replaceNumberWithImage(number){
            if(/^[0-9]+$/.test(number)){
                return "img/grafiken/3x/" + number + "@3x.png";
            }else{
                return number;
            }
        }

        function viewPlayer(player, position, squad, index){
            SinglePlayerService.setPlayerData(player, position, squad, index);
            if(lockButton == false){
                $state.go('app.singleplayer', {playerId: player.id});
                lockButton = true;
                setTimeout(function(){ lockButton = false; }, 1000);
            }
        }

        vm._init();
    }
})();
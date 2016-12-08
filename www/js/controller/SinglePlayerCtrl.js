/**
 * Created by Linh on 18.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 */
(function () {
    'use strict';

    angular
        .module('module.singleplayer', [])
        .controller('SinglePlayerCtrl', SinglePlayerController);

    SinglePlayerController.$inject = ['$scope', 'SinglePlayerService', '$ionicSlideBoxDelegate', 'singlePlayer'];

    function SinglePlayerController($scope, SinglePlayerService, $ionicSlideBoxDelegate, singlePlayer){
        var vm = this;
        vm.playerTeam = [];
        vm.selectedPlayer = SinglePlayerService.getPlayerData();
        vm.playerPosition = SinglePlayerService.getPlayerPosition();
        vm.currentPlayer = null;

        vm._init = _init;
        vm.setPlayerData = setPlayerData;
        vm.splitHistory = splitHistory;
        vm.replaceNumberWithImage = replaceNumberWithImage;
        vm.previousPlayer = previousPlayer;
        vm.nextPlayer = nextPlayer;

        function _init() {
            vm.setPlayerData(SinglePlayerService.getPlayerTeam());
        }

        function setPlayerData(squad) {
            for (var i = 0; i < squad.player.length; i++){
                if(singlePlayer == squad.player[i].id){
                    $scope.currentPlayer = i;
                }
                squad.player[i].history = vm.splitHistory(squad.player[i].history);
                squad.player[i].trikotno = vm.replaceNumberWithImage(squad.player[i].trikotno);
                vm.playerTeam.push(squad.player[i]);
            }
        }

        function splitHistory(history){
            var html = "";
            var split = history.__cdata.split(",");
            for(var i = 0; i < split.length; i++){
                html+= split[i] + "<br>";
            }
            return html;
        }

        function replaceNumberWithImage(number){
            if(/^[0-9]+$/.test(number)){
                return "img/grafiken/3x/" + number + "@3x.png";
            }else{
                return number;
            }
        }

        function previousPlayer(){
            $ionicSlideBoxDelegate.previous();
        }

        function nextPlayer() {
            $ionicSlideBoxDelegate.next();
        }

        vm._init();
    }
})();

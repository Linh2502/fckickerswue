/**
 * Created by Linh on 18.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 */
(function () {
    'use strict';

    angular
        .module('service.singleplayer', [])
        .service('SinglePlayerService', SinglePlayerService);

    SinglePlayerService.$inject = ['$ionicSideMenuDelegate'];

    function SinglePlayerService($ionicSideMenuDelegate) {
        $ionicSideMenuDelegate.canDragContent(false);
        var player;
        var playerPosition;
        var playerTeam;
        return {
            setPlayerData: function (data, position, squad) {
                player = data;
                playerPosition = position;
                playerTeam = squad;
            },
            getPlayerData: function () {
                return player;
            },
            getPlayerPosition: function () {
                return playerPosition;
            },
            getPlayerTeam: function () {
                return playerTeam;
            }
        }
    }
})();
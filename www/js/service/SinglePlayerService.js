/**
 * Created by Linh on 18.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 */
angular.module('service.singleplayer', [])
  .service('SinglePlayerService', function ($http, ApiEndpoint, $ionicSideMenuDelegate) {
    $ionicSideMenuDelegate.canDragContent(false);
    var player;
    var playerPosition;
    var playerTeam;
    return {
      setPlayerData: function(data, position, squad){
        player = data;
        playerPosition = position;
        playerTeam = squad;

      },
      getPlayerData: function(){
        return player;
      },
      getPlayerPosition: function(){
        return playerPosition;
      },
      getPlayerTeam: function(){
        return playerTeam;
      }
    }
  })

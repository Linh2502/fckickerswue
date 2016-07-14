/**
 * Created by Linh on 18.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 */
angular.module('module.singleplayer', [])
  .controller('SinglePlayerCtrl', function($scope, SinglePlayerService, $ionicSlideBoxDelegate, singlePlayer){
    $scope.playerTeam = [];
    $scope.selectedPlayer = SinglePlayerService.getPlayerData();
    $scope.playerPosition = SinglePlayerService.getPlayerPosition();
    $scope.currentPlayer = null;
    setPlayerData(SinglePlayerService.getPlayerTeam());

    function setPlayerData(squad) {
      for (var i = 0; i < squad.player.length; i++){
        if(singlePlayer == squad.player[i].id){
          $scope.currentPlayer = i;
        }
        squad.player[i].history = splitHistory(squad.player[i].history);
        squad.player[i].trikotno = replaceNumberWithImage(squad.player[i].trikotno);
        $scope.playerTeam.push(squad.player[i]);
      }
    }

    function splitHistory(history){
      var html = "";
      var split = history.split(",");
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

    $scope.previousPlayer = function() {
      $ionicSlideBoxDelegate.previous();
    }

    $scope.nextPlayer = function() {
      $ionicSlideBoxDelegate.next();
    }
  })

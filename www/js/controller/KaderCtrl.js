/**
 * Created by Linh on 02.09.15.
 * Copyright icue-medienproduktion GmbH & Co. KG. All rights reserved.
 *
 * - final -
 */
angular.module('module.kader', ['ionicLazyLoad', 'loadingInterceptor'])
  .controller('KaderCtrl', function($rootScope, $scope, $ionicModal, KaderService, SinglePlayerService, $state, $ionicSideMenuDelegate, $ionicScrollDelegate, $timeout){
    $ionicSideMenuDelegate.canDragContent(true);
    $scope.tab = 3;
    var playerPair = [];
    var lockButton = false;
    var showContent = false;
    $scope.getSquadGoal = [];
    $scope.getSquadOffense = [];
    $scope.getSquadDefense = [];
    $scope.getSquadMidfield = [];
    $scope.goal = [];
    $scope.offense = [];
    $scope.defense = [];
    $scope.midfield = [];

    $scope.$on('$ionicView.beforeEnter', function() {
      $ionicSideMenuDelegate.toggleLeft(false);
      $rootScope.$broadcast('show_loader');
      KaderService.fetchKaderData();
    });

    $rootScope.$on('show_content_kader', function() {
      $scope.setTab = function(tab){
        if(tab == "1"){
          $scope.getSquadGoal = KaderService.getGoalPlayerData();
          $scope.goal = splitIntoHalf($scope.getSquadGoal);
          $ionicScrollDelegate.$getByHandle('resize').resize();
        }else if(tab == "2"){
          $scope.getSquadDefense = KaderService.getDefensePlayerData();
          $scope.defense = splitIntoHalf($scope.getSquadDefense);
          $ionicScrollDelegate.$getByHandle('resize').resize();
        }else if(tab == "3"){
          $scope.getSquadMidfield = KaderService.getMidFieldPlayerData();
          $scope.midfield = splitIntoHalf($scope.getSquadMidfield);
          $ionicScrollDelegate.$getByHandle('resize').resize();
        }else{
          $scope.getSquadOffense = KaderService.getOffensePlayerData();
          $scope.offense = splitIntoHalf($scope.getSquadOffense);
          $ionicScrollDelegate.$getByHandle('resize').resize();
        }
        $scope.tab = tab;
      };
      $scope.showTab = function(tab){
        $ionicScrollDelegate.$getByHandle('resize').resize();
        return $scope.tab === tab;
      };
      $scope.getSquadMidfield = KaderService.getMidFieldPlayerData();
      $scope.midfield = splitIntoHalf($scope.getSquadMidfield);
      $ionicScrollDelegate.$getByHandle('resize').resize();
      showContent = true;
      console.log("request success kader");
    });

    $scope.$on('$ionicView.afterEnter', function() {
      hideLoader();
    });

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

    function replaceNumberWithImage(number){
      if(/^[0-9]+$/.test(number)){
        return "img/grafiken/3x/" + number + "@3x.png";
      }else{
        return number;
      }
    }

    $scope.viewPlayer = function(player, position, squad, index){
      SinglePlayerService.setPlayerData(player, position, squad, index);
      if(lockButton == false){
        $state.go('app.singleplayer', {playerId: player.id});
        lockButton = true;
        setTimeout(function(){ lockButton = false; }, 1000);
      }
    }

    function hideLoader(){
      if(showContent){
        $rootScope.$broadcast('hide_loader');
      }else{
        $timeout(function(){
          hideLoader();
        }, 1000);
      }
    }
  })

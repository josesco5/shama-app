angular.module('starter.controllers')
  .controller('ChatDetailCtrl', function($scope, $state, $stateParams, Auth, Chats) {
    if (!Auth.loggedIn()) {
      $state.go('login');
    }

    $scope.chat = Chats.get($stateParams.chatId);
  });

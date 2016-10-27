angular.module('starter.controllers')
  .controller('ChatDetailCtrl', function($scope, $state, $stateParams, $timeout, $ionicScrollDelegate, Auth, Chats) {
    if (!Auth.loggedIn()) {
      $state.go('login');
    }

    $scope.chat = Chats.get($stateParams.chatId);
    $scope.messages = [];

    // Scroll to the bottom of the messages list
    var scrollBottom = function () {
      $timeout(function() {
        $ionicScrollDelegate.$getByHandle('messages').scrollBottom();
      }, 500);
    };

    Chats.getMessages($stateParams.chatId)
      .then(function(response) {
        $scope.messages = response.data;

        scrollBottom();
      });
  });

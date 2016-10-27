angular.module('starter.controllers')
  .controller('ChatDetailCtrl', function($scope, $state, $stateParams, $timeout, $ionicScrollDelegate, Auth, Chats, Websocket) {
    if (!Auth.loggedIn()) {
      $state.go('login');
    }

    $scope.chat = Chats.get($stateParams.chatId);
    $scope.messages = [];

    $scope.message = {
      chatId: $stateParams.chatId,
      userId: Auth.getCurrentUser().id
    };

    $scope.sendMessage = function() {
      var message = angular.copy($scope.message);
      Websocket.sendMessage(message);
      $scope.message.body = '';
    };

    Websocket.joinChat($stateParams.chatId);

    Websocket.onMessage(function (message) {
      $scope.messages.push(message);
      scrollBottom();
    });

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

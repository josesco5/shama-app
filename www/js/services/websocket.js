angular.module('starter.services')

.factory('Websocket', function($http, $rootScope, $window, config, Auth) {
  $window.socket = io(config.backendUrl);
  var ws = {};
  var onMessage, onComment;

  ws.joinChat = function (chatId) {
    $window.socket.emit('join chat', chatId);
  };

  ws.sendMessage = function (message) {
    $window.socket.emit('message', message);
  };

  ws.on = function (eventName, callback) {
    $window.socket.on(eventName, function () {
      var args = arguments;
      $rootScope.$apply(function() {
        callback.apply($window.socket, args);
      });
    });
  };

  ws.onMessage = function (callback) {
    onMessage = callback;
  };

  ws.on('message', function (message) {
    if (onMessage) {
      onMessage(message);
    }
  });

  return ws;
});
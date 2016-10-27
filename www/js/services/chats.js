angular.module('starter.services')

.factory('Chats', function($http, config, Auth) {
  var chats = [];

  return {
    all: function() {
      var request = {
        method: 'GET',
        url: config.backendUrl +'/chats',
        headers: { authorization: Auth.getToken() },
        params: { mobile: true }
      };
      return $http(request).then(function(response) {
        chats = response.data;
        return response;
      });
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      console.log(chats);
      for (var i = 0; i < chats.length; i++) {
        if (chats[i]._id === chatId) {
          return chats[i];
        }
      }
      return null;
    },
    getMessages: function (chatId) {
      var request = {
        method: 'GET',
        url: config.backendUrl +'/chats/' + chatId + '/messages',
        headers: { authorization: Auth.getToken() }
      };
      return $http(request);
    }
  };
});

angular.module('starter.services')

.factory('Auth', function() {
  var auth = {};

  auth.saveToken = function (token) {
    window.localStorage.token = token;
  };

  auth.getToken = function () {
    return window.localStorage.token;
  };

  auth.loggedIn = function () {
    return auth.getFacebookUser().userID;
  };

  auth.saveFacebookUser = function (user) {
    window.localStorage.facebookUser = JSON.stringify(user);
  };

  auth.getFacebookUser = function () {
    return JSON.parse(window.localStorage.facebookUser || '{}');
  };

  return auth;
});

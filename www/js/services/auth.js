angular.module('starter.services')

.factory('Auth', function($http, config) {
  var auth = {};

  auth.saveToken = function (token) {
    window.localStorage.token = token;
  };

  auth.getToken = function () {
    return window.localStorage.token;
  };

  auth.loggedIn = function () {
    return auth.getToken();
  };

  auth.saveCurrentUser = function (user) {
    window.localStorage.currentUser = JSON.stringify(user);
  };

  auth.getCurrentUser = function () {
    return JSON.parse(window.localStorage.currentUser || '{}');
  };

  auth.saveFacebookUser = function (user) {
    window.localStorage.facebookUser = JSON.stringify(user);
  };

  auth.getFacebookUser = function () {
    return JSON.parse(window.localStorage.facebookUser || '{}');
  };

  auth.signUp = function (user) {
    return $http.post(config.backendUrl + '/auth/sign-up', user);
  }

  return auth;
});

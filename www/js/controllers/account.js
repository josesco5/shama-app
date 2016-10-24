angular.module('starter.controllers')
  .controller('AccountCtrl', function($scope, $state, Auth) {
    if (!Auth.loggedIn()) {
      $state.go('login');
    }

    $scope.settings = {
      enableFriends: true
    };
  });

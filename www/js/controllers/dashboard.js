angular.module('starter.controllers')
  .controller('DashCtrl', function($scope, $state, Auth) {
    if (!Auth.loggedIn()) {
      $state.go('login');
    }
  });

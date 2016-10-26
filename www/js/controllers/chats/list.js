angular.module('starter.controllers')
  .controller('ChatsCtrl', function($scope, $state, Auth, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    if (!Auth.loggedIn()) {
      $state.go('login');
    }

    $scope.chats = [];

    Chats.all()
      .then(function (response) {
        $scope.chats = response.data;
      }, function (response) {
        // ToDo: Display error message
        console.log('Error getting the chats list, with status: ' + response.status);
      });
    $scope.remove = function(chat) {
      Chats.remove(chat);
    };
  });

angular.module('starter.controllers')
  .controller('LoginCtrl', function($scope, $state, $q, Auth) {
    var fbLoginSuccess = function (response) {
      if (!response.authResponse) {
        fbLoginError("Cannot find the authResponse");
        return;
      }

      var authResponse = response.authResponse;

      getFacebookProfileInfo(authResponse)
        .then(function (profileInfo) {
          Auth.saveFacebookUser({
            authResponse: authResponse,
            userID: profileInfo.id,
            name: profileInfo.name,
            email: profileInfo.email,
            picture: 'http://graph.facebook.com/' + authResponse.userID + '/picture?type=large'
          });
          $state.go('tab.dash');
        }, function (fail) {
          console.log('Error getting profile info from Facebook', fail);
        });
    };

    var fbLoginError = function (error) {
      console.log('Facebook Login Error', fail);
    };

    var getFacebookProfileInfo = function (authResponse) {
      var info = $q.defer();

      facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
        function (response) {
          info.resolve(response);
        },
        function (response) {
          info.reject(response);
        });

      return info.promise;
    };

    $scope.facebookSignIn = function () {
      facebookConnectPlugin.getLoginStatus(function (success) {
        if (success.status === 'connected') {
          console.log('getLoginStatus', success.status);

          var facebookUser = Auth.getFacebookUser();

          if (!facebookUser.userID) {
            getFacebookProfileInfo(sucess.authResponse)
              .then(function (profileInfo) {
                Auth.saveFacebookUser({
                  authResponse: authResponse,
                  userID: profileInfo.id,
                  name: profileInfo.name,
                  email: profileInfo.email,
                  picture: 'http://graph.facebook.com/' + authResponse.userID + '/picture?type=large'
                });

                $state.go('tab.dash');
              }, function (fail) {
                console.log('Error getting profile info from Facebook', fail);
              });
          } else {
            $state.go('tab.chats');
          }

        } else {
          console.log('getLoginStatus', success.status);
          facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
        }
      })
    }
  });

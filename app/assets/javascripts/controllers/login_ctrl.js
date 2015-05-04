angular.module('vault').controller('LoginCtrl', function ($rootScope, $location, LoginService) {
  var self = this;
  this.credentials = {kbLogin: "vovayartsev@gmail.com", kbPassword: ""};
  this.errorMessage = null;
  this.progress = 0;

  $rootScope.$on('progress', function(_, data) {
    self.progress = data;
  })

  this.onLogin = function () {
    self.errorMessage = null;
    return LoginService.login(self.credentials)
      .then(function () {
        $rootScope.$broadcast('login');
        $location.path('/summaries');
      }, function (err) {
        self.errorMessage = 'Login failed: ' + err;
      })
  }
});


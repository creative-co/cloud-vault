angular.module('vault').controller('LoginCtrl', function ($rootScope, $location, CryptoService) {
  var self = this;
  this.credentials = {kbLogin: "anton.frolovsky@cloudcastlegroup.com", kbPassword: ""};
  this.errorMessage = null;
  this.progress = 0;

  $rootScope.$on('progress', function(_, data) {
    self.progress = data;
  })

  this.onLogin = function () {
    self.errorMessage = null;
    return CryptoService.login(self.credentials)
      .then(function () {
        $rootScope.$broadcast('login');
        $location.path('/summaries');
      }, function (err) {
        self.errorMessage = 'Login failed: ' + err;
      })
  }
});


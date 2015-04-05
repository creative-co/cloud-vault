angular.module('vault').controller('LoginCtrl', function ($rootScope, CryptoService) {
  var self = this;
  this.credentials = {kbLogin: "vovayartsev@gmail.com", kbPassword: ""};
  this.errorMessage = null;

  this.onLogin = function () {
    self.errorMessage = null;
    return CryptoService.login(self.credentials).then(function () {
      $rootScope.$broadcast('login');
    }, function () {
      self.errorMessage = 'Login failed'
    })
  }
});
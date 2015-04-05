angular.module('vault').controller('LoginCtrl', function ($rootScope, CryptoService) {
  var self = this;
  this.credentials = {kbLogin: "vovayartsev@gmail.com", kbPassword: ""};
  this.errorMessage = ''

  this.onLogin = function () {
    CryptoService.login(self.credentials).then(function () {
      $rootScope.$broadcast('login');
    }, function() {
      self.errorMessage = 'Login failed'
    })
  }
});
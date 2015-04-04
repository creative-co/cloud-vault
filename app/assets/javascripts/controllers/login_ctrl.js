angular.module('vault').controller('LoginCtrl', function ($rootScope, CryptoService) {
  this.onLogin = function () {
    $rootScope.$broadcast('login');
  }
});
angular.module('vault').controller('VaultCtrl', function ($scope) {
  var self = this;
  this.view = "login_form";

  $scope.$on("login", function() {
    self.view = 'summaries';
  })

});
angular.module('vault').controller('VaultCtrl', function ($scope) {
  var self = this;
  this.view = "login_form";
  // this.view = "summaries";

  $scope.$on("login", function() {
    self.view = 'summaries';
  })
});
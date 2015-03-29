angular.module('vault').controller('vaultCtrl', function (BackendService) {
  var self = this;
  this.user = {}

  this.onLogin = function () {
    BackendService.summaries().success(function (data) {
      self.summaries = data.summaries;
    })
  }
});
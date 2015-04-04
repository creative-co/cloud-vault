angular.module('vault').controller('VaultCtrl', function (BackendService) {
  var self = this;
  this.user = {}

  this.onLogin = function () {
    BackendService.summaries().success(function (data) {
      self.summaries = data.summaries;
    })
  }
});
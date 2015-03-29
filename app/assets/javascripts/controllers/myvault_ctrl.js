angular.module('myvault').controller('MyvaultCtrl', function (SummaryService) {
  var self = this;
  this.user = {}

  this.onLogin = function () {
    SummaryService.query().success(function (data) {
      self.summaries = data.summaries;
    })
  }
});
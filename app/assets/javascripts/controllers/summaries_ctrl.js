angular.module('vault').controller('SummariesCtrl', function (BackendService) {
  var self = this;

  BackendService.summaries().success(function (data) {
    self.summaries = data.summaries;
  })
});